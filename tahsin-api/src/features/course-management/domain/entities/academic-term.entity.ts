export class AcademicTermEntity {
  id: number;
  name: string;

  constructor(data: Partial<AcademicTermEntity>) {
    Object.assign(this, data);
  }
}
