interface IModel {
  email: string;
  id: number;
  isActivated: boolean;
}

export class UserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor(model: IModel) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
