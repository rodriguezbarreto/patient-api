import { getRepository } from 'typeorm'
import { Patient } from '../../../../domain'
import { PatientModel } from '../models/patient-model'
export class PatientPostgresRespository {
  constructor (private readonly handle = getRepository(PatientModel)) {}
  public async create (patient: Patient): Promise<void> {
    const { phone } = patient
    const payload = await this.handle.findOne({ where: { phone } })
    console.log(payload)
  }
}
