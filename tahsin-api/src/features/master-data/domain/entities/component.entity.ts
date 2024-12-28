export class ComponentEntity {
  id: number;
  name: string;

  constructor(data: Partial<ComponentEntity>) {
    Object.assign(this, data);
  }
}
