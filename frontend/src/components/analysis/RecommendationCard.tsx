import React from "react";
import { Sparkles } from "lucide-react";

interface RecommendationCardProps {
  content: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ content }) => {
  const sections = content.trim().split("\n\n");

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
          return (
            <div key={idx} className="bg-white/10 rounded-md p-4">
              <h4 className="font-semibold text-white mb-2">{title}:</h4>
              <p className="text-white/90 whitespace-pre-line">
                {rest.join(":\n")}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-white/20 flex justify-end">
        <a
          href="#top_customers"
          className="text-sm text-white/80 hover:text-white underline transition"
        >
    
        </a>
      </div>
    </div>
  );
};

export default RecommendationCard;
