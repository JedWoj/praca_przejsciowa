import Spinner from "../components/UI/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-49px)] bg-gradient-to-r from-green-600 to-blue-500 flex justify-center items-center">
      <Spinner />
    </div>
  );
}
