import { Patient } from '../entities/patient'

export interface CreatePatient {
  create: (patient: Patient) => Promise<boolean>
}
