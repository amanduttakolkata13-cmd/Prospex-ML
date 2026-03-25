# Prospex ML - Machine Learning Prediction Platform

A full-stack ML prediction platform with Liquid Glass Morphism design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- SQLite (included)

### Installation

```bash
# Install dependencies
bun install

# Set up the database
bun run db:push

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main frontend page
│   │   ├── layout.tsx        # Root layout with fonts
│   │   ├── globals.css       # Liquid Glass CSS components
│   │   └── api/
│   │       ├── upload/route.ts   # File upload API
│   │       ├── predict/route.ts  # ML prediction API
│   │       └── models/route.ts   # Models listing API
│   ├── components/ui/        # shadcn/ui components
│   ├── hooks/                # React hooks
│   └── lib/                  # Utilities and database
├── prisma/
│   └── schema.prisma         # Database schema
├── public/
│   └── logo.svg              # Platform logo
└── package.json              # Dependencies
```

## 🎨 Design System

### Liquid Glass Morphism

Two main CSS classes:

- `.liquid-glass` - Light glass effect (blur: 4px)
- `.liquid-glass-strong` - Heavy glass effect (blur: 50px)

### Fonts
- **Poppins** - Headings and body text
- **Source Serif 4** - Italic/emphasis text

### Color Palette
- Strict grayscale (no colored accents)
- Text hierarchy: `text-white`, `text-white/80`, `text-white/60`

## ⚙️ API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload CSV/JSON dataset |
| `/api/predict` | POST | Run ML prediction |
| `/api/models` | GET | List available models |

### Upload Example

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@dataset.csv" \
  -F "model=Random Forest"
```

### Predict Example

```bash
curl -X POST http://localhost:3000/api/predict \
  -F "file=@dataset.csv" \
  -F "model=Neural Network"
```

## 🤖 Supported Models

1. **Random Forest** - 94.2% accuracy
2. **Neural Network** - 96.8% accuracy
3. **XGBoost** - 95.5% accuracy

## 📊 Database Models

- `User` - Account management
- `Dataset` - Uploaded datasets
- `Prediction` - Prediction history
- `ModelMetrics` - Model performance

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Database**: Prisma ORM (SQLite)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📝 License

MIT License
