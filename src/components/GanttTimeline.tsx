'use client'

import { useStore } from '@/lib/store'

export default function GanttTimeline() {
  const { ganttTasks, drugs } = useStore()
  const getDrugName = (id: string) => drugs.find(d => d.id === id)?.name || 'Unknown'

  // Calculate timeline range
  const allDates = ganttTasks.flatMap(t => [new Date(t.start), new Date(t.end)])
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)

  const getPosition = (dateStr: string) => {
    const date = new Date(dateStr)
    return ((date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100
  }

  const getWidth = (startStr: string, endStr: string) => {
    const start = new Date(startStr)
    const end = new Date(endStr)
    return ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100
  }

  // Generate month markers
  const months: { label: string; position: number }[] = []
  const current = new Date(minDate)
  current.setDate(1)
  while (current <= maxDate) {
    months.push({
      label: current.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      position: getPosition(current.toISOString().split('T')[0]),
    })
    current.setMonth(current.getMonth() + 3)
  }

  // Today marker
  const today = new Date()
  const todayPos = today >= minDate && today <= maxDate ? getPosition(today.toISOString().split('T')[0]) : -1

  return (
    <div className="glass p-6 h-[calc(100vh-120px)] overflow-auto">
      <h3 className="text-sm font-semibold text-white/70 mb-6">PIPELINE GANTT TIMELINE</h3>

      {/* Month headers */}
      <div className="relative h-8 mb-2 ml-48">
        {months.map((m, i) => (
          <div key={i} className="absolute text-[10px] text-white/40" style={{ left: `${m.position}%` }}>
            <div className="h-4 border-l border-white/10" />
            {m.label}
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {ganttTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-4">
            <div className="w-44 flex-shrink-0">
              <p className="text-sm font-medium truncate">{task.name}</p>
              <p className="text-[10px] text-white/40">{getDrugName(task.drug_id)}</p>
            </div>
            <div className="flex-1 relative h-10">
              {/* Background */}
              <div className="absolute inset-0 bg-white/3 rounded-lg" />

              {/* Today line */}
              {todayPos >= 0 && (
                <div className="absolute top-0 bottom-0 w-0.5 bg-red-500/50 z-10" style={{ left: `${todayPos}%` }} />
              )}

              {/* Task bar */}
              <div
                className="absolute top-1 bottom-1 rounded-lg overflow-hidden"
                style={{ left: `${getPosition(task.start)}%`, width: `${getWidth(task.start, task.end)}%` }}
              >
                {/* Background */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: task.color }} />
                {/* Progress fill */}
                <div
                  className="absolute top-0 bottom-0 left-0 rounded-lg"
                  style={{ width: `${task.progress}%`, backgroundColor: task.color, opacity: 0.6 }}
                />
                {/* Label */}
                <div className="absolute inset-0 flex items-center px-2">
                  <span className="text-[10px] font-medium text-white/80">{task.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend & Summary */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-xs text-white/40">Active Programs</p>
          <p className="text-2xl font-bold text-blue-400">{ganttTasks.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-xs text-white/40">Average Progress</p>
          <p className="text-2xl font-bold text-emerald-400">
            {(ganttTasks.reduce((s, t) => s + t.progress, 0) / ganttTasks.length).toFixed(0)}%
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-xs text-white/40">Nearest Milestone</p>
          <p className="text-sm font-bold text-amber-400">PP-707 Phase 3 Readout</p>
          <p className="text-[10px] text-white/30">Q4 2026</p>
        </div>
      </div>
    </div>
  )
}
