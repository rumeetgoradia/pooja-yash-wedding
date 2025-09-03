import { Hero } from "./hero";

export default async function Home() {
  return (
    <main>
      <Hero src="/Landing.jpg" alt="Pooja & Yash">
        <h1 className="text-5xl">Pooja & Yash</h1>
      </Hero>
      <p className="h-[2000px]">Lorem ipsum</p>
    </main>
  );
}
