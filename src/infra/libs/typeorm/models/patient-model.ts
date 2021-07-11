import { Patient } from '../../../../domain/entities/patient'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('patients')
export class PatientModel implements Patient {
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
