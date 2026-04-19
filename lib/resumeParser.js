import mammoth from "mammoth";
import DOMMatrix from "@thednp/dommatrix";

if (typeof globalThis.DOMMatrix === "undefined") {
  globalThis.DOMMatrix = DOMMatrix;
}

function normalizeText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/\u0000/g, "")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function parsePdf(fileBuffer) {
  const pdfModule = await import("pdf-parse");
  const pdfParse = pdfModule.default || pdfModule;
  const data = await pdfParse(fileBuffer);
  const text = normalizeText(data?.text || "");

  if (!text) {
    throw new Error(
      "No readable text found in this PDF. If it is a scanned image PDF, convert it to a text-based PDF or DOCX first."
    );
  }

  return text;
}

async function parseDocx(fileBuffer) {
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
  const text = normalizeText(result?.value || "");

  if (!text) {
    throw new Error("No readable text found in this DOCX file.");
  }

  return text;
}

function parseTxt(fileBuffer) {
  const text = normalizeText(fileBuffer.toString("utf-8"));

  if (!text) {
    throw new Error("The TXT file is empty.");
  }

  return text;
}

export async function parseResume(fileBuffer, fileType, fileName = "") {
  try {
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("Invalid or empty file buffer.");
    }

    const type = fileType?.toLowerCase() || "";
    const name = fileName?.toLowerCase() || "";

    if (type === "application/pdf" || name.endsWith(".pdf")) {
      return await parsePdf(fileBuffer);
    }

    if (
      type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    ) {
      return await parseDocx(fileBuffer);
    }

    if (type === "text/plain" || name.endsWith(".txt")) {
      return parseTxt(fileBuffer);
    }

    throw new Error(
      `Unsupported file format: ${fileType || fileName || "unknown file"}`
    );
  } catch (error) {
    throw new Error(error?.message || "Failed to parse resume.");
  }
}
