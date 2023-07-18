// STATIC PAGE

export const dynamic = "force-static"; // Specifically tells NEXTJS to Cache this page

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "We are a social media company",
};

export default async function About() {
  return (
    <main>
      <h1>About</h1>
      <p>We are a social media company!</p>
    </main>
  );
}
