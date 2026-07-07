import React, { useState } from "react";
import { AuditForm } from "./components/AuditForm";
import { Dashboard } from "./components/Dashboard";
import { AuditResult, GBPData } from "./types";
import { performAudit } from "./services/gemini";
import { motion, AnimatePresence } from "motion/react";
import { Layout, ShieldCheck, Globe, Zap } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (data: GBPData | string) => {
    setIsLoading(true);
    setError(null);
    try {
      const auditResult = await performAudit(data);
      setResult(auditResult);
    } catch (err) {
      console.error("Audit failed:", err);
      setError("Failed to analyze profile. Please check your data or URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900">
      {/* Navigation / Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              GBP Audit <span className="text-blue-600">Pro</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-blue-600 transition-colors">SEO Guidelines</a>
            <a href="#" className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
              v2026.1.0
            </a>
          </div>
        </div>
      </nav>

      <main className="py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4"
            >
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  Optimize Your <span className="text-blue-600">Local Presence</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Our AI-powered engine analyzes your Google Business Profile against the latest 2026 ranking signals to give you a clear roadmap to the Local 3-Pack.
                </p>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-sm">Local Visibility</h3>
                    <p className="text-xs text-gray-500 mt-1">Rank higher in local search</p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-sm">AI Insights</h3>
                    <p className="text-xs text-gray-500 mt-1">Deep profile analysis</p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                      <Layout className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-sm">PDF Reports</h3>
                    <p className="text-xs text-gray-500 mt-1">Professional audit exports</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-medium">
                  {error}
                </div>
              )}

              <AuditForm onSubmit={handleAudit} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard result={result} onReset={() => setResult(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 GBP Audit Pro. Powered by Gemini AI. Built for Local SEO Professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
