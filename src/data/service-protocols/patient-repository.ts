import { CreatePatient, Patient } from '../../domain'
import { UpdatePatient } from '../../domain/usecases/update-patient'

export interface CreatePatientRepository {
  createPatient: (patient: CreatePatient.Params) => Promise<boolean>
}

export interface ListPatientsRepository {
  listPatients: () => Promise<Patient[]>
}

export interface UpdatePatientRepository {
  updatePatient: (patietUpdates: UpdatePatient.Params, id: string) => Promise<boolean>
}
