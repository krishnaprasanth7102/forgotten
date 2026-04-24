import { BlueprintPlayground } from "@/components/BlueprintPlayground";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-24">
      <BlueprintPlayground />
    </main>
  );
}
