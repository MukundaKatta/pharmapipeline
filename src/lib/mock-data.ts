import type { DrugCandidate, Experiment, AssayData, GanttTask } from './supabase'

export const mockDrugs: DrugCandidate[] = [
  { id: '1', name: 'PP-101', molecule_id: 'm1', stage: 'phase_2', target: 'EGFR', therapeutic_area: 'Oncology', probability_of_success: 0.35, estimated_revenue: 2500, start_date: '2024-01-15', expected_completion: '2027-06-30', team_lead: 'Dr. Sarah Chen', created_at: '2024-01-15T10:00:00Z' },
  { id: '2', name: 'PP-202', molecule_id: 'm2', stage: 'preclinical', target: 'PDE5A', therapeutic_area: 'Cardiovascular', probability_of_success: 0.55, estimated_revenue: 1800, start_date: '2024-06-01', expected_completion: '2028-12-31', team_lead: 'Dr. James Park', created_at: '2024-06-01T10:00:00Z' },
  { id: '3', name: 'PP-303', molecule_id: 'm3', stage: 'discovery', target: 'ACE2', therapeutic_area: 'Infectious Disease', probability_of_success: 0.75, estimated_revenue: 3200, start_date: '2025-03-01', expected_completion: '2030-06-30', team_lead: 'Dr. Maria Lopez', created_at: '2025-03-01T10:00:00Z' },
  { id: '4', name: 'PP-404', molecule_id: 'm4', stage: 'lead_optimization', target: 'TNF-alpha', therapeutic_area: 'Immunology', probability_of_success: 0.60, estimated_revenue: 4100, start_date: '2025-01-01', expected_completion: '2029-12-31', team_lead: 'Dr. Alex Kim', created_at: '2025-01-01T10:00:00Z' },
  { id: '5', name: 'PP-505', molecule_id: 'm5', stage: 'phase_1', target: 'BRAF', therapeutic_area: 'Oncology', probability_of_success: 0.45, estimated_revenue: 1500, start_date: '2024-09-01', expected_completion: '2028-06-30', team_lead: 'Dr. Emily White', created_at: '2024-09-01T10:00:00Z' },
  { id: '6', name: 'PP-606', molecule_id: 'm6', stage: 'hit_to_lead', target: 'JAK2', therapeutic_area: 'Oncology', probability_of_success: 0.65, estimated_revenue: 2800, start_date: '2025-06-01', expected_completion: '2030-12-31', team_lead: 'Dr. Robert Davis', created_at: '2025-06-01T10:00:00Z' },
  { id: '7', name: 'PP-707', molecule_id: 'm7', stage: 'phase_3', target: 'HER2', therapeutic_area: 'Oncology', probability_of_success: 0.25, estimated_revenue: 5200, start_date: '2023-01-01', expected_completion: '2026-12-31', team_lead: 'Dr. Lisa Brown', created_at: '2023-01-01T10:00:00Z' },
]

export const mockExperiments: Experiment[] = [
  { id: '1', drug_id: '1', name: 'Cell Viability Assay', type: 'in_vitro', status: 'completed', start_date: '2025-11-01', end_date: '2025-12-15', results: { efficacy: 0.85, response_rate: 72 }, created_at: '2025-11-01T10:00:00Z' },
  { id: '2', drug_id: '1', name: 'Mouse Xenograft Study', type: 'in_vivo', status: 'running', start_date: '2026-01-10', end_date: null, results: {}, created_at: '2026-01-10T10:00:00Z' },
  { id: '3', drug_id: '2', name: 'Target Binding Assay', type: 'in_vitro', status: 'completed', start_date: '2025-10-01', end_date: '2025-11-15', results: { kd: 5.2, ki: 3.8 }, created_at: '2025-10-01T10:00:00Z' },
  { id: '4', drug_id: '5', name: 'Phase 1 Dose Escalation', type: 'clinical', status: 'running', start_date: '2025-12-01', end_date: null, results: { enrolled: 24, dose_levels: 4 }, created_at: '2025-12-01T10:00:00Z' },
  { id: '5', drug_id: '3', name: 'Virtual Screening', type: 'computational', status: 'completed', start_date: '2025-09-01', end_date: '2025-09-15', results: { hits: 150, validated: 28 }, created_at: '2025-09-01T10:00:00Z' },
  { id: '6', drug_id: '7', name: 'Phase 3 Efficacy Trial', type: 'clinical', status: 'running', start_date: '2025-06-01', end_date: null, results: { enrolled: 420, events: 85 }, created_at: '2025-06-01T10:00:00Z' },
]

export const mockAssays: AssayData[] = [
  { id: '1', experiment_id: '1', compound: 'PP-101', ic50: 0.045, ec50: 0.12, selectivity: 85, potency_class: 'high', created_at: '2025-12-15T10:00:00Z' },
  { id: '2', experiment_id: '1', compound: 'PP-101-A2', ic50: 0.089, ec50: 0.25, selectivity: 62, potency_class: 'medium', created_at: '2025-12-15T10:00:00Z' },
  { id: '3', experiment_id: '3', compound: 'PP-202', ic50: 0.15, ec50: 0.45, selectivity: 45, potency_class: 'medium', created_at: '2025-11-15T10:00:00Z' },
  { id: '4', experiment_id: '5', compound: 'PP-303-Hit1', ic50: 0.52, ec50: 1.2, selectivity: 30, potency_class: 'low', created_at: '2025-09-15T10:00:00Z' },
  { id: '5', experiment_id: '5', compound: 'PP-303-Hit2', ic50: 0.033, ec50: 0.08, selectivity: 92, potency_class: 'high', created_at: '2025-09-15T10:00:00Z' },
]

export const mockGanttTasks: GanttTask[] = [
  { id: 'g1', drug_id: '1', name: 'PP-101 Phase 2 Trial', start: '2025-06-01', end: '2027-06-30', progress: 40, dependencies: [], color: '#3b82f6' },
  { id: 'g2', drug_id: '2', name: 'PP-202 IND-Enabling', start: '2025-09-01', end: '2026-12-31', progress: 55, dependencies: [], color: '#10b981' },
  { id: 'g3', drug_id: '3', name: 'PP-303 Hit Identification', start: '2025-03-01', end: '2026-06-30', progress: 70, dependencies: [], color: '#f59e0b' },
  { id: 'g4', drug_id: '4', name: 'PP-404 Lead Optimization', start: '2025-06-01', end: '2026-09-30', progress: 45, dependencies: [], color: '#ef4444' },
  { id: 'g5', drug_id: '5', name: 'PP-505 Phase 1', start: '2025-12-01', end: '2027-03-31', progress: 15, dependencies: [], color: '#8b5cf6' },
  { id: 'g6', drug_id: '7', name: 'PP-707 Phase 3', start: '2025-06-01', end: '2026-12-31', progress: 60, dependencies: [], color: '#ec4899' },
]
