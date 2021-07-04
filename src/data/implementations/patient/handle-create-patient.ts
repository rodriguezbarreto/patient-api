import { Patient } from '../../../domain/entities/patient'
import { CreatePatient } from '../../../domain/usecases/create-patient'

export class HandleCreatePatient implements CreatePatient {
  public async create (patient: Patient): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}
