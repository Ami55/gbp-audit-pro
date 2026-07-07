export enum AuditColor {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  RED = "RED",
}

export interface AuditFactor {
  name: string;
  score: number;
  weight: number;
  color: AuditColor;
  recommendations: string[];
  analysis: string;
}

export interface BestPracticeItem {
  category: string; // e.g., "Categories", "Services", "Updates & Posts", "Photos & Visuals", "Hours & Openness"
  status: "PASSED" | "MISSING" | "PARTIAL";
  details: string; // Detailed description of what is missing or found
  impact: "HIGH" | "MEDIUM" | "LOW";
}

export interface AuditResult {
  businessName: string;
  totalScore: number;
  overallColor: AuditColor;
  factors: AuditFactor[];
  priorityRoadmap: string[];
  bestPractices: BestPracticeItem[];
}


export interface GBPData {
  businessName: string;
  primaryCategory: string;
  secondaryCategories: string;
  description: string;
  address: string;
  serviceArea: string;
  reviewCount: number;
  averageRating: number;
  recentReviewSentiment: string;
  photoQuality: string;
  postFrequency: string;
  responseTime: string;
  openingHours: string;
}
