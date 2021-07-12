import { Patient, CreatePatient } from '../../domain'
import { ListPatients } from '../../domain/usecases/list-patients'
import { CreatePatientRepository, ListPatientsRepository } from '../service-protocols/patient-repository'

export class CreatePatientService implements CreatePatient {
  constructor (private readonly repository: CreatePatientRepository) {}

  async create (patient: CreatePatient.Params): Promise<boolean> {
    const result = await this.repository.createPatient(patient)
    if (result) return true
  }
}

export class ListPatientsService implements ListPatients {
  constructor (private readonly respository: ListPatientsRepository) {}

  async list (): Promise<Patient[]> {
    return await this.respository.listPatients()
  }
}
