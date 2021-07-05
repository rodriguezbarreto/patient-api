import { getManager } from 'typeorm'
import { Patient } from '../../../../domain/entities/patient'
import { PatientModel } from '../models/patient-model'
export class PatientPostgresRespository {
  public async create (patient: Patient): Promise<PatientModel> {
    const newPatient = new PatientModel(patient)
    return await getManager().save(newPatient)
  }
}
