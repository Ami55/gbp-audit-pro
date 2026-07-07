import React from "react";
import { AuditFactor, AuditColor } from "../types";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";

interface FactorCardProps {
  factor: AuditFactor;
}

const COLORS = {
  [AuditColor.GREEN]: "#34A853",
  [AuditColor.YELLOW]: "#FBBC05",
  [AuditColor.RED]: "#EA4335",
};

const ICONS = {
  [AuditColor.GREEN]: <CheckCircle2 className="w-5 h-5 text-[#34A853]" />,
  [AuditColor.YELLOW]: <AlertCircle className="w-5 h-5 text-[#FBBC05]" />,
  [AuditColor.RED]: <XCircle className="w-5 h-5 text-[#EA4335]" />,
};

export const FactorCard: React.FC<FactorCardProps> = ({ factor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{factor.name}</h3>
          <p className="text-sm text-gray-500">Weight: {factor.weight}%</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            {ICONS[factor.color]}
            <span className="text-xl font-bold" style={{ color: COLORS[factor.color] }}>
              {factor.score}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {factor.analysis}
      </p>

      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recommendations</h4>
        <ul className="space-y-1">
          {factor.recommendations.map((rec, i) => (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-gray-300">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
