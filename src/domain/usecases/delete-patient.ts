export interface DeletePatient {
  delete: (id: string) => Promise<boolean>
}
