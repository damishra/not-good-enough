import { PrismaClient } from "@prisma/client";
import { UniqueID } from "nodejs-snowflake";
import { createSigner, createDecoder, createVerifier } from "fast-jwt";

const uniqueID = new UniqueID({
  returnNumber: true,
});

const clientDB = new PrismaClient();

const json = (data) =>
  JSON.stringify(data, (_, value) =>
    typeof value === "bigint" ? Number(value) : value
  );

const APPSECRET =
  process.env.APPSECRET ?? "highly insecure to not set this variable";

const signer = createSigner({ key: async () => APPSECRET });
const decoder = createDecoder();
const verifier = createVerifier({ key: async () => APPSECRET });

const sign = async (data: { [key: string]: any }) => await signer(data);
const decode = (token: string) => decoder(token);
const verify = async (token: string) => await verifier(token);

export { uniqueID, clientDB, json, sign, verify, decode };
