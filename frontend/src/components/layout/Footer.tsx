
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container px-6 md:px-10 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 text-holden-gray/80 max-w-md">
              Plataforma SaaS de análisis predictivo enfocada en la retención de clientes 
              en modelos de suscripción para empresas de telecomunicaciones.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-holden-dark mb-4">
              Producto
            </h3>
            <ul className="space-y-3">
              {["Características", "Precios", "Beneficios", "Casos de Éxito", "Roadmap"].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="#" 
                    className="text-holden-gray/80 hover:text-holden-cyan transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-holden-dark mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              {["Sobre Nosotros", "Equipo", "Carreras", "Prensa", "Blog"].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="#" 
                    className="text-holden-gray/80 hover:text-holden-cyan transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-holden-dark mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              {["Documentación", "API", "Guías", "Tutoriales", "Comunidad"].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="#" 
                    className="text-holden-gray/80 hover:text-holden-cyan transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-holden-dark mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              {["Soporte", "Ventas", "Atención", "Demostraciones", "Contratación"].map((item, index) => (
                <li key={index}>
                  <Link 
                    to="#" 
                    className="text-holden-gray/80 hover:text-holden-cyan transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:justify-between items-center">
          <div className="text-sm text-holden-gray/60">
            &copy; {new Date().getFullYear()} Holden Analytics. Todos los derechos reservados.
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="text-holden-gray/60 hover:text-holden-cyan transition-colors">
              Términos
            </Link>
            <Link to="#" className="text-holden-gray/60 hover:text-holden-cyan transition-colors">
              Privacidad
            </Link>
            <Link to="#" className="text-holden-gray/60 hover:text-holden-cyan transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
