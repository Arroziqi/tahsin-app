export class EventModel {
  id: number;
  name: string;

  constructor(data: Partial<EventModel>) {
    Object.assign(this, data);
  }
}
