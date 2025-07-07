import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import AchievementsGallery from "@/components/achievements-gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <AchievementsGallery />
      <Contact />
      <Footer />
    </main>
  )
}

