import { DeletePatientRepository, DeletePatientService } from '../../src/data'

const fakeId = '354321dfg-25483dfg-asd8aj'

interface SutTypes {
  sut: DeletePatientService
  fakeDeletePatientRespository: DeletePatientRepository
}

const mockDeletePatientRespository = (): DeletePatientRepository => {
  class FakeDeletePatientRespository implements DeletePatientRepository {
    public async deletePatient (): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new FakeDeletePatientRespository()
}

const mockSut = (): SutTypes => {
  const fakeDeletePatientRespository = mockDeletePatientRespository()
  const sut = new DeletePatientService(fakeDeletePatientRespository)
  return { sut, fakeDeletePatientRespository }
}

describe('Delete Patient Service', () => {
  test('should call DeletePatientRespository with correct values', () => {
    const { sut, fakeDeletePatientRespository } = mockSut()
    const repositorySpy = jest.spyOn(fakeDeletePatientRespository, 'deletePatient')
    sut.delete(fakeId)
    expect(repositorySpy).toHaveBeenCalledWith(fakeId)
  })

  test('throw an exception if DeletePatientRespository throws', async () => {
    const { sut, fakeDeletePatientRespository } = mockSut()
    jest.spyOn(fakeDeletePatientRespository, 'deletePatient').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(fakeId)
    expect(promise).rejects.toThrow()
  })
})
