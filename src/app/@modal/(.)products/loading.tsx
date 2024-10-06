import Spinner from "@/app/components/UI/Spinner/Spinner";

export default function CartLoading() {
  return (
    <div className="w-full h-full z-10 bg-slate-300 bg-opacity-70 absolute top-0 flex justify-center items-center">
      <Spinner />
    </div>
  );
}
