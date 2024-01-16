interface ICreateUserDTO {
  name: string;
  email: string;
  type: "user" | "admin" | "support";
  status: "active" | "inactive";
  password: string;
  passwordConfirm?: string;
  gender: "masculine" | "feminine" | "transgender" | "outher";
}

export { ICreateUserDTO };
