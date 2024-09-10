import Spinner from "../_components/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="h-screen bg-gradient-to-r from-green-600 to-blue-500 flex justify-center items-center">
      <Spinner />
    </div>
  );
}
