import { Patient } from '../../domain/entities/patient'
import { CreatePatient } from '../../domain/usecases/create-patient'
import { CreatePatientRepository } from '../service-protocols/create-patient-repository'

export class CreatePatientService implements CreatePatient {
  constructor (private readonly repository: CreatePatientRepository) {}

  async create (patient: Patient): Promise<boolean> {
    const result = await this.repository.createPatient(patient)
    if (result) return true
  }
}
