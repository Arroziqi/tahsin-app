export class LevelModel {
  id: number;
  name: string;
  is_active: boolean;

  // classes?: ClassModel[];

  constructor(data: Partial<LevelModel>) {
    Object.assign(this, data);
  }
}
