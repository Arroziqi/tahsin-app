export class CourseFeeModel {
  id: number;
  fee: number;
  class_id: number;

  constructor(data: Partial<CourseFeeModel>) {
    Object.assign(this, data);
  }
}
