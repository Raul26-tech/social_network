import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é um campo obrigatório",
      invalid_type_error:
        "O e-mail informado é inválido, verifique o erro e tente novamente",
    })
    .email({ message: "O e-mail informado é inválido" }),
  password: z
    .string({
      required_error: "Senha é um campo obrigatório",
      invalid_type_error: "A senha precisa conter no mínino 6 digitos",
    })
    .min(6, { message: "A senha precisa conter no mínimo 6 digitos" }),
});

export { LoginSchema };
