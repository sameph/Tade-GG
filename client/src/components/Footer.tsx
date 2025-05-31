import { Link } from "react-router-dom";
import { Coffee, Instagram, Facebook, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tadegg-green text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Tadegg Logo"
                className={"h-10 w-auto transition-opacity opacity-90"}
              />
              <span
                className={
                  "font-serif text-2xl font-bold transition-colorstext-white"
                }
              >
                Tadegg
              </span>
            </Link>
            <p className="text-white/80 mb-6">
              Premium Ethiopian coffee exporters, connecting the world to the
              birthplace of arabica coffee through quality, sustainability, and
              direct trade relationships.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:info@tadegg.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-choose-us"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#specialties"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Our Specialties
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">
              Coffee Varieties
            </h3>
            <ul className="space-y-4">
              <li className="text-white/80">Yirgacheffe</li>
              <li className="text-white/80">Sidamo</li>
              <li className="text-white/80">Guji</li>
              <li className="text-white/80">Harrar</li>
              <li className="text-white/80">Limu</li>
              <li className="text-white/80">Djimmah</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  Bole Road, Addis Ababa,
                  <br />
                  Ethiopia, East Africa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-white/80">info@tadegg.com</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-white/80">+251 111 234 567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} Tadegg Coffee Exporters. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6 text-white/70 text-sm">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
