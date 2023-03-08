export interface ISubmitEmailAndPassword {
  email: string;
  password: string;
}

export interface IError {
  response: {
    status: number;
    data: {
      description: string;
    };
  };
}
