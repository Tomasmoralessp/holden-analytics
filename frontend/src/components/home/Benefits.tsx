
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import CustomButton from '@/components/ui/CustomButton';

const Benefits: React.FC = () => {
  const progressCircleRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && progressCircleRef.current) {
          progressCircleRef.current.style.strokeDashoffset = '0';
        }
      });
    }, {
      threshold: 0.5
    });
    
    if (progressCircleRef.current) {
      observer.observe(progressCircleRef.current);
    }
    
    return () => {
      if (progressCircleRef.current) {
        observer.unobserve(progressCircleRef.current);
      }
    };
  }, []);

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-holden-light via-white to-holden-light-blue">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column with Image/Visualization */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Dashboard Mockup */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-holden-dark p-4 text-white flex justify-between items-center">
                  <div className="text-sm font-medium">Análisis de Retención - Q3 2023</div>
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-holden-light-blue p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500 mb-1">ROI</div>
                      <div className="font-bold text-holden-dark text-2xl">328%</div>
                    </div>
                    <div className="bg-holden-light-blue p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500 mb-1">LTV</div>
                      <div className="font-bold text-holden-dark text-2xl">+26%</div>
                    </div>
                    <div className="bg-holden-light-blue p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500 mb-1">Churn</div>
                      <div className="font-bold text-green-600 text-2xl">-18%</div>
                    </div>
                  </div>
                  
                  {/* Progress Visualization */}
                  <div className="flex items-center justify-center relative h-40 mb-6">
                    <svg className="w-36 h-36" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#eaeaea"
                        strokeWidth="10"
                      />
                      
                      {/* Progress circle */}
                      <circle
                        ref={progressCircleRef}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#00A3E0"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        transform="rotate(-90 50 50)"
                        style={{ 
                          transition: "stroke-dashoffset 2s ease-in-out"
                        }}
                      />
                      
                      {/* Percentage text */}
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fontSize="18"
                        fontWeight="bold"
                        fill="#1E3A8A"
                      >
                        82%
                      </text>
                    </svg>
                    
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                      Precisión
                    </div>
                  </div>
                  
                  {/* Customer Segments */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium mb-2">Segmentos por Riesgo</div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-holden-gray">Alto Riesgo</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="text-xs font-medium">15%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-holden-gray">Riesgo Medio</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "23%" }}></div>
                      </div>
                      <span className="text-xs font-medium">23%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-holden-gray">Bajo Riesgo</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                      <span className="text-xs font-medium">62%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-holden-cyan opacity-10 rounded-full blur-xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-holden-dark opacity-10 rounded-full blur-xl" />
            </div>
          </div>
          
          {/* Right Column with Text */}
          <div className="lg:col-span-6">
            <div>
              <span className="text-holden-cyan font-medium px-3 py-1 rounded-full bg-holden-cyan/10 text-sm">
                Resultados Concretos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-holden-dark">
                Beneficios tangibles para tu negocio
              </h2>
              <p className="text-holden-gray/80 mb-8">
                Nuestra plataforma transforma datos complejos en estrategias accionables, generando 
                resultados inmediatos y duraderos para empresas de telecomunicaciones.
              </p>
              
              {/* Benefits List */}
              <div className="space-y-6">
                {[
                  {
                    title: "Reducción del churn de hasta un 28%",
                    description: "Identifica clientes en riesgo antes de que consideren cancelar su suscripción.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    )
                  },
                  {
                    title: "ROI promedio de 328% en 6 meses",
                    description: "Maximiza el retorno de inversión con estrategias de retención basadas en datos.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    )
                  },
                  {
                    title: "Aumento del valor de vida del cliente (LTV)",
                    description: "Optimiza tus estrategias de fidelización para incrementar el valor total de cada relación comercial.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    )
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex gap-4 p-4 rounded-xl transition-all duration-300",
                      "hover:shadow-md hover:bg-white"
                    )}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-holden-light-blue flex items-center justify-center text-holden-cyan">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-holden-dark text-lg mb-1">{benefit.title}</h3>
                      <p className="text-holden-gray/80">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <CustomButton variant="primary" size="lg" className="group">
                  Ver Todos los Beneficios
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
