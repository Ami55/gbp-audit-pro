import React, { useState } from "react";
import { GBPData } from "../types";
import { Search, Building2, MapPin, Star, Camera, Clock, MessageSquare, Link as LinkIcon, Edit3 } from "lucide-react";

interface AuditFormProps {
  onSubmit: (data: GBPData | string) => void;
  isLoading: boolean;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onSubmit, isLoading }) => {
  const [mode, setMode] = useState<"url" | "manual">("url");
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState<GBPData>({
    businessName: "",
    primaryCategory: "",
    secondaryCategories: "",
    description: "",
    address: "",
    serviceArea: "",
    reviewCount: 0,
    averageRating: 0,
    recentReviewSentiment: "",
    photoQuality: "",
    postFrequency: "",
    responseTime: "",
    openingHours: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "url") {
      onSubmit(url);
    } else {
      onSubmit(formData);
    }
  };

  const inputClass = "w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 w-fit mx-auto">
        <button
          onClick={() => setMode("url")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            mode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <LinkIcon className="w-4 h-4" /> URL Audit
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            mode === "manual" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Edit3 className="w-4 h-4" /> Manual Entry
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === "url" ? "Audit via URL" : "Manual GBP Audit"}
          </h2>
          <p className="text-gray-500">
            {mode === "url" 
              ? "Paste the link to your Google Business Profile for an automated AI audit." 
              : "Provide your business details manually for a comprehensive Local SEO audit."}
          </p>
        </div>

        {mode === "url" ? (
          <div className="space-y-4">
            <div>
              <label className={labelClass}><LinkIcon className="w-4 h-4" /> Profile URL</label>
              <input
                required
                type="url"
                className={inputClass}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.google.com/maps/place/..."
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-700 leading-relaxed">
                <strong>Tip:</strong> You can find your profile URL by searching for your business on Google Maps and copying the address bar link.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className={labelClass}><Building2 className="w-4 h-4" /> Business Name</label>
                <input
                  required
                  className={inputClass}
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Joe's Authentic Pizza"
                />
              </div>
              <div>
                <label className={labelClass}><Search className="w-4 h-4" /> Primary Category</label>
                <input
                  required
                  className={inputClass}
                  value={formData.primaryCategory}
                  onChange={(e) => setFormData({ ...formData, primaryCategory: e.target.value })}
                  placeholder="e.g. Pizza Restaurant"
                />
              </div>
              <div>
                <label className={labelClass}>Secondary Categories</label>
                <input
                  className={inputClass}
                  value={formData.secondaryCategories}
                  onChange={(e) => setFormData({ ...formData, secondaryCategories: e.target.value })}
                  placeholder="e.g. Italian Restaurant, Delivery"
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${inputClass} h-24 resize-none`}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your business..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}><MapPin className="w-4 h-4" /> Address</label>
                <input
                  className={inputClass}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full business address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}><Star className="w-4 h-4" /> Reviews</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={formData.reviewCount}
                    onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    className={inputClass}
                    value={formData.averageRating}
                    onChange={(e) => setFormData({ ...formData, averageRating: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}><Camera className="w-4 h-4" /> Photo Quality/Quantity</label>
                <select
                  className={inputClass}
                  value={formData.photoQuality}
                  onChange={(e) => setFormData({ ...formData, photoQuality: e.target.value })}
                >
                  <option value="">Select status...</option>
                  <option value="High (50+ professional photos)">High (50+ professional photos)</option>
                  <option value="Medium (10-50 mixed photos)">Medium (10-50 mixed photos)</option>
                  <option value="Low (<10 photos)">Low (&lt;10 photos)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}><MessageSquare className="w-4 h-4" /> Review Response Time</label>
                <select
                  className={inputClass}
                  value={formData.responseTime}
                  onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
                >
                  <option value="">Select status...</option>
                  <option value="Under 24 hours">Under 24 hours</option>
                  <option value="24-48 hours">24-48 hours</option>
                  <option value="Over 48 hours">Over 48 hours</option>
                  <option value="Rarely respond">Rarely respond</option>
                </select>
              </div>
              <div>
                <label className={labelClass}><Clock className="w-4 h-4" /> Opening Hours Status</label>
                <select
                  className={inputClass}
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                >
                  <option value="">Select status...</option>
                  <option value="Fully accurate & updated">Fully accurate & updated</option>
                  <option value="Mostly accurate">Mostly accurate</option>
                  <option value="Outdated/Missing">Outdated/Missing</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing Profile...
            </>
          ) : (
            "Generate Audit Report"
          )}
        </button>
      </form>
    </div>
  );
};
