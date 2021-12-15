import type { NextApiRequest, NextApiResponse } from "next";
import { login, User } from "../../logic/account";
import { json } from "../../logic/utilities";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    response.status(405).send("METHOD NOT SUPPORTED");
    return;
  }
  const body = request.body as User;
  const result = json(await login(body));
  response.status(200).json(result);
};
