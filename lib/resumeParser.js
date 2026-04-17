import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import { fromBuffer } from "pdf2pic";
import path from "path";
import fs from "fs";

export async function parseResume(fileBuffer, fileType, fileName = "") {
  try {
    const type = fileType?.toLowerCase();
    const name = fileName?.toLowerCase();
    let text = "";

    // PDF Handling
    if (type === "application/pdf" || name.endsWith(".pdf")) {
      const data = await pdfParse(fileBuffer);
      text = data.text?.trim();

      // OCR Fallback for scanned docs
      if (!text || text.length < 50) {
        const tempDir = "/tmp"; 
        // Ensure directory exists for local dev
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        const converter = fromBuffer(fileBuffer, {
          density: 150,
          saveFilename: `ocr_${Date.now()}`,
          savePath: tempDir,
          format: "png",
        });

        const page = await converter(1);
        const ocrResult = await Tesseract.recognize(page.path, "eng");
        text = ocrResult.data.text;
        
        // Clean up temp file
        if (fs.existsSync(page.path)) fs.unlinkSync(page.path);
      }
    } 
    // ... rest of your logic (DOCX, TXT)
    
    return cleanText(text);
  } catch (error) {
    throw new Error(`Parsing failed: ${error.message}`);
  }
}