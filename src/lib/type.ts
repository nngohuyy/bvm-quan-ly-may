export type User = {
  id: string
  username: string
  full_name: string
  role_id: string
  updated_at: Date
}

export interface MaintenanceHistoryFormData {
  equipment_id: string
  performed_by: string
  description: string
  condition: string
  location: string
}

export interface MaintenanceHistory extends MaintenanceHistoryFormData {
  id: string
  profiles: User,
  maintenance_date: Date
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
  maintenance_history: MaintenanceHistory[]
}
