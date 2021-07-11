import { Patient } from '../../domain'

export interface CreatePatientRepository {
  createPatient: (patient: Patient) => Promise<boolean>
}

export interface ListPatientsRepository {
  listPatients: () => Promise<Patient[]>
}
