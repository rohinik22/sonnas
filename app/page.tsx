
"use client";
import { useState, useEffect } from "react";
import { Menu, X, Cake, BookOpen, Utensils, CalendarCheck, ChefHat } from "lucide-react";
import Image from "next/image";
import ciguatera from "@/lib/fonts/ciguatera";

/* Components */
import { ServicesMarquee } from "@/components/blocks/services-marquee";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import MenuSection from "@/components/sections/MenuSection";
import ContactSection from "@/components/sections/ContactSection";

const navItems = ["home", "about", "service", "menu", "contact-form"];

export default function RestaurantPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      navItems.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { offsetTop, offsetHeight } = el;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const services = [
    {
      title: "BIRTHDAY & ANNIVERSARY CAKES",
      description:
        "Crafting bespoke cakes for your special milestones, from whimsical birthdays to elegant anniversaries, designed to delight every palate.",
      icon: Cake,
      href: "#cakes",
    },
    {
      title: "BAKING CLASSES",
      description:
        "Hands-on workshops for all skill levels, teaching the art of baking, from foundational techniques to advanced pastry creations.",
      icon: BookOpen,
      href: "#classes",
    },
    {
      title: "PARTY CATERING",
      description:
        "Elevate your celebrations with our exquisite dessert spreads and savory bites, tailored to make your party unforgettable.",
      icon: Utensils,
      href: "#catering",
    },
    {
      title: "EVENTS & WORKSHOPS",
      description:
        "Engaging culinary experiences for corporate events, team-building, or private gatherings, fostering creativity and connection.",
      icon: CalendarCheck,
      href: "#events",
    },
    {
      title: "CURATED MENUS FOR SMALL GATHERINGS",
      description:
        "Intimate dining experiences with thoughtfully designed menus, perfect for cozy get-togethers and memorable moments.",
      icon: ChefHat,
      href: "#menus",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.avif"
          alt="Restaurant Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/60 to-gray-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm shadow-lg z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <span className={`${ciguatera.className} text-3xl font-bold text-white`}>
                Sonna&apos;s
              </span>

              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium capitalize transition-colors ${
                      activeSection === id
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-300 hover:text-green-600"
                    }`}
                  >
                    {id.replace("-form", "")}
                  </button>
                ))}
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold">
                  Order Now
                </button>
              </div>

              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-700 space-y-2">
                {navItems.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block w-full text-left py-2 text-gray-300 hover:text-red-600 capitalize"
                  >
                    {id.replace("-form", "")}
                  </button>
                ))}
                <button className="w-full bg-red-600 text-white px-6 py-2 rounded-full">
                  Order Now
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Sections */}
        <HomeSection />
        <AboutSection />
        {/* <ServicesMarquee title={""} description={""} services={[]} /> */}

        {/* Services Marquee Section */}
        <section id="service" className="py-20 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesMarquee
              title="Our Delicious Offerings"
              description="Explore our range of services designed to bring joy and flavor to every occasion."
              services={services}
              className="bg-transparent"
            />
          </div>
        </section>

        <MenuSection />
        <ContactSection />
      </div>
    </div>
  );
}
