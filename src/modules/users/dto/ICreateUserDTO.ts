interface ICreateUserDTO {
  name: string;
  email: string;
  type: "user" | "admin" | "support";
  status: "active" | "inactive";
  password: string;
  passwordConfirm?: string;
  gender: "masculine" | "feminine" | "transgender" | "outher";
  phone?: string;
  cellPhone: string;
  avatar?: string;
  postalCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
}

export { ICreateUserDTO };
