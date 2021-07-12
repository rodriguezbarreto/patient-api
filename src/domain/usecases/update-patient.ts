export interface UpdatePatient {
  update: (patientUpdates: UpdatePatient.Params, id: string) => Promise<boolean>
}

export namespace UpdatePatient {
  export type Params = {
    name: string
    gender: string
    phone: string
    birthDate: string
    height: number
    weight: number
  }
}
