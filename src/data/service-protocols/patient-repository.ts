import { CreatePatient, Patient } from '../../domain'

export interface CreatePatientRepository {
  createPatient: (patient: CreatePatient.Params) => Promise<boolean>
}

export interface ListPatientsRepository {
  listPatients: () => Promise<Patient[]>
}
