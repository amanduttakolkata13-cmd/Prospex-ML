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
        const headers = Object.keys(data[0]);
        const rows = data.map((item: Record<string, unknown>) =>
          headers.map((h) => String(item[h] ?? ""))
        );
        return [headers, ...rows];
      }
      return data.map((row: unknown[]) =>
        row.map((cell: unknown) => String(cell ?? ""))
      );
    }
  } catch {
    // Invalid JSON
  }
  return [];
}

// Simulated prediction logic based on model type
function simulatePrediction(
  data: string[][],
  model: string
): { predictions: number[]; confidence: number } {
  const numRows = Math.min(data.length - 1, 100); // Limit to 100 rows
  const predictions: number[] = [];
  let totalConfidence = 0;

  // Model-specific parameters
  const modelParams: Record<string, { baseConfidence: number; variance: number }> = {
    "Random Forest": { baseConfidence: 0.942, variance: 0.03 },
    "Neural Network": { baseConfidence: 0.968, variance: 0.02 },
    "XGBoost": { baseConfidence: 0.955, variance: 0.025 },
  };

  const params = modelParams[model] || modelParams["Random Forest"];

  for (let i = 0; i < numRows; i++) {
    // Generate pseudo-random prediction based on row index
    const seed = i * 17 + data[i + 1]?.length || 0;
    const prediction = Math.abs(Math.sin(seed) * 100);
    predictions.push(Math.round(prediction * 100) / 100);

    // Add some variance to confidence
    const confidence =
      params.baseConfidence +
      (Math.random() - 0.5) * params.variance;
    totalConfidence += confidence;
  }

  const avgConfidence = totalConfidence / numRows;

  return {
    predictions,
    confidence: Math.round(avgConfidence * 1000) / 1000,
  };
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
    let data: string[][] = [];

    // Parse based on file type
    if (file.name.endsWith(".csv")) {
      data = parseCSV(text);
    } else if (file.name.endsWith(".json")) {
      data = parseJSON(text);
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Use CSV or JSON." },
        { status: 400 }
      );
    }

    if (data.length < 2) {
      return NextResponse.json(
        { error: "Insufficient data for prediction" },
        { status: 400 }
      );
    }

    // Run prediction
    const result = simulatePrediction(data, model);

    // Calculate statistics
    const avg =
      result.predictions.reduce((a, b) => a + b, 0) / result.predictions.length;
    const max = Math.max(...result.predictions);
    const min = Math.min(...result.predictions);

    return NextResponse.json({
      success: true,
      model,
      predictions: result.predictions.slice(0, 20), // Return first 20 predictions
      confidence: result.confidence,
      statistics: {
        average: Math.round(avg * 100) / 100,
        max: Math.round(max * 100) / 100,
        min: Math.round(min * 100) / 100,
        totalPredictions: result.predictions.length,
      },
      timestamp: new Date().toISOString(),
      message: `Prediction completed using ${model} model with ${(result.confidence * 100).toFixed(1)}% confidence`,
    });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
