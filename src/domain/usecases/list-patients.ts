import { Patient } from '../entities/patient'

export interface ListPatients {
  list: () => Promise<Patient[]>
}
