import { PrismaClient, Role, OrderStatus, PaymentStatus, TicketPriority, TicketStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, mockOrders, mockTickets, products } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("AdminDemo!2026", 12);
  const agentPassword = await bcrypt.hash("AgentDemo!2026", 12);
  const customerPassword = await bcrypt.hash("CustomerDemo!2026", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@northstar.demo" },
    update: { name: "Northstar Admin", passwordHash: adminPassword, role: Role.ADMIN },
    create: { name: "Northstar Admin", email: "admin@northstar.demo", passwordHash: adminPassword, role: Role.ADMIN }
  });
  const agent = await prisma.user.upsert({
    where: { email: "support@northstar.demo" },
    update: { name: "Support Specialist", passwordHash: agentPassword, role: Role.AGENT },
    create: { name: "Support Specialist", email: "support@northstar.demo", passwordHash: agentPassword, role: Role.AGENT }
  });

  const categoryMap = new Map<string, string>();
  for (const category of categories) {
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description, image: category.image },
      create: category
    });
    categoryMap.set(category.slug, record.id);
  }

  for (const product of products) {
    const { categorySlug, ...rest } = product;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...rest,
        categoryId: categoryMap.get(categorySlug)!
      },
      create: {
        ...rest,
        categoryId: categoryMap.get(categorySlug)!
      }
    });
  }

  const customerEmails = [
    ["Avery Daniels", "avery@example.com"],
    ["Mia Roberts", "mia@example.com"],
    ["Noah Patel", "noah@example.com"],
    ["Jordan Williams", "jordan@example.com"],
    ["Elena Torres", "elena@example.com"]
  ] as const;

  const customerMap = new Map<string, string>();
  for (const [name, email] of customerEmails) {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, passwordHash: customerPassword, role: Role.CUSTOMER },
      create: { name, email, passwordHash: customerPassword, role: Role.CUSTOMER }
    });
    customerMap.set(email, user.id);
  }

  const firstProduct = await prisma.product.findUniqueOrThrow({ where: { slug: "aurora-insulated-bottle" } });
  const secondProduct = await prisma.product.findUniqueOrThrow({ where: { slug: "orbit-desk-lamp" } });

  for (const order of mockOrders) {
    const customerId = customerMap.get(order.email)!;
    await prisma.order.upsert({
      where: { number: order.number },
      update: {
        status: order.status as OrderStatus,
        paymentStatus: order.paymentStatus as PaymentStatus,
        subtotal: order.total,
        total: order.total,
        email: order.email,
        shippingName: order.customer
      },
      create: {
        number: order.number,
        status: order.status as OrderStatus,
        paymentStatus: order.paymentStatus as PaymentStatus,
        subtotal: order.total,
        shipping: 0,
        tax: 0,
        total: order.total,
        email: order.email,
        customerId,
        shippingName: order.customer,
        shippingLine1: "500 Market Street",
        shippingCity: order.destination.split(",")[0],
        shippingState: order.destination.split(",")[1]?.trim() || "CA",
        shippingZip: "94105",
        shippingCountry: "United States",
        createdAt: new Date(order.createdAt),
        items: {
          create: [
            {
              productId: firstProduct.id,
              title: firstProduct.name,
              sku: firstProduct.sku,
              quantity: 1,
              unitPrice: Math.min(order.total, firstProduct.price),
              total: Math.min(order.total, firstProduct.price)
            },
            {
              productId: secondProduct.id,
              title: secondProduct.name,
              sku: secondProduct.sku,
              quantity: order.items > 1 ? 1 : 0,
              unitPrice: Math.max(0, order.total - firstProduct.price),
              total: Math.max(0, order.total - firstProduct.price)
            }
          ],
        },
        events: { create: { type: "seed", message: `Order seeded as ${order.status.toLowerCase()}.` } }
      }
    });
  }

  for (const ticket of mockTickets) {
    const customerId = customerMap.get(ticket.email)!;
    await prisma.supportTicket.upsert({
      where: { number: ticket.number },
      update: {
        subject: ticket.subject,
        category: ticket.category,
        priority: ticket.priority as TicketPriority,
        status: ticket.status as TicketStatus,
        orderNumber: ticket.orderNumber
      },
      create: {
        number: ticket.number,
        subject: ticket.subject,
        message: "Customer support case seeded for the Northstar demo environment.",
        category: ticket.category,
        priority: ticket.priority as TicketPriority,
        status: ticket.status as TicketStatus,
        customerId,
        orderNumber: ticket.orderNumber,
        createdAt: new Date(ticket.createdAt),
        messages: {
          create: [
            { authorId: customerId, body: "I need help with this order.", internal: false },
            { authorId: agent.id, body: "Support triage record created.", internal: true }
          ]
        }
      }
    });
  }

  console.log({ admin: admin.email, products: products.length, categories: categories.length });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
