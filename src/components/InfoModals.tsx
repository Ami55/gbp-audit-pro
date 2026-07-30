import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, CheckCircle2, HelpCircle, BookOpen, AlertCircle, ArrowRight, Layers, Target, FileText } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "how-it-works" | "seo-guidelines";
}

export function InfoModal({ isOpen, onClose, type }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col relative z-10 border border-gray-100"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl ${type === "how-it-works" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>
                {type === "how-it-works" ? <HelpCircle className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {type === "how-it-works" ? "How GBP Audit Pro Works" : "Google Business Profile SEO Guidelines"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {type === "how-it-works" ? "Step-by-step audit overview" : "Core standards & 15 critical checkpoints for 2026"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              title="Close modal"
              id="close-modal-btn"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 overflow-y-auto flex-1">
            {type === "how-it-works" ? (
              <div className="space-y-8">
                <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 text-sm text-blue-800 leading-relaxed">
                  GBP Audit Pro runs a comprehensive simulation and analytical check matching your Google Business Profile data against ranking signals used to generate Google's **Local 3-Pack**. It identifies optimization gaps and delivers a priority roadmap.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Step 1 */}
                  <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex gap-4">
                    <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Input Information</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Fill in our custom audit form with your business details, categories, contact points, and photo counts, or simply paste a Google Maps business URL.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex gap-4">
                    <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">AI Factor Scoring</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our model evaluates your profile on Relevance, Distance/Proximity, Prominence, Trust/E-E-A-T, and Engagement to compute an overall 1-100 performance score.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex gap-4">
                    <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Missing Parts Checklist</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We systematically run through **15 core checklist items** representing standard Local SEO best practices to verify compliance, highlighting missing elements.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex gap-4">
                    <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Actionable PDF Export</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Instantly download a professionally designed PDF report with customized rounded corner grids and colors to share with clients or execute your tasks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Are you ready to optimize?</h4>
                      <p className="text-xs text-gray-500">Run an audit to unlock the complete analysis.</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                  >
                    Start Audit Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50/40 p-5 rounded-2xl border border-green-100 text-sm text-green-800 leading-relaxed mb-4">
                  Google Business Profile (GBP) optimization requires adherence to Google's official merchant guidelines and local ranking algorithms. Here are the 15 pillars analyzed in our audit checklist:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      num: "1",
                      title: "Business Name Consistency",
                      desc: "The profile name must match your legal business name exactly. No taglines, phone numbers, or stuffed keywords. NAP (Name, Address, Phone) must remain identical across your website and directories."
                    },
                    {
                      num: "2",
                      title: "Category Optimization",
                      desc: "Set your single primary category carefully as it holds the highest ranking weight. Add 2-5 highly relevant secondary categories, avoiding algorithmic-noise or irrelevant categories."
                    },
                    {
                      num: "3",
                      title: "Location & SAB Configuration",
                      desc: "If you operate as a Service Area Business (SAB) without a physical walk-in office, you must hide your address from customers and define realistic service areas to avoid suspensions."
                    },
                    {
                      num: "4",
                      title: "Contact & Deep-Linking",
                      desc: "Ensure consistent local phone numbers. Setup active, monitored messaging. Deep-link the website field directly to specific city landing pages with trackable campaign UTM parameters."
                    },
                    {
                      num: "5",
                      title: "Operating Hours Accuracy",
                      desc: "Set operating hours that reflect actual customer support availability. Do not list 24/7 unless you genuinely have a live representative answering phone calls around the clock."
                    },
                    {
                      num: "6",
                      title: "Business Description",
                      desc: "Write an appealing description under 750 characters highlighting business history and uniqueness. Do not include URLs, promotional pitch languages, or pricing lists."
                    },
                    {
                      num: "7",
                      title: "Services & Products Listings",
                      desc: "Build out 5-10 distinct tour, service, or product packages with pricing and individual custom booking deep-links. This is highly prioritized by Google's semantic search."
                    },
                    {
                      num: "8",
                      title: "Visual Trust & Photos",
                      desc: "Maintain 30+ high-quality, geotagged files. Features should include interior, exterior, team action shots, actual service delivery, and a consistent high-res brand logo."
                    },
                    {
                      num: "9",
                      title: "Attributes & Payments",
                      desc: "Fill out key attributes like accepted payment methods (NFC, credit/debit), crowd/diversity characteristics, and all primary languages spoken by your staff."
                    },
                    {
                      num: "10",
                      title: "Proactive Customer Q&A",
                      desc: "Seed 3-5 frequently asked questions (such as booking process, cancellation policy, group sizes) and answer them from the owner's account to preempt user friction."
                    },
                    {
                      num: "11",
                      title: "Reviews & Reply Cadence",
                      desc: "Aim for a 4.5+ average rating. Set up a habit to respond to all new reviews (both positive and negative) within 24-48 hours with personalized, non-templated text."
                    },
                    {
                      num: "12",
                      title: "Updates & Posts Cadence",
                      desc: "Post regular high-quality updates, offers, or event notices every 1-2 weeks. This signals profile freshness and active operation to search crawlers."
                    },
                    {
                      num: "13",
                      title: "Social Profiles & sameAs",
                      desc: "Add at least 5 structured social links (Facebook, Instagram, TripAdvisor, Trustpilot, etc.) to help Google construct strong entity recognition networks."
                    },
                    {
                      num: "14",
                      title: "Website Consistency",
                      desc: "Ensure all profile elements (name, primary category terms, location hours) match character-for-character with the text on the landing page linked on your profile."
                    },
                    {
                      num: "15",
                      title: "Compliance & Risk Flags",
                      desc: "Periodically check for duplicate listings, pending verification alerts, or unauthorized managers to safeguard your listing from hijackings and suspensions."
                    }
                  ].map((guide, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50/80 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-green-700 bg-green-100/70 px-2 py-0.5 rounded-full">
                          #{guide.num}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm">{guide.title}</h4>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {guide.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50">
            <button
              onClick={onClose}
              className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
              id="close-modal-footer-btn"
            >
              Got it, thanks!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
