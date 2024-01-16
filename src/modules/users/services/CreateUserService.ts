import bcrypt from "bcryptjs";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";

class CreateUSerService {
  async excute({
    name,
    email,
    password,
    passwordConfirm,
    gender,
    status,
    type,
  }: ICreateUserDTO) {
    const userRepository = new UserRepository();
    const userEmail = await userRepository.findByEmail(email);

    // Validando se já existe usuário cadastrado com esse e-mail
    if (userEmail) {
      throw new AppError("E-mail já está em uso");
    }

    // Validar a senha de confirmação
    if (password !== passwordConfirm) {
      throw new AppError("Senha e confirmação de senha não coincidem");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      email,
      password: hashPassword,
      gender,
      status: status || "active",
      type: type || "user",
    });

    return user;
  }
}

export { CreateUSerService };
