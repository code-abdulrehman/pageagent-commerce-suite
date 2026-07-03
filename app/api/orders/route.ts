import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    line1: z.string().min(3),
    line2: z.string().optional().nullable(),
    city: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().min(3),
    country: z.string().min(2)
  }),
  lines: z.array(z.object({
    product: z.object({ id: z.string() }),
    quantity: z.number().int().min(1).max(10)
  })).min(1)
});

function orderNumber() {
  return `NTH-${Math.floor(10000 + Math.random() * 89999)}`;
}

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const ids = input.lines.map((line) => line.product.id);
    const products = await db.product.findMany({ where: { id: { in: ids }, active: true } });
    if (products.length !== ids.length) return NextResponse.json({ error: "One or more products are unavailable." }, { status: 400 });

    const catalog = new Map(products.map((product) => [product.id, product]));
    const lineItems = input.lines.map((line) => {
      const product = catalog.get(line.product.id)!;
      const quantity = Math.min(line.quantity, product.inventory);
      if (!quantity) throw new Error(`${product.name} is out of stock.`);
      return { product, quantity, total: product.price * quantity };
    });
    const subtotal = lineItems.reduce((sum, line) => sum + line.total, 0);
    const shipping = subtotal >= 7500 ? 0 : 950;
    const tax = Math.round(subtotal * 0.0825);
    const customer = await db.user.upsert({
      where: { email: input.customer.email.toLowerCase() },
      update: { name: input.customer.name },
      create: {
        name: input.customer.name,
        email: input.customer.email.toLowerCase(),
        passwordHash: await bcrypt.hash(`customer-${Date.now()}`, 12),
        role: "CUSTOMER"
      }
    });

    let number = orderNumber();
    while (await db.order.findUnique({ where: { number }, select: { id: true } })) number = orderNumber();

    await db.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          number,
          status: "PAID",
          paymentStatus: "PAID",
          subtotal,
          shipping,
          tax,
          total: subtotal + shipping + tax,
          customerId: customer.id,
          email: customer.email,
          shippingName: input.customer.name,
          shippingLine1: input.customer.line1,
          shippingLine2: input.customer.line2 || null,
          shippingCity: input.customer.city,
          shippingState: input.customer.state,
          shippingZip: input.customer.zip,
          shippingCountry: input.customer.country,
          items: {
            create: lineItems.map(({ product, quantity, total }) => ({
              productId: product.id, title: product.name, sku: product.sku, quantity, unitPrice: product.price, total
            }))
          },
          events: { create: { type: "order_created", message: "Demo order created at checkout." } }
        }
      });
      for (const line of lineItems) {
        await tx.product.update({ where: { id: line.product.id }, data: { inventory: { decrement: line.quantity } } });
      }
    });

    return NextResponse.json({ orderNumber: number }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
