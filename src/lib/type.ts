export type User = {
  id: string
  username: string
  full_name: string
  role_id: string
  updated_at: Date
}

export type MaintenanceHistory = {
  id: string
  equipment_id: string
  maintenance_date: Date
  description: string
  performed_by: string
  condition: string
  location: string
}

export interface EquipmentFormData {
  name: string
  model: string
  place_of_origin: string
  manufacture_year: number
  function: string
  delivery_date: Date
  location: string
}

export interface Equipment extends EquipmentFormData {
  id: string
  status: 'available' | 'under_maintenance'
  maintenance_history?: MaintenanceHistory[]
}
