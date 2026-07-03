import { ShopExperience } from "@/components/ShopExperience";
import { categories, getCatalog } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const catalog = await getCatalog();
  return <ShopExperience products={catalog} categories={categories} />;
}
