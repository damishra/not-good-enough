import type { PostType, Region } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { clientDB, uniqueID } from "../../../logic/utilities";

type RequestType = {
  id: bigint;
  format: PostType;
  language: string;
  letterNumber: string;
  dateOnMail: string;
  category: bigint;
  dateRecieved: string;
  region: Region;
  designation: bigint;
  senderdet: string | bigint;
  organization: bigint;
  state: bigint;
  address: string;
  constituency: bigint;
};

const MailCreateHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method !== "POST") {
    response.status(405).send("METHOD NOT SUPPORTED");
    return;
  }
  try {
    let body = request.body as RequestType;
    body = {
      ...body,
      id: BigInt(body.id),
      category: BigInt(body.category),
      designation: BigInt(body.designation),
      organization: BigInt(body.organization),
      state: BigInt(body.state),
      constituency: BigInt(body.constituency),
    };
    let senderID: bigint;
    let holder: {
      id: bigint;
      designation_id: bigint;
      organisation_id: bigint;
      address: string;
    };
    try {
      senderID = BigInt(body.senderdet);
      const sender = await clientDB.sender.findUnique({
        where: { id: senderID },
        select: {
          id: true,
          designation_id: true,
          organisation_id: true,
          address: true,
        },
      });
      holder = sender;
    } catch (error) {
      console.log(error);
      const sender = await clientDB.sender.create({
        data: {
          id: BigInt(await uniqueID.asyncGetUniqueID()),
          fullname: body.senderdet as string,
          address: body.address,
          organisation_id: body.organization,
          designation_id: body.designation,
        },
        select: {
          id: true,
          designation_id: true,
          organisation_id: true,
          address: true,
        },
      });
      holder = sender;
    }
    const mail = await clientDB.mail.create({
      data: {
        id: BigInt(body.id),
        format: body.format,
        sender_id: holder.id,
        recieved_at: body.region,
        date_on_letter: body.dateOnMail,
        date_recieved: body.dateRecieved,
        created_at: new Date(),
        updated_at: new Date(),
        category_id: body.category,
      },
      select: {
        id: true,
        date_on_letter: true,
        date_recieved: true,
        created_at: true,
        updated_at: true,
        sender: true,
        recieved_at: true,
        format: true,
        category: true,
      },
    });
    response.setHeader("content-type", "application/json");
    response
      .status(201)
      .send(
        JSON.stringify(mail, (_, val) =>
          typeof val === "bigint" ? val.toString() : val
        )
      );
  } catch (error) {
    console.error(error);
    response.status(400).send("form is incomplete");
  }
};

export default MailCreateHandler;
