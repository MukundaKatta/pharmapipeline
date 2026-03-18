'use client'

import { useStore } from '@/lib/store'
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts'

export default function AssayDashboard() {
  const { assays } = useStore()

  const scatterData = assays.map(a => ({ x: a.ic50 * 1000, y: a.selectivity, name: a.compound, potency: a.potency_class }))
  const barData = assays.map(a => ({ name: a.compound, IC50: a.ic50 * 1000, EC50: a.ec50 * 1000 }))

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-4">
          <p className="text-xs text-white/50">Total Compounds</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">{assays.length}</p>
        </div>
        <div className="glass p-4">
          <p className="text-xs text-white/50">High Potency Hits</p>
          <p className="text-3xl font-bold text-emerald-400 mt-1">{assays.filter(a => a.potency_class === 'high').length}</p>
        </div>
        <div className="glass p-4">
          <p className="text-xs text-white/50">Avg Selectivity</p>
          <p className="text-3xl font-bold text-purple-400 mt-1">{(assays.reduce((s, a) => s + a.selectivity, 0) / assays.length).toFixed(0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">IC50 vs SELECTIVITY</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="x" name="IC50 (nM)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <YAxis dataKey="y" name="Selectivity" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Scatter data={scatterData.filter(d => d.potency === 'high')} fill="#10b981" name="High" />
              <Scatter data={scatterData.filter(d => d.potency === 'medium')} fill="#f59e0b" name="Medium" />
              <Scatter data={scatterData.filter(d => d.potency === 'low')} fill="#ef4444" name="Low" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-4">
          <h3 className="text-sm font-semibold text-white/70 mb-4">POTENCY COMPARISON</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="IC50" fill="#3b82f6" name="IC50 (nM)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="EC50" fill="#10b981" name="EC50 (nM)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assay Table */}
      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">ASSAY DATA TABLE</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 text-white/50 text-xs">Compound</th>
              <th className="text-center py-2 px-3 text-white/50 text-xs">IC50 (uM)</th>
              <th className="text-center py-2 px-3 text-white/50 text-xs">EC50 (uM)</th>
              <th className="text-center py-2 px-3 text-white/50 text-xs">Selectivity</th>
              <th className="text-center py-2 px-3 text-white/50 text-xs">Potency</th>
            </tr>
          </thead>
          <tbody>
            {assays.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 px-3 font-medium">{a.compound}</td>
                <td className="py-2 px-3 text-center text-blue-300">{a.ic50.toFixed(3)}</td>
                <td className="py-2 px-3 text-center text-emerald-300">{a.ec50.toFixed(3)}</td>
                <td className="py-2 px-3 text-center">{a.selectivity}</td>
                <td className="py-2 px-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    a.potency_class === 'high' ? 'bg-emerald-500/20 text-emerald-400' :
                    a.potency_class === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {a.potency_class}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
