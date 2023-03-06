export class ApiErrors extends Error {
  status: number;
  errors: Array<string>;
  constructor(status: number, message: string, error = []) {
    super(message);
    this.status = status;
    this.errors = error;
  }

  static UnautorizationError() {
    return new ApiErrors(401, "Unaotorization user!");
  }

  static BadRequest(message: string, errors: any = []) {
    return new ApiErrors(400, message, errors);
  }
}
