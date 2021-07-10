import { getRepository } from 'typeorm'
import { Patient } from '../../../../domain'
import { PatientModel } from '../models/patient-model'
export class PatientPostgresRespository {
  constructor (private readonly handle = getRepository(PatientModel)) {}
  public async create (patient: Patient): Promise<boolean> {
    const { phone } = patient
    const result = await this.handle.findOne({ where: { phone } })
    if (result) return false

    const newPatient = await this.handle.save(patient)
    return !!newPatient && !!newPatient.id
  }
}
