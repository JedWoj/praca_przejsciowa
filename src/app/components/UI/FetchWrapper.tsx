import type { Status } from "@/app/hooks/useFetch";
import type { PropsWithChildren, ReactNode } from "react";
import Spinner from "./Spinner/Spinner";

type FetchWrapperProps = PropsWithChildren<{
  status: Status;
  loading?: ReactNode;
  error?: ReactNode;
}>;

export default function FetchWrapper({
  status,
  children,
  error,
  loading,
}: FetchWrapperProps) {
  if (status === "loading" || status === "idle") {
    return (
      loading ?? (
        <div className="flex justify-center items-center min-w-96">
          <Spinner />
        </div>
      )
    );
  }

  if (status === "error")
    return (
      error ?? (
        <div className="p-4 rounded-lg text-2xl flex flex-col justify-center items-center text-center text-white bg-red-500">
          Something went wrong!
        </div>
      )
    );

  return children;
}
