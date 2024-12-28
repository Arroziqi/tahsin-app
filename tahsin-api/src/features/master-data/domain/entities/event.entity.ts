export class EventEntity {
  id: number;
  name: string;

  constructor(data: Partial<EventEntity>) {
    Object.assign(this, data);
  }
}
