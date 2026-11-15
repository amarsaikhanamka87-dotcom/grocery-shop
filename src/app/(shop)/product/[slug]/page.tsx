import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/catalog/getProduct";
import { getRelatedProducts } from "@/lib/catalog/getRelatedProducts";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductGallery } from "./_components/ProductGallery";
import { ProductDetails } from "./_components/ProductDetails";
import { RelatedProducts } from "./_components/RelatedProducts";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <div className="container-x pt-8">
      <Breadcrumb
        items={[
          { label: "Нүүр", href: "/" },
          { label: product.category.name, href: `/shop?category=${product.category.slug}` },
          { label: product.name },
        ]}
      />
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery product={product} />
        <ProductDetails product={product} />
      </div>
      <RelatedProducts products={related} />
    </div>
  );
}
