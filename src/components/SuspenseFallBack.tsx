import { LoaderPinwheel } from "lucide-react";

function SuspenseFallBack() {
  return (
    <>
      <section className="margin-nav-height h-full-minus-nav flex flex-col items-center justify-center">
        <LoaderPinwheel className="h-20 w-20 animate-spin " strokeWidth={1} />
      </section>
    </>
  );
}

export default SuspenseFallBack;
