import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Coffee, ChevronLeft } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isBlogPage = location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const position = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  };

  // Simplified blog navbar variant
  if (isBlogPage) {
    return (
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled ? "bg-white/95 shadow-md py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 font-serif text-2xl font-bold transition-all group",
              isScrolled ? "text-tadegg-brown" : "text-white hover:text-tadegg-cream"
            )}
          >
            <Coffee
              size={32}
              className={cn(
                "group-hover:rotate-12 transition-transform",
                isScrolled ? "text-tadegg-cream bg-tadegg-burgundy p-1 rounded-full" : ""
              )}
            />
            <span>Tadegg</span>
          </Link>

          {/* Optional back link or invisible placeholder */}
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hidden sm:inline-block",
              isScrolled ? "text-tadegg-burgundy hover:underline" : "text-transparent"
            )}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>
    );
  }

  // Default homepage navbar
  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-md py-2" : "bg-black/30 backdrop-blur-md py-4"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold">
          <img src="/logo.png" alt="Tadegg Logo" className="h-12 w-auto" />
          <span className={isScrolled ? "text-tadegg-brown" : "text-white"}>Tadegg</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {["about", "why-choose-us", "specialties", "our-process", "gallery"].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "hover:text-tadegg-burgundy transition-colors relative group",
                isScrolled ? "text-tadegg-brown" : "text-white"
              )}
            >
              <span className="capitalize">{id.replace("-", " ")}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-tadegg-burgundy scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform"></span>
            </button>
          ))}

          <Link
            to="/blog"
            className={cn(
              "relative group px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 animate-pulse",
              "bg-gradient-to-r from-tadegg-burgundy to-tadegg-green text-white shadow-md hover:shadow-lg"
            )}
          >
            <span className="relative z-10">Blog</span>
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-tadegg-burgundy/50 to-tadegg-green/50 blur-sm" />
          </Link>

          <button
            onClick={() => scrollToSection("contact")}
            className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/80 text-white px-4 py-2 rounded hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={toggleMobileMenu}
          className={cn("md:hidden p-2", isScrolled ? "text-tadegg-brown" : "text-white")}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
        <div className="md:hidden bg-white absolute w-full shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {["about", "why-choose-us", "specialties", "our-process", "gallery"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-tadegg-brown hover:text-tadegg-burgundy py-2 border-b border-gray-100"
              >
                {id.replace("-", " ")}
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
