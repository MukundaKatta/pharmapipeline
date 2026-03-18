'use client'

import { useStore } from '@/lib/store'
import { FlaskConical, Clock, CheckCircle, XCircle, Play } from 'lucide-react'

const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  planned: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  running: { icon: Play, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  completed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
}

const typeColors: Record<string, string> = {
  in_vitro: 'bg-purple-500/20 text-purple-300',
  in_vivo: 'bg-blue-500/20 text-blue-300',
  computational: 'bg-cyan-500/20 text-cyan-300',
  clinical: 'bg-emerald-500/20 text-emerald-300',
}

export default function ExperimentTracker() {
  const { experiments, drugs } = useStore()
  const getDrugName = (id: string) => drugs.find(d => d.id === id)?.name || 'Unknown'

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] overflow-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = experiments.filter(e => e.status === status).length
          const Icon = config.icon
          return (
            <div key={status} className="glass p-4">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${config.color}`} />
                <p className="text-xs text-white/50 capitalize">{status}</p>
              </div>
              <p className={`text-3xl font-bold mt-2 ${config.color}`}>{count}</p>
            </div>
          )
        })}
      </div>

      {/* Experiment List */}
      <div className="glass p-4">
        <h3 className="text-sm font-semibold text-white/70 mb-4">ALL EXPERIMENTS</h3>
        <div className="space-y-3">
          {experiments.map((exp) => {
            const config = statusConfig[exp.status]
            const StatusIcon = config.icon
            return (
              <div key={exp.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium">{exp.name}</p>
                      <p className="text-xs text-white/40">Drug: {getDrugName(exp.drug_id)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${typeColors[exp.type]}`}>{exp.type.replace('_', ' ')}</span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${config.bg} ${config.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {exp.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-[10px] text-white/40">Start Date</p>
                    <p className="text-sm">{exp.start_date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40">End Date</p>
                    <p className="text-sm">{exp.end_date || 'In Progress'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40">Results</p>
                    <p className="text-sm font-mono">{Object.keys(exp.results).length > 0 ? JSON.stringify(exp.results).slice(0, 40) : 'Pending'}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
