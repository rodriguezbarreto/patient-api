import { Patient, CreatePatient } from '../../domain'
import { DeletePatient } from '../../domain/usecases/delete-patient'
import { ListPatients } from '../../domain/usecases/list-patients'
import { UpdatePatient } from '../../domain/usecases/update-patient'
import { CreatePatientRepository, DeletePatientRepository, ListPatientsRepository, UpdatePatientRepository } from '../service-protocols/patient-repository'

export class CreatePatientService implements CreatePatient {
  constructor (private readonly repository: CreatePatientRepository) {}

  async create (patient: CreatePatient.Params): Promise<boolean> {
    const result = await this.repository.createPatient(patient)
    return !!result
  }
}
export class ListPatientsService implements ListPatients {
  constructor (private readonly respository: ListPatientsRepository) {}

  async list (): Promise<Patient[]> {
    return await this.respository.listPatients()
  }
}
export class UpdatePatientService implements UpdatePatient {
  constructor (private readonly repository: UpdatePatientRepository) {}

  async update (patientUpdates: UpdatePatient.Params, id: string): Promise<boolean> {
    return await this.repository.updatePatient(patientUpdates, id)
  }
}

export class DeletePatientService implements DeletePatient {
  constructor (private readonly repository: DeletePatientRepository) {}

  async delete (id: string): Promise<boolean> {
    return await this.repository.deletePatient(id)
  }
}
