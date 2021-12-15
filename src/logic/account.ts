import { clientDB, uniqueID } from "./utilities";
import Validator from "validatorjs";
import { hash, verify, argon2id } from "argon2";

export type User = {
  username: string;
  password: string;
  email?: string;
};

export async function createUser(user: User) {
  const rule = {
    username: "required|alpha_num|max:20|min:4",
    password: "required",
    email: "required|email",
  };
  const validate = new Validator(user, rule);

  if (validate.passes()) {
    return {
      ...(await clientDB.user.create({
        data: {
          id: (await uniqueID.asyncGetUniqueID()) as bigint,
          username: user.username,
          password: await hash(user.password, { type: argon2id }),
          email: user.email,
        },
      })),
      password: undefined,
    };
  } else {
    const errors: string[] = [];
    if (validate.errors.first("username"))
      validate.errors.get("username").map(error => errors.push(error));
    if (validate.errors.first("password"))
      validate.errors.get("password").map(error => errors.push(error));
    if (validate.errors.first("email"))
      validate.errors.get("email").map(error => errors.push(error));
    return errors;
  }
}

export async function login(user: User) {
  const account = await clientDB.user.findUnique({
    where: { username: user.username },
  });
  if (await verify(account.password, user.password, { type: argon2id })) {
    return {
      ...account,
      password: undefined,
    };
  } else return { error: "validation failed" };
}
