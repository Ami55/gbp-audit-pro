import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { AuditResult } from "../types";

export const generatePDF = (result: AuditResult) => {
  try {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = "#1a73e8"; // Google Blue
    const darkText = "#202124"; // Google Dark Slate
    const secondaryText = "#5f6368"; // Google Muted Gray

    // Page width is 210mm, height is 297mm
    const pageWidth = 210;
    const pageHeight = 297;

    // --- Header (Beautiful Floating Rounded Card) ---
    doc.setFillColor(primaryColor);
    doc.roundedRect(10, 10, pageWidth - 20, 36, 4, 4, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("GBP Audit Pro Report", 15, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 28);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Business Name: ${result.businessName || "Your Business"}`, 15, 37);

    // --- Overall Score Section ---
    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Overall Audit Performance Score", 15, 60);

    const scoreColors: Record<string, [number, number, number]> = {
      GREEN: [52, 168, 83],  // #34A853
      YELLOW: [251, 188, 5], // #FBBC05
      RED: [234, 67, 53]     // #EA4335
    };
    
    const scoreColor = scoreColors[result.overallColor] || [26, 115, 232];
    
    // Draw status background box with rounded corners
    doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.roundedRect(15, 66, 45, 24, 3, 3, "F");
    
    // Draw status score text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(`${result.totalScore}/100`, 18, 81);
    
    // Status text label next to the box
    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    
    const statusLabel = result.overallColor === "GREEN" 
      ? "STRONG PERFORMANCE (Optimized)" 
      : result.overallColor === "YELLOW" 
        ? "NEEDS IMPROVEMENT (Medium)" 
        : "CRITICAL GAPS DETECTED (Low)";
        
    doc.text(`Status: ${statusLabel}`, 68, 75);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(secondaryText);
    doc.text("Your profile represents a strong baseline, but addressing the priorities highlighted", 68, 81);
    doc.text("in the roadmap below will significantly boost your visibility in Local 3-Pack rankings.", 68, 86);

    // --- Detailed Factors Table ---
    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Detailed Factor Analysis", 15, 102);

    const tableHeaders = [["Ranking Factor", "Weight", "Score", "Rating Status", "Key AI Recommendations"]];
    const tableBody = (result.factors || []).map(f => [
      f.name || "N/A",
      `${f.weight || 0}%`,
      `${f.score || 0}/100`,
      f.color || "N/A",
      (f.recommendations || []).map(r => `• ${r}`).join("\n")
    ]);

    autoTable(doc, {
      startY: 107,
      head: tableHeaders,
      body: tableBody,
      theme: "striped",
      headStyles: {
        fillColor: [26, 115, 232], // Primary Google Blue
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        valign: "top"
      },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: "bold" },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: 25, halign: "center" },
        4: { cellWidth: 75 }
      },
      didParseCell: (data) => {
        // Color-code the "Rating Status" column (index 3)
        if (data.column.index === 3 && data.cell.section === "body") {
          const val = String(data.cell.raw);
          if (val === "GREEN") {
            data.cell.styles.textColor = [52, 168, 83];
            data.cell.styles.fontStyle = "bold";
          } else if (val === "YELLOW") {
            data.cell.styles.textColor = [217, 119, 6]; // Darker yellow for accessibility print
            data.cell.styles.fontStyle = "bold";
          } else if (val === "RED") {
            data.cell.styles.textColor = [220, 38, 38];
            data.cell.styles.fontStyle = "bold";
          }
        }
      }
    });

    // --- Best Practices Checklist Table ---
    const finalTableY = (doc as any).lastAutoTable?.finalY || 180;
    let currentY = finalTableY + 12;
    if (currentY > pageHeight - 65) {
      doc.addPage();
      currentY = 25;
    }

    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Best Practices & Missing Elements Audit", 15, currentY);
    currentY += 5;

    const bpHeaders = [["Audit Category", "Status", "Findings / Gaps Found", "Impact"]];
    const bpBody = (result.bestPractices || []).map(bp => [
      bp.category || "N/A",
      bp.status || "N/A",
      bp.details || "N/A",
      bp.impact || "N/A"
    ]);

    autoTable(doc, {
      startY: currentY,
      head: bpHeaders,
      body: bpBody,
      theme: "grid",
      headStyles: {
        fillColor: [52, 168, 83], // Google Green
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9.5
      },
      bodyStyles: {
        fontSize: 8.5,
        valign: "top"
      },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: "bold" },
        1: { cellWidth: 25, halign: "center" },
        2: { cellWidth: 90 },
        3: { cellWidth: 25, halign: "center" }
      },
      didParseCell: (data) => {
        if (data.column.index === 1 && data.cell.section === "body") {
          const val = String(data.cell.raw);
          if (val === "PASSED") {
            data.cell.styles.textColor = [52, 168, 83];
            data.cell.styles.fontStyle = "bold";
          } else if (val === "PARTIAL") {
            data.cell.styles.textColor = [217, 119, 6];
            data.cell.styles.fontStyle = "bold";
          } else if (val === "MISSING") {
            data.cell.styles.textColor = [220, 38, 38];
            data.cell.styles.fontStyle = "bold";
          }
        }
        if (data.column.index === 3 && data.cell.section === "body") {
          const val = String(data.cell.raw);
          if (val === "HIGH") {
            data.cell.styles.textColor = [220, 38, 38];
            data.cell.styles.fontStyle = "bold";
          } else if (val === "MEDIUM") {
            data.cell.styles.textColor = [217, 119, 6];
          } else if (val === "LOW") {
            data.cell.styles.textColor = [37, 99, 235];
          }
        }
      }
    });

    // --- Priority Roadmap Section ---
    const finalBpTableY = (doc as any).lastAutoTable?.finalY || (currentY + 40);
    let roadmapY = finalBpTableY + 12;

    // Check if we need a new page for Priority Roadmap
    if (roadmapY > pageHeight - 60) {
      doc.addPage();
      roadmapY = 25;
    }

    doc.setTextColor(darkText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Priority Roadmap & Action Steps", 15, roadmapY);
    roadmapY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(secondaryText);
    doc.text("Execute these steps in order to optimize rankings and satisfy search query signals.", 15, roadmapY);
    roadmapY += 10;

    const roadmapItems = result.priorityRoadmap || [];
    if (roadmapItems.length === 0) {
      doc.setFont("helvetica", "italic");
      doc.text("No high-priority critical issues found. Your profile is looking solid!", 15, roadmapY);
    } else {
      roadmapItems.forEach((item, index) => {
        // Split text to fit inside bounds
        const textLines = doc.splitTextToSize(`${index + 1}. ${item}`, pageWidth - 30);
        
        // Double check if this list item fits on the page
        const neededHeight = textLines.length * 5 + 6;
        if (roadmapY + neededHeight > pageHeight - 20) {
          doc.addPage();
          roadmapY = 25;
        }

        // Draw light background card for each step with rounded corners
        doc.setFillColor(248, 249, 250);
        doc.roundedRect(15, roadmapY - 4, pageWidth - 30, textLines.length * 5 + 5, 2, 2, "F");
        doc.setDrawColor(224, 224, 224);
        doc.roundedRect(15, roadmapY - 4, pageWidth - 30, textLines.length * 5 + 5, 2, 2, "S");

        doc.setTextColor(darkText);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        
        // Render text
        doc.text(textLines, 18, roadmapY + 2);
        roadmapY += textLines.length * 5 + 8;
      });
    }

    // --- Footer & Page Numbers with Rounded Page Borders ---
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      // Draw beautiful page border with rounded corners nested in the page margins
      doc.setDrawColor(218, 220, 224);
      doc.setLineWidth(0.35);
      doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 5, 5, "S");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      
      // Footer line
      doc.setDrawColor(230, 230, 230);
      doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
      
      doc.text("Generated by GBP Audit Pro — Powered by Google Gemini AI", 15, pageHeight - 10);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 35, pageHeight - 10);
    }

    // Save the PDF file
    const safeName = (result.businessName || "GBP_Audit_Report").replace(/[^a-z0-9]/gi, "_").toLowerCase();
    doc.save(`${safeName}_audit_report.pdf`);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("An error occurred while generating the PDF report. Please try again.");
  }
};
