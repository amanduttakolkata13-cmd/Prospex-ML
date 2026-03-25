import { NextRequest, NextResponse } from "next/server";

// Simple CSV parser
function parseCSV(text: string): string[][] {
  const lines = text.trim().split("\n");
  return lines.map((line) =>
    line.split(",").map((cell) => cell.trim().replace(/^["']|["']$/g, ""))
  );
}

// Simple JSON parser for array data
function parseJSON(text: string): string[][] {
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0] === "object") {
        // Array of objects
        const headers = Object.keys(data[0]);
        const rows = data.map((item: Record<string, unknown>) =>
          headers.map((h) => String(item[h] ?? ""))
        );
        return [headers, ...rows];
      }
      // Array of arrays
      return data.map((row: unknown[]) =>
        row.map((cell: unknown) => String(cell ?? ""))
      );
    }
  } catch {
    // Invalid JSON
  }
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const model = (formData.get("model") as string) || "Random Forest";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file content
    const text = await file.text();
    let preview: string[][] = [];

    // Parse based on file type
    if (file.name.endsWith(".csv")) {
      preview = parseCSV(text);
    } else if (file.name.endsWith(".json")) {
      preview = parseJSON(text);
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Use CSV or JSON." },
        { status: 400 }
      );
    }

    // Validate data
    if (preview.length === 0) {
      return NextResponse.json(
        { error: "Empty or invalid dataset" },
        { status: 400 }
      );
    }

    // Return preview (first 10 rows)
    const limitedPreview = preview.slice(0, 10);

    return NextResponse.json({
      success: true,
      filename: file.name,
      model,
      preview: limitedPreview,
      totalRows: preview.length - 1, // Excluding header
      columns: preview[0]?.length || 0,
      message: `Dataset uploaded successfully. ${preview.length - 1} rows detected.`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
