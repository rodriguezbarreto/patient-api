import { CreatePatientService } from '../../src/data'
import { CreatePatientRepository } from '../../src/data/service-protocols/create-patient-repository'
import { Patient } from '../../src/domain'

const fakeDataPatient: Patient = {
  name: 'Daniel',
  birthDate: '28/02/1988',
  phone: '48996366726',
  height: 180,
  weight: 98.6
}
interface SutTypes {
  sut: CreatePatientService
  fakePatientPostgresRespository: CreatePatientRepository
}

const mockPatientPostgresRepository = (): CreatePatientRepository => {
  class FakePatientPostgresRespository implements CreatePatientRepository {
    public async createPatient (): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new FakePatientPostgresRespository()
}

const mockSut = (): SutTypes => {
  const fakePatientPostgresRespository = mockPatientPostgresRepository()
  const sut = new CreatePatientService(fakePatientPostgresRespository)
  return { sut, fakePatientPostgresRespository }
}

describe('Create Patient Service', () => {
  test('should call CreatePatientRespository with correct values', () => {
    const { sut, fakePatientPostgresRespository } = mockSut()
    const repositorySpy = jest.spyOn(fakePatientPostgresRespository, 'createPatient')
    sut.create(fakeDataPatient)
    expect(repositorySpy).toHaveBeenCalledWith(fakeDataPatient)
  })

  test('throw an exception if CreatePatientRespository throws', async () => {
    const { sut, fakePatientPostgresRespository } = mockSut()
    jest.spyOn(fakePatientPostgresRespository, 'createPatient').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(fakeDataPatient)
    expect(promise).rejects.toThrow()
  })
})
