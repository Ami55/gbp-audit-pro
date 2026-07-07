import { AuditResult, GBPData } from "../types";

const PROXY_URL = "https://gemini-proxy-boldstudio.vercel.app/api/gbp-audit";

export async function performAudit(data: GBPData | string): Promise<AuditResult> {
  const response = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Audit request failed");
  }

  return result as AuditResult;
}