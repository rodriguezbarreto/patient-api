import { getRepository } from 'typeorm'
import { CreatePatientRepository, ListPatientsRepository, UpdatePatientRepository } from '../../../data'
import { CreatePatient, Patient } from '../../../domain'
import { UpdatePatient } from '../../../domain/usecases/update-patient'
import { PatientModel } from '../../libs/typeorm/models/patient-model'

export class CreatePatientPostgresRespository implements CreatePatientRepository {
  async createPatient (patient: CreatePatient.Params): Promise<boolean> {
    const repository = getRepository(PatientModel)
    const { phone } = patient
    const result = await repository.findOne({ where: { phone } })
    if (result) return false
    const newPatient = await repository.save(patient)
    return !!newPatient && !!newPatient.id
  }
}

export class ListPatientPostgresRepository implements ListPatientsRepository {
  async listPatients (): Promise<Patient[]> {
    const repository = getRepository(PatientModel)
    return await repository.find()
  }
}
export class UpdatePatientPostgresRespositrory implements UpdatePatientRepository {
  async updatePatient (patientUpdates: UpdatePatient.Params, id: string): Promise<boolean> {
    const repository = getRepository(PatientModel)
    let patient = await repository.findOne(id)
    if (!patient) return false
    patient = { ...patient, ...patientUpdates }
    const result = await repository.save(patient)
    return !!result?.id
  }
}
