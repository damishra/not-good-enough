import { clientDB, uniqueID } from "./utilities";
import Validator from "validatorjs";
import { hash, verify, argon2id } from "argon2";
import type { Authority, Region } from "@prisma/client";

export type User = {
  username: string;
  password: string;
  email?: string;
  authority?: Authority;
  access?: number;
  region?: Region;
  fullname?: string;
};

export async function createUser(user: User) {
  const rule = {
    username: "required|alpha_num|max:20|min:4",
    password: "required|min:8",
    email: "required|email",
    authority: "required|alpha",
    access: "required",
    region: "required|alpha",
    fullname: "required",
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
          authority: user.authority,
          fullname: user.fullname,
          access: user.access,
          region: user.region,
        },
      })),
      password: undefined,
    };
  } else {
    const errors: string[] = [];
    if (validate.errors.first("username"))
      validate.errors.get("username").map((error) => errors.push(error));
    if (validate.errors.first("password"))
      validate.errors.get("password").map((error) => errors.push(error));
    if (validate.errors.first("email"))
      validate.errors.get("email").map((error) => errors.push(error));
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
