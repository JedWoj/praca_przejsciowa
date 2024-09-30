import CloseBtn from "@/app/@modal/(.)products/[id]/components/CloseBtn";
import type { PropsWithChildren } from "react";

export default function Dialog({ children }: PropsWithChildren) {
  return (
    <dialog
      open
      className="w-full h-full z-10 bg-slate-300 bg-opacity-70 absolute top-0 flex justify-center items-center"
    >
      <section className="p-5 text-white bg-cyan-500 flex justify-center relative items-center flex-col gap-2 rounded-lg">
        <CloseBtn />
        {children}
      </section>
    </dialog>
  );
}
