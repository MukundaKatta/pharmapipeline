# PharmaPipeline

**Drug Pipeline Management & Discovery Platform**

PharmaPipeline is a pharmaceutical pipeline management platform for tracking drug candidates from discovery through clinical trials. Manage experiments, analyze assay data, run image analysis, optimize hit-to-lead candidates, and visualize timelines with interactive Gantt charts.

## Features

- **Kanban Pipeline Board** -- Drag-and-drop pipeline management for drug candidates across stages
- **Experiment Tracker** -- Record and monitor laboratory experiments with metadata and results
- **Assay Data Dashboard** -- Visualize and analyze biological assay results with charts
- **Image Analysis** -- AI-powered analysis of microscopy and imaging data
- **Hit-to-Lead Optimizer** -- Computational optimization of lead compound candidates
- **Gantt Timeline** -- Interactive project timeline for tracking milestones and deadlines

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Drag & Drop:** dnd-kit (core, sortable, utilities)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Backend:** Supabase
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd pharmapipeline
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   └── page.tsx               # Main application (tabbed interface)
├── components/
│   ├── KanbanBoard.tsx        # Drug pipeline kanban
│   ├── ExperimentTracker.tsx  # Experiment management
│   ├── AssayDashboard.tsx     # Assay data visualization
│   ├── ImageAnalysis.tsx      # Microscopy image analysis
│   ├── HitToLeadOptimizer.tsx # Lead optimization
│   └── GanttTimeline.tsx      # Project timeline
└── lib/
    ├── store.ts               # Zustand state management
    └── mock-data.ts           # Sample pharmaceutical data
```

