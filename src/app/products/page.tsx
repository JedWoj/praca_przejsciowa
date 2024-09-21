import AddProductBtn from "./_components/AddProductBtn";

export default function ProductsPage() {
  return (
    <div className="min-h-[calc(100vh-49px)]">
      <section className="flex justify-between items-center p-6">
        <h1 className="text-2xl">Products</h1>
        <AddProductBtn />
      </section>
      <section className="flex justify-center"></section>
    </div>
  );
}
