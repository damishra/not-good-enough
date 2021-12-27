import type { NextApiRequest, NextApiResponse } from "next";
import { uniqueID } from "../../../logic/utilities";

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.status(405).send(405);
    return;
  }
  response.status(200).json({
    generatedID: (await uniqueID.asyncGetUniqueID()).toString(),
  });
}
