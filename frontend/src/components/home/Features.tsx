
import React, { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, className, style }) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-2xl transition-all duration-500 hover:shadow-xl group", 
        "bg-white border border-gray-100 hover:border-holden-cyan/20",
        className
      )}
      style={style}
    >
      <div className="mb-5 rounded-full w-12 h-12 flex items-center justify-center bg-holden-light-blue text-holden-cyan group-hover:bg-holden-cyan group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-holden-dark">{title}</h3>
      <p className="text-holden-gray/80">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Análisis Predictivo Avanzado",
      description: "Algoritmos basados en IA que detectan patrones de comportamiento para prever futuras cancelaciones con precisión.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <circle cx="10" cy="13" r="2"/>
          <path d="m20 17-2-2-2 2 2 2 2-2Z"/>
          <path d="M13.7 14.7 16 17"/>
        </svg>
      )
    },
    {
      title: "Segmentación por Riesgo",
      description: "Categorización de clientes según su probabilidad de abandono, permitiendo intervenciones priorizadas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          <path d="M10 5c1 0 1.5-1 1.5-1 .5 0 .5 1 1.5 1 1 0 1.5-1 1.5-1 .5 0 .5 1 1.5 1s1.5-1 1.5-1"/>
          <path d="M5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          <path d="M10 5V4"/>
          <path d="M19 12V4"/>
          <path d="M5 12V4"/>
          <path d="M12 19h4"/>
          <path d="M5 19h2.5"/>
          <path d="M12 12v7"/>
        </svg>
      )
    },
    {
      title: "Tableros Personalizados",
      description: "Visualizaciones intuitivas de datos complejos con métricas de retención personalizables según tus necesidades.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M7 7h10"/>
          <path d="M7 12h10"/>
          <path d="M7 17h10"/>
        </svg>
      )
    },
    {
      title: "Alertas Proactivas",
      description: "Notificaciones automáticas cuando se detectan clientes con alto riesgo de abandono para una intervención oportuna.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
      )
    },
    {
      title: "Integraciones Sencillas",
      description: "Conexión fluida con tus sistemas de CRM, facturación y atención al cliente existentes a través de APIs robustas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" x2="22" y1="12" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      title: "Recomendaciones Accionables",
      description: "Sugerencias específicas para cada perfil de cliente, mejorando tu estrategia de retención con datos reales.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-holden-cyan font-medium px-3 py-1 rounded-full bg-holden-cyan/10 text-sm">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-holden-dark">
            Herramientas diseñadas para optimizar la retención
          </h2>
          <p className="text-holden-gray/80">
            Holden combina tecnología avanzada con interfaces intuitivas para transformar 
            datos en estrategias efectivas de retención de clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={`animate-fade-up opacity-0`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
