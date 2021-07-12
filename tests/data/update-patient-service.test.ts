import { UpdatePatientService, UpdatePatientRepository } from '../../src/data'

const fakeDataPatient = {
  name: 'Daniel',
  birthDate: '28/02/1988',
  gender: 'male',
  phone: '48996366726',
  height: 180,
  weight: 98.6
}
const fakeId = '354321dfg-25483dfg-asd8aj'

interface SutTypes {
  sut: UpdatePatientService
  fakeUpdatePatientRespository: UpdatePatientRepository
}

const mockUpdatePatientRespository = (): UpdatePatientRepository => {
  class FakeUpdatePatientRespository implements UpdatePatientRepository {
    public async updatePatient (): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new FakeUpdatePatientRespository()
}

const mockSut = (): SutTypes => {
  const fakeUpdatePatientRespository = mockUpdatePatientRespository()
  const sut = new UpdatePatientService(fakeUpdatePatientRespository)
  return { sut, fakeUpdatePatientRespository }
}

describe('Create Patient Service', () => {
  test('should call CreatePatientRespository with correct values', () => {
    const { sut, fakeUpdatePatientRespository } = mockSut()
    const repositorySpy = jest.spyOn(fakeUpdatePatientRespository, 'updatePatient')
    sut.update(fakeDataPatient, fakeId)
    expect(repositorySpy).toHaveBeenCalledWith(fakeDataPatient, fakeId)
  })

  test('throw an exception if CreatePatientRespository throws', async () => {
    const { sut, fakeUpdatePatientRespository } = mockSut()
    jest.spyOn(fakeUpdatePatientRespository, 'updatePatient').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(fakeDataPatient, fakeId)
    expect(promise).rejects.toThrow()
  })
})
