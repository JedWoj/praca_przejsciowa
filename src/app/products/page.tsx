import LinkButton from "../components/UI/LinkButton";
import ProductsList from "./components/ProductsList";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  return (
    <div className="min-h-[calc(100vh-49px)] bg-slate-300">
      <section className="flex justify-between items-center p-6">
        <h1 className="text-2xl">Products</h1>
        <LinkButton href="/products/add">Add Product</LinkButton>
      </section>
      <section className="flex justify-center">
        <ProductsList />
      </section>
    </div>
  );
}
