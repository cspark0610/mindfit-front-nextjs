import { CoachDataType } from './Coach'

export type RangeDataType = {
  from: string
  to: string
}

export type AppointmentDataType = {
  id?: number
  startDate?: string | Date
  endDate?: string | Date
  accomplished?: boolean
}

export type availabilityRangeDataType = {
  monday?: RangeDataType[]
  tuesday?: RangeDataType[]
  wednesday?: RangeDataType[]
  thursday?: RangeDataType[]
  friday?: RangeDataType[]
  saturday?: RangeDataType[]
  sunday?: RangeDataType[]
}

export type AgendaDataType = {
  id?: number
  coach?: CoachDataType
  outOfService?: boolean
  coachAppointments?: AppointmentDataType[]
  coachAgendaDays?: {
    id?: number
    day?: number
    exclude?: boolean
    availableHours?: RangeDataType
  }[]
  availabilityRange?: availabilityRangeDataType
}
