import { NextRequest, NextResponse } from "next/server";

// Available ML models
const AVAILABLE_MODELS = [
  {
    id: "random-forest",
    name: "Random Forest",
    type: "ensemble",
    accuracy: 94.2,
    speed: 85,
    description: "Ensemble learning method using multiple decision trees",
    features: ["Feature importance", "Handles missing values", "Robust to outliers"],
  },
  {
    id: "neural-network",
    name: "Neural Network",
    type: "deep-learning",
    accuracy: 96.8,
    speed: 72,
    description: "Deep learning model with multiple hidden layers",
    features: ["Complex pattern recognition", "Scalable architecture", "GPU acceleration"],
  },
  {
    id: "xgboost",
    name: "XGBoost",
    type: "gradient-boosting",
    accuracy: 95.5,
    speed: 88,
    description: "Optimized gradient boosting implementation",
    features: ["Regularization", "Parallel processing", "Built-in cross-validation"],
  },
];

export async function GET() {
  return NextResponse.json({
    models: AVAILABLE_MODELS,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "compare") {
      // Return model comparison data
      return NextResponse.json({
        comparison: AVAILABLE_MODELS.map((model) => ({
          ...model,
          metrics: {
            precision: model.accuracy - Math.random() * 2,
            recall: model.accuracy - Math.random() * 3,
            f1Score: model.accuracy - Math.random() * 1.5,
          },
        })),
      });
    }

    return NextResponse.json({ models: AVAILABLE_MODELS });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
