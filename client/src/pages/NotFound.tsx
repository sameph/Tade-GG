
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">This page could not be found</p>
        <Link to="/" className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
