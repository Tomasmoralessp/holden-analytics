
import React from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-holden-dark to-holden-dark/90">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para optimizar tu estrategia de retención?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Holden te ayuda a anticipar las cancelaciones y tomar medidas proactivas.
            Comienza ahora y mejora la retención de tus clientes.
          </p>
          <Link to="/analysis">
            <CustomButton size="lg" withArrow className="text-lg px-8 py-6">
              Comenzar ahora
            </CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
