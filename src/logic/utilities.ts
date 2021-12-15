import { PrismaClient } from "@prisma/client";
import { UniqueID } from "nodejs-snowflake";

const uniqueID = new UniqueID({
  returnNumber: true,
});

const clientDB = new PrismaClient();

export { uniqueID, clientDB };
