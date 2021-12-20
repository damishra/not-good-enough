import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, User } from "../../logic/account";
import { json } from "../../logic/utilities";

const RegisterApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method !== "POST") {
    response.status(405).send("METHOD NOT SUPPORTED");
    return;
  }
  const body = request.body as User;
  const result = json(await createUser(body));
  response.status(200).json(result);
};

export default RegisterApiHandler;
