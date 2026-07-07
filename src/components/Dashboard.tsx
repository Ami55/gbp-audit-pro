import React from "react";
import { AuditResult, AuditColor } from "../types";
import { ScoreGauge } from "./ScoreGauge";
import { FactorCard } from "./FactorCard";
import { FileDown, ArrowLeft, CheckCircle2, AlertCircle, XCircle, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { generatePDF } from "../utils/pdfGenerator";
import { motion } from "motion/react";

interface DashboardProps {
  result: AuditResult;
  onReset: () => void;
}

const COLORS = {
  [AuditColor.GREEN]: "#34A853",
  [AuditColor.YELLOW]: "#FBBC05",
  [AuditColor.RED]: "#EA4335",
};

const STATUS_TEXT = {
  [AuditColor.GREEN]: "Strong Performance",
  [AuditColor.YELLOW]: "Needs Improvement",
  [AuditColor.RED]: "Critical Gaps",
};

export const Dashboard: React.FC<DashboardProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Audit Input
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => generatePDF(result)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md flex-shrink-0"
          >
            <FileDown className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Overall Audit Score</h2>
          <ScoreGauge score={result.totalScore} color={COLORS[result.overallColor]} />
          <div className="mt-4">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-bold text-white inline-block"
              style={{ backgroundColor: COLORS[result.overallColor] }}
            >
              {STATUS_TEXT[result.overallColor]}
            </span>
          </div>
          <p className="mt-6 text-gray-500 text-sm max-w-xs">
            Your profile is currently performing better than {result.totalScore}% of local competitors in your category.
          </p>
        </motion.div>

        {/* Priority Roadmap Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-blue-500" /> Priority Roadmap
          </h2>
          <div className="space-y-4">
            {result.priorityRoadmap.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* NEW: Best Practices & Missing Elements Audit Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-12"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#34A853]" /> Best Practices & Missing Elements Audit
          </h2>
          <p className="text-gray-500">
            A real-time check of your categories, listings, updates, and activities against standard Local SEO best practices.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="pb-4 pt-2">Audit Category</th>
                <th className="pb-4 pt-2 text-center">Status</th>
                <th className="pb-4 pt-2">Findings & Missing Parts</th>
                <th className="pb-4 pt-2 text-center">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {result.bestPractices && result.bestPractices.map((bp, i) => {
                let statusBadge = null;
                if (bp.status === "PASSED") {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                    </span>
                  );
                } else if (bp.status === "PARTIAL") {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5" /> PARTIAL
                    </span>
                  );
                } else {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                      <XCircle className="w-3.5 h-3.5" /> MISSING
                    </span>
                  );
                }

                let impactBadge = null;
                if (bp.impact === "HIGH") {
                  impactBadge = <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">HIGH</span>;
                } else if (bp.impact === "MEDIUM") {
                  impactBadge = <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">MEDIUM</span>;
                } else {
                  impactBadge = <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">LOW</span>;
                }

                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-semibold text-gray-900 text-sm align-top">
                      {bp.category}
                    </td>
                    <td className="py-4 text-center align-top">
                      {statusBadge}
                    </td>
                    <td className="py-4 text-gray-600 text-sm pr-4 leading-relaxed align-top">
                      {bp.details}
                    </td>
                    <td className="py-4 text-center align-top">
                      {impactBadge}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Factor Analysis</h2>
        <p className="text-gray-500">A breakdown of the critical elements determining your Local 3-Pack ranking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.factors.map((factor, i) => (
          <FactorCard key={i} factor={factor} />
        ))}
      </div>
    </div>
  );
};
