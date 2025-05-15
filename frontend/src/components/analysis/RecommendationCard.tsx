import React from "react";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface RecommendationCardProps {
  content: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ content }) => {
  // Eliminar bloque de código si lo devuelve así ```plaintext\n...\n```
  const cleaned = content
    .replace(/^```(markdown|plaintext)?\n?/i, "")
    .replace(/```$/, "")
    .trim();

  // Dividir en secciones por doble salto de línea
  const sections = cleaned.split("\n\n");

  return (
    <div className="bg-blue-800/80 text-white border border-blue-900 shadow-xl rounded-2xl p-6 space-y-6 transition-all hover:scale-[1.01] hover:shadow-2xl duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold tracking-wide">
            Recomendación Estratégica Generada por IA
          </h3>
        </div>
        <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full font-semibold uppercase">
          IA
        </span>
      </div>

      <div className="text-sm leading-relaxed space-y-4">
        {sections.map((block, idx) => {
          const [title, ...rest] = block.trim().split(":\n");
          const body = rest.join(":\n");

          return (
            <div key={idx} className="bg-white/10 rounded-md p-4">
              <h4 className="font-semibold text-white mb-2">{title}:</h4>
              <div className="text-white/90 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{body}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-white/20 flex justify-end">
        <a
          href="#top_customers"
          className="text-sm text-white/80 hover:text-white underline transition"
        >
          Ver clientes en riesgo
        </a>
      </div>
    </div>
  );
};

export default RecommendationCard;
