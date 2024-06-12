import bcrypt from "bcryptjs";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";
import { inject, injectable } from "inversify";

@injectable()
class CreateUSerService {
  constructor(
    @inject("UserRepository")
    private _userRepository: UserRepository
  ) {}

  async excute({
    name,
    email,
    password,
    passwordConfirm,
    gender,
    status,
    type,
    avatar,
    cellPhone,
    phone,
    postalCode,
    street,
    number,
    complement,
    district,
    city,
    state,
  }: ICreateUserDTO) {
    const userEmail = await this._userRepository.findByEmail(email);

    // Validando se já existe usuário cadastrado com esse e-mail
    if (userEmail) {
      throw new AppError("E-mail já está em uso");
    }

    // Validar a senha de confirmação
    if (password !== passwordConfirm) {
      throw new AppError("Senha e confirmação de senha não coincidem");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Verificando se o usuário colocou foto de perfil
    if (avatar) {
    }

    const user = await this._userRepository.create({
      name,
      email,
      password: hashPassword,
      gender,
      status: status || "active",
      type: type || "user",
      avatar,
      phone,
      cellPhone,
      postalCode,
      street,
      number,
      complement,
      district,
      city,
      state,
    });

    return user;
  }
}

export { CreateUSerService };
