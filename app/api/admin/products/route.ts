import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const schema = z.object({
  name: z.string().min(3),
  sku: z.string().min(4).max(32),
  categorySlug: z.string().min(2),
  price: z.number().int().positive(),
  inventory: z.number().int().min(0),
  description: z.string().min(10),
  imageKey: z.string().default("tech")
});

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  try {
    const input = schema.parse(await request.json());
    const category = await db.category.findUnique({ where: { slug: input.categorySlug } });
    if (!category) return NextResponse.json({ error: "Choose a valid category." }, { status: 400 });
    let slug = slugify(input.name);
    let suffix = 2;
    while (await db.product.findUnique({ where: { slug }, select: { id: true } })) slug = `${slugify(input.name)}-${suffix++}`;
    const product = await db.product.create({
      data: { name: input.name, slug, sku: input.sku.toUpperCase(), description: input.description, price: input.price, inventory: input.inventory, rating: 0, reviewCount: 0, images: [input.imageKey], categoryId: category.id, attributes: {} },
      include: { category: true }
    });
    return NextResponse.json({ product: { ...product, categorySlug: product.category.slug } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Product could not be created. The SKU may already exist." }, { status: 400 });
  }
}
