'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { Zap, ArrowRight, Star } from 'lucide-react'

const mockCompounds = [
  { id: '1', name: 'PP-303-Hit1', potency: 30, selectivity: 40, absorption: 55, toxicity: 80, solubility: 65, stability: 50, score: 53.3 },
  { id: '2', name: 'PP-303-Hit2', potency: 92, selectivity: 85, absorption: 70, toxicity: 90, solubility: 80, stability: 75, score: 82.0 },
  { id: '3', name: 'PP-303-Opt1', potency: 88, selectivity: 90, absorption: 85, toxicity: 88, solubility: 78, stability: 82, score: 85.2 },
  { id: '4', name: 'PP-303-Opt2', potency: 78, selectivity: 72, absorption: 90, toxicity: 95, solubility: 88, stability: 85, score: 84.7 },
]

export default function HitToLeadOptimizer() {
  const [selected, setSelected] = useState([mockCompounds[0], mockCompounds[1]])

  const radarData = ['Potency', 'Selectivity', 'Absorption', 'Low Toxicity', 'Solubility', 'Stability'].map((prop) => {
    const key = prop.toLowerCase().replace('low ', '') as keyof typeof mockCompounds[0]
    const entry: Record<string, any> = { property: prop }
    selected.forEach(c => { entry[c.name] = c[key as keyof typeof c] })
    return entry
  })

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      <div className="glass p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-white/70 mb-3">COMPOUND LIBRARY</h3>
        <div className="space-y-2">
          {mockCompounds.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                if (selected.find(s => s.id === c.id)) {
                  setSelected(selected.filter(s => s.id !== c.id))
                } else {
                  setSelected([...selected, c])
                }
              }}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selected.find(s => s.id === c.id) ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{c.name}</p>
                <div className="flex items-center gap-1">
                  <Star className={`w-3 h-3 ${c.score >= 80 ? 'text-emerald-400' : 'text-white/20'}`} />
                  <span className="text-xs text-white/50">{c.score.toFixed(1)}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2">
                {[
                  { l: 'Pot', v: c.potency },
                  { l: 'Sel', v: c.selectivity },
                  { l: 'Abs', v: c.absorption },
                ].map(({ l, v }) => (
                  <div key={l} className="text-center">
                    <p className="text-[9px] text-white/30">{l}</p>
                    <p className={`text-[10px] font-bold ${v >= 70 ? 'text-emerald-400' : v >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{v}</p>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <button className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium text-sm flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" /> Generate Optimized Lead
        </button>
      </div>

      <div className="col-span-2 space-y-6 overflow-auto">
        {/* Radar Comparison */}
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">MULTI-PARAMETER OPTIMIZATION</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="property" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <PolarRadiusAxis tick={false} domain={[0, 100]} />
              {selected.map((c, i) => (
                <Radar key={c.id} dataKey={c.name} stroke={colors[i]} fill={colors[i]} fillOpacity={0.1} />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Optimization Path */}
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">OPTIMIZATION PATHWAY</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {mockCompounds.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2">
                <div className={`p-3 rounded-xl min-w-[140px] ${c.score >= 80 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5'}`}>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className={`text-lg font-bold ${c.score >= 80 ? 'text-emerald-400' : 'text-white/60'}`}>{c.score.toFixed(1)}</p>
                  <p className="text-[10px] text-white/30">Composite Score</p>
                </div>
                {i < mockCompounds.length - 1 && <ArrowRight className="w-4 h-4 text-white/20 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">COMPARISON TABLE</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-white/50 text-xs">Compound</th>
                <th className="text-center py-2 px-3 text-white/50 text-xs">Potency</th>
                <th className="text-center py-2 px-3 text-white/50 text-xs">Selectivity</th>
                <th className="text-center py-2 px-3 text-white/50 text-xs">Absorption</th>
                <th className="text-center py-2 px-3 text-white/50 text-xs">Low Tox</th>
                <th className="text-center py-2 px-3 text-white/50 text-xs">Solubility</th>
                <th className="text-center py-2 px-3 text-white/50 text-xs">Score</th>
              </tr>
            </thead>
            <tbody>
              {mockCompounds.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-2 px-3 font-medium">{c.name}</td>
                  {[c.potency, c.selectivity, c.absorption, c.toxicity, c.solubility].map((v, i) => (
                    <td key={i} className={`py-2 px-3 text-center ${v >= 70 ? 'text-emerald-400' : v >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{v}</td>
                  ))}
                  <td className="py-2 px-3 text-center font-bold text-blue-400">{c.score.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
