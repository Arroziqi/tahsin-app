export class ComponentModel {
  id: number;
  name: string;

  constructor(data: Partial<ComponentModel>) {
    Object.assign(this, data);
  }
}
