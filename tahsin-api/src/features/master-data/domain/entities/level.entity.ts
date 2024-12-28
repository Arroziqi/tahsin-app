export class LevelEntity {
  id: number;
  name: string;
  is_active: boolean;

  // classes?: ClassEntity[];

  constructor(data: Partial<LevelEntity>) {
    Object.assign(this, data);
  }
}
