'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { mockDrugs, mockExperiments, mockAssays, mockGanttTasks } from '@/lib/mock-data'
import KanbanBoard from '@/components/KanbanBoard'
import ExperimentTracker from '@/components/ExperimentTracker'
import AssayDashboard from '@/components/AssayDashboard'
import ImageAnalysis from '@/components/ImageAnalysis'
import HitToLeadOptimizer from '@/components/HitToLeadOptimizer'
import GanttTimeline from '@/components/GanttTimeline'
import { Pill, Kanban, FlaskConical, BarChart3, Image, Zap, Calendar } from 'lucide-react'

const tabs = [
  { id: 'kanban' as const, label: 'Pipeline', icon: Kanban },
  { id: 'experiments' as const, label: 'Experiments', icon: FlaskConical },
  { id: 'assays' as const, label: 'Assay Data', icon: BarChart3 },
  { id: 'analysis' as const, label: 'Image Analysis', icon: Image },
  { id: 'optimizer' as const, label: 'Hit-to-Lead', icon: Zap },
  { id: 'timeline' as const, label: 'Timeline', icon: Calendar },
]

export default function Home() {
  const { activeTab, setActiveTab, setDrugs, setExperiments, setAssays, setGanttTasks } = useStore()

  useEffect(() => {
    setDrugs(mockDrugs)
    setExperiments(mockExperiments)
    setAssays(mockAssays)
    setGanttTasks(mockGanttTasks)
  }, [setDrugs, setExperiments, setAssays, setGanttTasks])

  const renderTab = () => {
    switch (activeTab) {
      case 'kanban': return <KanbanBoard />
      case 'experiments': return <ExperimentTracker />
      case 'assays': return <AssayDashboard />
      case 'analysis': return <ImageAnalysis />
      case 'optimizer': return <HitToLeadOptimizer />
      case 'timeline': return <GanttTimeline />
    }
  }

  return (
    <div className="min-h-screen">
      <header className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">PharmaPipeline</h1>
            <p className="text-[10px] text-white/40">Drug Pipeline Management</p>
          </div>
        </div>
        <nav className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === id ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-white/50 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline">{label}</span>
            </button>
          ))}
        </nav>
      </header>
      <main className="p-6">{renderTab()}</main>
    </div>
  )
}
