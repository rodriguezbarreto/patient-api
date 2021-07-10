import { Repository } from 'typeorm'
import { CreatePatientRepository } from '../../../../data'
import { Patient } from '../../../../domain'
import { PatientModel } from '../models/patient-model'
export class PatientPostgresRespository implements CreatePatientRepository {
  constructor (private readonly handle: Repository<PatientModel>) {}

  public async createPatient (patient: Patient): Promise<PatientModel> {
    const { phone } = patient
    return await this.handle.findOne({ where: { phone } })
  }
}
