import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type DrugCandidate = {
  id: string
  name: string
  molecule_id: string
  stage: 'discovery' | 'hit_to_lead' | 'lead_optimization' | 'preclinical' | 'phase_1' | 'phase_2' | 'phase_3'
  target: string
  therapeutic_area: string
  probability_of_success: number
  estimated_revenue: number
  start_date: string
  expected_completion: string
  team_lead: string
  created_at: string
}

export type Experiment = {
  id: string
  drug_id: string
  name: string
  type: 'in_vitro' | 'in_vivo' | 'computational' | 'clinical'
  status: 'planned' | 'running' | 'completed' | 'failed'
  start_date: string
  end_date: string | null
  results: Record<string, any>
  created_at: string
}

export type AssayData = {
  id: string
  experiment_id: string
  compound: string
  ic50: number
  ec50: number
  selectivity: number
  potency_class: 'high' | 'medium' | 'low'
  created_at: string
}

export type GanttTask = {
  id: string
  drug_id: string
  name: string
  start: string
  end: string
  progress: number
  dependencies: string[]
  color: string
}
