import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Stack from "@/components/Stack";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { dbConnect } from "@/lib/db";
import { Project, type IProject } from "@/models/Project";

export const revalidate = 60; // ISR — rebuild every 60s

async function getProjects(): Promise<IProject[]> {
  try {
    await dbConnect();
    const docs = await Project.find({ published: true })
      .sort({ featured: -1, year: -1, createdAt: -1 })
      .limit(5)
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch (err) {
    console.error("Failed to load projects:", err);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <ScrollReveal />
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <Showcase projects={projects} />
      <Stack />
      <Process />
      <Industries />
      <Contact />
      <Footer />
    </>
  );
}
