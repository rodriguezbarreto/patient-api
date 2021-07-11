import { getRepository } from 'typeorm'
import { CreatePatientRepository } from '../../../../data'
import { Patient } from '../../../../domain'
import { PatientModel } from '../models/patient-model'
export class PatientPostgresRespository implements CreatePatientRepository {
  public async createPatient (patient: Patient): Promise<boolean> {
    const repository = getRepository(PatientModel)
    const { phone } = patient
    const result = await repository.findOne({ where: { phone } })
    if (result) return false
    const newPatient = await repository.save(patient)
    return !!newPatient && !!newPatient.id
  }
}
