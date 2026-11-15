import type { Metadata } from "next";
import { FarmsIntro } from "./_components/FarmsIntro";
import { FarmsGrid } from "./_components/FarmsGrid";

export const metadata: Metadata = { title: "Манай фермүүд" };

export default function FarmsPage() {
  return (
    <div className="container-x pt-10">
      <FarmsIntro />
      <FarmsGrid />
    </div>
  );
}
