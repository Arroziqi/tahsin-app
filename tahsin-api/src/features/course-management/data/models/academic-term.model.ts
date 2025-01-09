export class AcademicTermModel {
  id: number;
  name: string;

  constructor(data: Partial<AcademicTermModel>) {
    Object.assign(this, data);
  }
}
