'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { GripVertical, Plus, TrendingUp } from 'lucide-react'

const stages = [
  { id: 'discovery', label: 'Discovery', color: 'bg-gray-500' },
  { id: 'hit_to_lead', label: 'Hit-to-Lead', color: 'bg-amber-500' },
  { id: 'lead_optimization', label: 'Lead Opt.', color: 'bg-orange-500' },
  { id: 'preclinical', label: 'Preclinical', color: 'bg-blue-500' },
  { id: 'phase_1', label: 'Phase I', color: 'bg-indigo-500' },
  { id: 'phase_2', label: 'Phase II', color: 'bg-purple-500' },
  { id: 'phase_3', label: 'Phase III', color: 'bg-emerald-500' },
]

export default function KanbanBoard() {
  const { drugs, setDrugs } = useStore()
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleDragStart = (id: string) => setDraggedId(id)

  const handleDrop = (stage: string) => {
    if (!draggedId) return
    setDrugs(drugs.map(d => d.id === draggedId ? { ...d, stage: stage as any } : d))
    setDraggedId(null)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-120px)]">
      {stages.map((stage) => {
        const stageDrugs = drugs.filter(d => d.stage === stage.id)
        return (
          <div
            key={stage.id}
            className="min-w-[220px] flex-shrink-0 glass p-3 flex flex-col"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <div className={`w-2 h-2 rounded-full ${stage.color}`} />
              <h3 className="text-xs font-semibold text-white/70 flex-1">{stage.label}</h3>
              <span className="text-[10px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded-full">{stageDrugs.length}</span>
            </div>
            <div className="flex-1 space-y-2 overflow-auto">
              {stageDrugs.map((drug) => (
                <div
                  key={drug.id}
                  draggable
                  onDragStart={() => handleDragStart(drug.id)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing border border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-3 h-3 text-white/20" />
                    <p className="font-medium text-sm flex-1">{drug.name}</p>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{drug.target} | {drug.therapeutic_area}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">{(drug.probability_of_success * 100).toFixed(0)}% PoS</span>
                    </div>
                    <span className="text-[10px] text-white/30">${drug.estimated_revenue}M</span>
                  </div>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${stage.color} rounded-full`} style={{ width: `${drug.probability_of_success * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-white/30 mt-1">{drug.team_lead}</p>
                </div>
              ))}
              <button className="w-full p-2 rounded-xl border border-dashed border-white/10 text-white/30 text-xs hover:bg-white/5 flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" /> Add Drug
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
