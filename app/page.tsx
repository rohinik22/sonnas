
"use client";
import { useState, useEffect } from "react";
import { Menu, X, Cake, BookOpen, Utensils, CalendarCheck, ChefHat, ShoppingCart, User, LogOut, Package } from "lucide-react";
import Image from "next/image";
import ciguatera from "@/lib/fonts/ciguatera";

/* Components */
import { ServicesMarquee } from "@/components/blocks/services-marquee";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import MenuSection from "@/components/sections/MenuSection";
import ContactSection from "@/components/sections/ContactSection";
import CartSidebar from "@/components/cart/CartSidebar";
import OrderTrackingModal from "@/components/order/OrderTrackingModal";
import LoginModal from "@/components/auth/LoginModal";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { OrderProvider } from "@/contexts/OrderContext";

const navItems = ["home", "about", "service", "menu", "contact-form"];

function RestaurantContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    subject: "",
    name: "",
    email: "",
  });
  const { getTotalItems, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout, setIsLoginModalOpen } = useAuth();

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const handleServiceEnquire = (serviceTitle: string) => {
    // Set the subject for the contact form
    const subject = `Enquiry about ${serviceTitle}`;
    setContactFormData({
      subject,
      name: isAuthenticated ? user?.name || "" : "",
      email: isAuthenticated ? user?.email || "" : "",
    });
    
    // Scroll to contact form
    scrollToSection("contact-form");
  };

  // Clear contact form data when section changes (optional)
  useEffect(() => {
    if (activeSection !== "contact-form" && contactFormData.subject) {
      // Clear after a delay to ensure user has seen the pre-filled data
      const timer = setTimeout(() => {
        setContactFormData({ subject: "", name: "", email: "" });
      }, 10000); // Clear after 10 seconds of leaving contact section
      
      return () => clearTimeout(timer);
    }
  }, [activeSection, contactFormData.subject]);

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
              </div>

              <div className="flex items-center space-x-4">
                {/* Order Tracking */}
                <button
                  onClick={() => setIsOrderTrackingOpen(true)}
                  className="relative p-2 text-gray-300 hover:text-yellow-500 transition-colors"
                  title="Track Orders"
                >
                  <Package className="h-6 w-6" />
                </button>

                {/* Cart Icon */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-300 hover:text-red-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div className="relative">
                  {isAuthenticated ? (
                    <div>
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 p-2 text-gray-300 hover:text-green-600 transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span className="hidden md:block text-sm">{user?.name}</span>
                      </button>
                      
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                          <div className="p-3 border-b border-gray-700">
                            <p className="text-white font-medium">{user?.name}</p>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                          </div>
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center space-x-2 p-3 text-gray-300 hover:text-red-600 hover:bg-gray-700 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="flex items-center space-x-2 p-2 text-gray-300 hover:text-green-600 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span className="hidden md:block text-sm">Login</span>
                    </button>
                  )}
                </div>

                <button
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:block py-4 border-t border-gray-700 space-y-2">
                {navItems.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block w-full text-left py-2 text-gray-300 hover:text-red-600 capitalize"
                  >
                    {id.replace("-form", "")}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsOrderTrackingOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full text-left py-2 text-gray-300 hover:text-yellow-500 items-center space-x-2"
                >
                  <Package className="h-4 w-4" />
                  <span>Track Orders</span>
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
              onServiceEnquire={handleServiceEnquire}
            />
          </div>
        </section>

        <MenuSection />
        <ContactSection 
          prefilledSubject={contactFormData.subject}
          prefilledName={contactFormData.name}
          prefilledEmail={contactFormData.email}
        />
        
        {/* Cart Sidebar */}
        <CartSidebar />
        
        {/* Order Tracking Modal */}
        <OrderTrackingModal 
          isOpen={isOrderTrackingOpen} 
          onClose={() => setIsOrderTrackingOpen(false)} 
        />
        
        {/* Login Modal */}
        <LoginModal />
        
        {/* Toaster for notifications */}
        <Toaster />
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <RestaurantContent />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
