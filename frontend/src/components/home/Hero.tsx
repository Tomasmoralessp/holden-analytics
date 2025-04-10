
import React, { useEffect, useRef } from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const circleRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    const animateCircle = () => {
      if (circleRef.current) {
        // Get the total length of the circle path
        const length = circleRef.current.getTotalLength();
        
        // Set up the starting position
        circleRef.current.style.strokeDasharray = `${length} ${length}`;
        circleRef.current.style.strokeDashoffset = `${length}`;
        
        // Trigger animation
        circleRef.current.getBoundingClientRect();
        circleRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
        circleRef.current.style.strokeDashoffset = '30';
      }
    };
    
    // Start the animation with a slight delay
    const timer = setTimeout(animateCircle, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative bg-gradient-to-b from-white to-holden-light-blue">
      <div className="container px-6 md:px-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 z-10">
            <div className="max-w-3xl">
              <span className="text-holden-cyan font-medium text-sm md:text-base inline-block py-1 px-3 rounded-full bg-holden-cyan/10 mb-4 reveal-delay-1">
                Analítica Predictiva para Retención de Clientes
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-holden-dark tracking-tight mb-6 reveal-delay-2">
                Predice y reduce la cancelación de clientes con IA avanzada
              </h1>
              
              <p className="text-lg md:text-xl text-holden-gray/80 mb-8 reveal-delay-3">
                Holden ayuda a empresas de telecomunicaciones a anticipar cancelaciones, 
                mejorando estrategias de fidelización con análisis predictivo de precisión.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 reveal-delay-4">
                <CustomButton size="lg" variant="primary" withArrow className="group">
                  Comenzar Ahora
                </CustomButton>
                <CustomButton size="lg" variant="outline">
                  Ver Demostración
                </CustomButton>
              </div>
              
              <div className="mt-10 flex items-center space-x-6 text-sm text-holden-gray reveal-delay-4">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-holden-cyan" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4L3 21l4-4L13 3z" />
                  </svg>
                  <span>Precisión del 95%</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-holden-cyan" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Implementación Sencilla</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Graphic */}
          <div className="lg:col-span-5 z-10">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Analytics Dashboard Mockup */}
              <div className="absolute inset-0 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl">
                {/* Top Bar */}
                <div className="bg-holden-dark text-white p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs">Holden Analytics</div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6">
                  {/* Chart Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-holden-dark">Predicción de Churn</h3>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Actualizado
                    </div>
                  </div>
                  
                  {/* Main Chart */}
                  <div className="relative h-60 mb-6">
                    {/* Chart background lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-t border-gray-100 relative">
                          <span className="absolute -top-2 -left-1 text-[10px] text-gray-400">
                            {100 - i * 20}%
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Chart line */}
                    <svg className="absolute inset-0" viewBox="0 0 400 200">
                      <path
                        d="M0,150 C50,120 100,190 150,100 C200,40 250,80 300,50 C350,30 400,60 400,90"
                        className="stroke-holden-cyan"
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        style={{
                          animation: "dash 2s ease-in-out forwards 0.5s"
                        }}
                      />
                      <style>
                        {`
                          @keyframes dash {
                            to {
                              stroke-dashoffset: 0;
                            }
                          }
                        `}
                      </style>
                    </svg>
                    
                    {/* Data Points */}
                    {[
                      { x: 0, y: 150 },
                      { x: 50, y: 120 },
                      { x: 100, y: 190 },
                      { x: 150, y: 100 },
                      { x: 200, y: 40 },
                      { x: 250, y: 80 },
                      { x: 300, y: 50 },
                      { x: 350, y: 30 },
                      { x: 400, y: 90 }
                    ].map((point, index) => (
                      <div
                        key={index}
                        className="absolute w-3 h-3 bg-white border-2 border-holden-cyan rounded-full transform -translate-x-1.5 -translate-y-1.5"
                        style={{
                          left: `${(point.x / 400) * 100}%`,
                          top: `${(point.y / 200) * 100}%`,
                          animation: `fade-in 0.3s ease-out forwards ${0.8 + index * 0.1}s`,
                          opacity: 0
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-holden-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Churn</div>
                      <div className="font-bold text-holden-dark">15.2%</div>
                    </div>
                    <div className="bg-holden-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Retención</div>
                      <div className="font-bold text-holden-dark">84.8%</div>
                    </div>
                    <div className="bg-holden-light p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Predicción</div>
                      <div className="font-bold text-green-600">+2.3%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Analytics Circle */}
              <div className="absolute w-64 h-64 -top-8 -right-8 z-[-1]">
                <svg viewBox="0 0 100 100" className="w-full h-full rotate-180">
                  <circle
                    ref={circleRef}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00A3E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="opacity-20"
                  />
                </svg>
              </div>
              
              {/* Decorative Element - Bottom Left */}
              <div className="absolute -bottom-12 -left-16 w-48 h-48 bg-holden-dark opacity-10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-b from-holden-cyan/5 to-transparent rounded-bl-full z-0" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-gradient-to-t from-holden-dark/5 to-transparent rounded-tr-full z-0" />
    </section>
  );
};

export default Hero;
