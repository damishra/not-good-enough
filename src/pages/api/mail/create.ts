import type { NextApiRequest, NextApiResponse } from "next";

const MailCreateHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method !== "POST") {
    response.status(405).send("METHOD NOT SUPPORTED");
    return;
  }
};

export default MailCreateHandler;
