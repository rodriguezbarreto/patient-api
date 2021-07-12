import { ListPatientsRepository, ListPatientsService } from '../../src/data'
import { Patient } from '../../src/domain'

const fakePatientsList: Patient[] = [
  {
    id: 'testDeId',
    name: 'Daniel',
    gender: 'male',
    birthDate: '28/02/1988',
    phone: '48996366726',
    height: 180,
    weight: 98.6
  },
  {
    id: 'testDeId2',
    name: 'Fabio',
    birthDate: '28/02/1988',
    gender: 'male',
    phone: '48996366745',
    height: 180,
    weight: 98.6
  }
]

interface SutTypes {
  sut: ListPatientsService
  fakeListPatientsRespository: ListPatientsRepository
}

const mockListPatientsRepository = (): ListPatientsRepository => {
  class FakeListPatientsRespository implements ListPatientsRepository {
    async listPatients (): Promise<Patient[]> {
      return await new Promise(resolve => resolve(fakePatientsList))
    }
  }

  return new FakeListPatientsRespository()
}

const mockSut = (): SutTypes => {
  const fakeListPatientsRespository = mockListPatientsRepository()
  const sut = new ListPatientsService(fakeListPatientsRespository)
  return { sut, fakeListPatientsRespository }
}

describe('Create Patient Service', () => {
  test('should call ListPatientsRespository correctly', () => {
    const { sut, fakeListPatientsRespository } = mockSut()
    const repositorySpy = jest.spyOn(fakeListPatientsRespository, 'listPatients')
    sut.list()
    expect(repositorySpy).toHaveBeenCalled()
  })

  test('throw an exception if ListPatientsRespository throws', async () => {
    const { sut, fakeListPatientsRespository } = mockSut()
    jest.spyOn(fakeListPatientsRespository, 'listPatients').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.list()
    expect(promise).rejects.toThrow()
  })
})
