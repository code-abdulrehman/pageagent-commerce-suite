import { db } from "@/lib/db";
import { categories, mockCustomers, mockOrders, mockTickets, products } from "@/lib/mock-data";
import { ProductSeed } from "@/lib/types";

export async function getCatalog() {
  try {
    const databaseProducts = await db.product.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
    });
    if (databaseProducts.length) {
      return databaseProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        description: p.description,
        price: p.price,
        compareAt: p.compareAt || undefined,
        inventory: p.inventory,
        rating: p.rating,
        reviewCount: p.reviewCount,
        featured: p.featured,
        active: p.active,
        categorySlug: p.category.slug,
        images: p.images,
        attributes: (p.attributes || {}) as Record<string, string>
      })) as ProductSeed[];
    }
  } catch {
    // A catalog fallback keeps the demo explorable before PostgreSQL is configured.
  }
  return products;
}

export async function getProduct(slug: string) {
  const catalog = await getCatalog();
  return catalog.find((product) => product.slug === slug) ?? null;
}

export async function getAdminSnapshot() {
  try {
    const [orderRows, ticketRows, productRows, customerRows] = await Promise.all([
      db.order.findMany({ include: { customer: true, items: true }, orderBy: { createdAt: "desc" }, take: 12 }),
      db.supportTicket.findMany({ include: { customer: true }, orderBy: { updatedAt: "desc" }, take: 12 }),
      db.product.findMany({ include: { category: true }, orderBy: { updatedAt: "desc" }, take: 30 }),
      db.user.findMany({ where: { role: "CUSTOMER" }, orderBy: { createdAt: "desc" }, take: 20 })
    ]);
    if (orderRows.length) {
      return {
        orders: orderRows.map((o) => ({
          id: o.id, number: o.number, customer: o.customer.name, email: o.email, total: o.total,
          status: o.status, paymentStatus: o.paymentStatus, createdAt: o.createdAt.toISOString(), items: o.items.length,
          destination: `${o.shippingCity}, ${o.shippingState}`
        })),
        tickets: ticketRows.map((t) => ({
          id: t.id, number: t.number, customer: t.customer.name, email: t.customer.email, subject: t.subject,
          category: t.category, priority: t.priority, status: t.status, createdAt: t.createdAt.toISOString(), orderNumber: t.orderNumber
        })),
        products: productRows.map((p) => ({
          id: p.id, name: p.name, slug: p.slug, sku: p.sku, description: p.description, price: p.price,
          compareAt: p.compareAt || undefined, inventory: p.inventory, rating: p.rating, reviewCount: p.reviewCount,
          featured: p.featured, active: p.active, categorySlug: p.category.slug, images: p.images,
          attributes: (p.attributes || {}) as Record<string, string>
        })) as ProductSeed[],
        customers: customerRows.map((customer) => ({
          name: customer.name, email: customer.email, orders: 0, total: "$0.00",
          since: customer.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric" }), status: "Customer"
        }))
      };
    }
  } catch {
    // Start without a configured database using the mock operations data.
  }
  return { orders: mockOrders, tickets: mockTickets, products, customers: mockCustomers };
}

export { categories };
