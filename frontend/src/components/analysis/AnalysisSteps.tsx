import React from "react";
import {
  FileText,
  ClipboardCheck,
  ChartBar,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    title: "1. Subir archivo CSV",
    description:
      "Carga los datos de tus clientes para iniciar el análisis. El archivo debe incluir una fila por cliente con sus variables relevantes.",
    iconBg: "bg-blue-600",
    cardBg: "bg-blue-200",
    text: "text-blue-900",
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    title: "2. Ajuste de Costes",
    description:
      "Define el coste asociado a un falso positivo y uno a un falso negativo. Esto afecta directamente el umbral óptimo del modelo.",
    iconBg: "bg-rose-600",
    cardBg: "bg-rose-200",
    text: "text-rose-900",
    icon: <ClipboardCheck className="h-6 w-6 text-white" />,
  },
  {
    title: "3. Análisis y Explicaciones",
    description:
      "El modelo ajusta el umbral según tus costes y calcula el impacto económico, los clientes en riesgo y explicaciones SHAP.",
    iconBg: "bg-emerald-600",
    cardBg: "bg-emerald-200",
    text: "text-emerald-900",
    icon: <ChartBar className="h-6 w-6 text-white" />,
  },
  {
    title: "4. Recomendación Estratégica",
    description:
      "Una IA genera recomendaciones personalizadas según patrones detectados para ayudarte a mejorar la retención.",
    iconBg: "bg-purple-600",
    cardBg: "bg-purple-200",
    text: "text-purple-900",
    icon: <TrendingUp className="h-6 w-6 text-white" />,
  },
];

const AnalysisFlowCard: React.FC = () => {
  return (
    <div className="mb-12 px-4">
      <h2 className="text-3xl font-bold text-holden-dark mb-10 text-center tracking-tight">
        ¿Cómo funciona el análisis?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl shadow-lg transition transform hover:scale-[1.02] ${step.cardBg}`}
          >
            <div
              className={`absolute -top-6 left-6 w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center shadow-md`}
            >
              {step.icon}
            </div>

            <div className="mt-8">
              <h3 className={`text-lg font-semibold mb-2 ${step.text}`}>
                {step.title}
              </h3>
              <p className={`text-sm ${step.text} leading-relaxed`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisFlowCard;
