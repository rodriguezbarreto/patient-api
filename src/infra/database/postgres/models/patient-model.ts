import { Patient } from '../../../../domain/entities/patient'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('patient')
export class PatientModel implements Patient {
  constructor (patient: Patient) {
    this.name = patient.name
    this.birthDate = patient.birthDate
    this.phone = patient.phone
    this.height = patient.height
    this.weight = patient.weight
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('varchar')
  birthDate: string

  @Column('varchar')
  phone: string

  @Column('int')
  height: number

  @Column('float')
  weight: number
}
