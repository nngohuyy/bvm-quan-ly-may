export type MaintenanceHistory = {
  id: string
  equipment_id: string
  maintenance_date: Date
  description: string
  performed_by: string
  condition: string
  location: string
}

export type Equipment = {
  id: string
  user_id: string
  name: string
  model: string
  place_of_origin: string
  manufacture_year: number
  function: string
  delivery_date: Date
  location: string
  status: "available" | "unavailable" | "in_use"
  maintenance_history: MaintenanceHistory[]
}
