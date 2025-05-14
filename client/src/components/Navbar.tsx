import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isBlogPage =
    location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Why Choose Us", id: "why-choose-us" },
      { label: "Specialties", id: "specialties" },
      { label: "Our Process", id: "our-process" },
      { label: "Gallery", id: "gallery" },
    ],
    []
  );

  // === BLOG NAVBAR ONLY ===
  if (isBlogPage) {
    return (
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 h-20",
          isScrolled ? "bg-white/95 shadow-md" : "bg-transparent"
        )}
      >
        <div className="container mx-auto h-full flex justify-between items-center relative">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Tadegg Logo"
              className={cn(
                "h-10 w-auto transition-opacity",
                isScrolled ? "opacity-100" : "opacity-90"
              )}
            />
            <span
              className={cn(
                "font-serif text-2xl font-bold transition-colors",
                isScrolled ? "text-tadegg-brown" : "text-white"
              )}
            >
              Tadegg
            </span>
          </Link>
          <Link
            to="/admin"
            className="absolute right-4 opacity-0 pointer-events-auto"
            aria-label="Admin Access"
          >
            Admin
          </Link>
        </div>
      </nav>
    );
  }

  // === DEFAULT HOMEPAGE NAVBAR ===
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 h-20",
        isScrolled
          ? "bg-white/95 shadow-md"
          : "bg-black/30 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto h-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold">
          <img src="/logo.png" alt="Tadegg Logo" className="h-12 w-auto" />
          <span className={isScrolled ? "text-tadegg-brown" : "text-white"}>
            Tadegg
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "hover:text-tadegg-burgundy transition-colors relative group",
                isScrolled ? "text-tadegg-brown" : "text-white"
              )}
            >
              <span>{label}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-tadegg-burgundy transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}

          <Link
            to="/blog"
            className={cn(
              "relative group px-5 py-2 rounded-full font-medium transition-transform hover:scale-105 animate-pulse",
              "bg-gradient-to-r from-tadegg-burgundy to-tadegg-green text-white shadow-lg hover:shadow-xl"
            )}
          >
            <span className="relative z-10">Blog</span>
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></span>
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-tadegg-burgundy/50 to-tadegg-green/50 blur-sm"></span>
          </Link>

          <button
            onClick={() => scrollToSection("contact")}
            className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/80 text-white px-4 py-2 rounded hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("md:hidden p-2", isScrolled ? "text-tadegg-brown" : "text-white")}
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full w-full shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-tadegg-brown hover:text-tadegg-burgundy py-2 border-b border-gray-100 text-left"
              >
                {label}
              </button>
            ))}

            <Link
              to="/blog"
              onClick={toggleMobileMenu}
              className="text-white bg-gradient-to-r from-tadegg-burgundy to-tadegg-green py-3 px-4 rounded-full text-center font-semibold shadow-md hover:shadow-lg transition-all animate-pulse"
            >
              Blog
            </Link>

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-tadegg-burgundy text-white px-4 py-2 rounded text-center"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
