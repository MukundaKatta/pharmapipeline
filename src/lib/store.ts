import { create } from 'zustand'
import type { DrugCandidate, Experiment, AssayData, GanttTask } from './supabase'

type Tab = 'kanban' | 'experiments' | 'assays' | 'analysis' | 'optimizer' | 'timeline'

interface PharmaState {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  drugs: DrugCandidate[]
  setDrugs: (d: DrugCandidate[]) => void
  experiments: Experiment[]
  setExperiments: (e: Experiment[]) => void
  assays: AssayData[]
  setAssays: (a: AssayData[]) => void
  ganttTasks: GanttTask[]
  setGanttTasks: (g: GanttTask[]) => void
}

export const useStore = create<PharmaState>((set) => ({
  activeTab: 'kanban',
  setActiveTab: (activeTab) => set({ activeTab }),
  drugs: [],
  setDrugs: (drugs) => set({ drugs }),
  experiments: [],
  setExperiments: (experiments) => set({ experiments }),
  assays: [],
  setAssays: (assays) => set({ assays }),
  ganttTasks: [],
  setGanttTasks: (ganttTasks) => set({ ganttTasks }),
}))
