import {
  Button,
  ButtonSet,
  Column,
  Grid,
  RadioButton,
  RadioButtonGroup,
  Row,
  Select,
  SelectItem,
  TextArea,
  TextInput,
  Tile,
} from "carbon-components-react";
import { Heading } from "carbon-components-react/lib/components/Heading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import FormBody from "../../components/formbody";
import type { pages } from "../../logic/frontend";
import { clientDB } from "../../logic/utilities";
import type { Mode } from "./incoming";

const rowSpacing = { margin: "1rem -1rem" };

export async function getServerSideProps(ctx: {
  query: { idx: bigint | undefined; mode: Mode | undefined };
}) {
  const mail = await clientDB.mail.findUnique({
    where: { id: BigInt(ctx.query.idx) },
  });
  let conv_mail: { [key: string]: string | Date } = {};
  Object.keys(mail).forEach((key) => {
    if (mail[key] === "bigint") {
      conv_mail[key] = mail[key].toString();
    } else conv_mail[key] = mail[key];
  });

  return {
    props: {
      query: ctx.query,
      mail: { id: mail.id.toString() },
    },
  };
}

function CreateMail({
  query,
  setCurrent,
}: {
  query: { idx: string; mode: string };
  mail_conv: { [key: string]: string | Date };
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  const [idx, setIDX] = useState(1n);
  const [mode, setMode] = useState("CREATE" as Mode);
  useEffect(() => {
    if (query) {
      setIDX(BigInt(query.idx.substring(1)));
      setMode(query.mode as Mode);
    }
  }, [query]);

  setCurrent("mail_create");
  return (
    <FormBody
      currentPage={1}
      pages={[
        {
          name: "Incoming Details",
          description: "Incoming Details",
          link: "/mail/incoming",
        },
        {
          name: "Processing Details",
          description: "Processing Details",
          link: "/mail/incoming",
        },
        {
          name: "Outgoing Details",
          description: "Outgoing Details",
          link: "/mail/incoming",
        },
      ]}
    >
      <Grid>
        <Row>
          <Column>
            <Heading>
              {mode === "CREATE" ? "Add new" : "Update existing"} mail record...
            </Heading>
          </Column>
          <Column>
            <Heading>Step 2 of 3</Heading>
          </Column>
          <Column>
            <Tile
              style={{
                lineHeight: "1.4",
                backgroundColor: "Background",
                color: "GrayText",
                fontFamily: "inherit",
              }}
            >
              <Row>
                <Column style={{ fontWeight: "bold", textAlign: "right" }}>
                  Date & Time:
                </Column>
                <Column>{new Date().toLocaleString().toUpperCase()}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: "bold", textAlign: "right" }}>
                  Last Updated:
                </Column>
                <Column>{new Date().toLocaleString().toUpperCase()}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: "bold", textAlign: "right" }}>
                  Record ID:
                </Column>
                <Column>{query.idx}</Column>
              </Row>
            </Tile>
          </Column>
        </Row>
      </Grid>
      <Grid>
        <Row style={rowSpacing}>
          <Column>
            <RadioButtonGroup
              legendText="Select Priority"
              name="priority"
              defaultSelected={"NORMAL"}
              valueSelected={"NORMAL"}
            >
              <RadioButton labelText="Normal" value="NORMAL" />
              <RadioButton labelText="Important" value="IMPORTANT" />
              <RadioButton labelText="Most Important" value="MOSTIMPORTANT" />
            </RadioButtonGroup>
          </Column>
        </Row>
        <Row style={rowSpacing}>
          <Column>
            <TextArea
              labelText={"Subject"}
              helperText="Enter the mail's subject."
            />
          </Column>
          <Column>
            <Row>
              <Column>
                <TextInput
                  labelText={"Concerned JS"}
                  name="cjs"
                  id="cjs"
                  helperText="Select the concerned JS."
                />
              </Column>
              <Column>
                <TextInput
                  labelText={"Concerned AS"}
                  name="ajs"
                  id="ajs"
                  helperText="Select the concerned AS."
                />
              </Column>
              <Column>
                <TextInput
                  labelText={"Concerned PPS"}
                  name="pps"
                  id="pps"
                  helperText="Select the concerned PPS."
                />
              </Column>
            </Row>
            <Row style={rowSpacing}>
              <Column>
                <Select
                  labelText={"Acknowledging User"}
                  name="acknowledgingUser"
                  id="acknowledgingUserInput"
                  helperText={`Date & Time of Acknowledgement: ${new Date()
                    .toLocaleString()
                    .toUpperCase()}`}
                >
                  {["Malika Pandey", "Shashwat Mishra", "Dishant Mishra"].map(
                    (state) => (
                      <SelectItem value={state} text={state} key={state} />
                    )
                  )}
                </Select>
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          <Column />
          <Column />
          <Column>
            <ButtonSet>
              <Link
                href={`/mail/incoming?idx=${idx}&mode=${mode}`}
                passHref={true}
              >
                <Button kind="secondary">Go Back</Button>
              </Link>
              <Link
                href={`/mail/outgoing?idx=${query.idx}&mode=${mode}`}
                passHref={true}
              >
                <Button kind="primary">Save & Continue</Button>
              </Link>
            </ButtonSet>
          </Column>
        </Row>
      </Grid>
    </FormBody>
  );
}

export default CreateMail;
