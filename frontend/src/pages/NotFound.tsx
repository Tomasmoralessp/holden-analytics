
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/components/ui/Logo";
import CustomButton from "@/components/ui/CustomButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-holden-light-blue p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-holden-dark mb-4">404</h1>
        <p className="text-xl text-holden-gray mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        
        <div className="inline-block">
          <Link to="/">
            <CustomButton variant="primary" size="lg">
              Volver al Inicio
            </CustomButton>
          </Link>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-[30%] left-[20%] w-64 h-64 rounded-full bg-holden-cyan/5 blur-3xl"></div>
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-holden-dark/5 blur-3xl"></div>
    </div>
  );
};

export default NotFound;
