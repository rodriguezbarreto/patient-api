export interface CreatePatient {
  create: (patient: CreatePatient.Params) => Promise<boolean>
}

export namespace CreatePatient {
  export type Params = {
    name: string
    gender: string
    phone: string
    birthDate: string
    height: number
    weight: number
  }
}
