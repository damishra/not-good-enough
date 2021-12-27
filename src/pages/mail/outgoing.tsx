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
  Tile,
} from "carbon-components-react";
import { Heading } from "carbon-components-react/lib/components/Heading";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormBody from "../../components/formbody";
import type { pages } from "../../logic/frontend";
import type { Mode } from "./incoming";

const rowSpacing = { margin: "1rem -1rem" };

function CreateMail({
  query,
  setCurrent,
}: {
  query: { idx: string; mode: string };
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  const [idx, setIDX] = useState(1n);
  const [currentTime, setTime] = useState(
    new Date().toLocaleString().toUpperCase()
  );
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
      currentPage={2}
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
            <Heading>Step 3 of 3</Heading>
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
            <Select
              labelText={"Forwarding Address"}
              name="forwardingAddress"
              id="forwardingAddressInput"
              helperText="Select the forwarding address."
            >
              {[
                "Department of Animal Husbandy & Dairying",
                "Department of Fisheries",
              ].map((dept) => (
                <SelectItem value={dept} text={dept} key={dept} />
              ))}
            </Select>
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
                <Select
                  labelText={"Forwarding Address"}
                  name="forwardingAddress"
                  id="forwardingAddressInput"
                  helperText="Select the forwarding address."
                >
                  {[
                    "Department of Animal Husbandy & Dairying",
                    "Department of Fisheries",
                  ].map((dept) => (
                    <SelectItem value={dept} text={dept} key={dept} />
                  ))}
                </Select>
              </Column>
              <Column>
                <RadioButtonGroup
                  name={"completed"}
                  legendText={"Completed?"}
                  valueSelected={"NO"}
                  defaultSelected={"NO"}
                >
                  <RadioButton value={"YES"} labelText={"Yes"} />
                  <RadioButton value={"NO"} labelText={"No"} />
                </RadioButtonGroup>
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
                href={`/mail/processing?idx=${query.idx}&mode=${query.mode}`}
                passHref={true}
              >
                <Button kind="secondary">Go Back</Button>
              </Link>
              <Link href={"/"} passHref={true}>
                <Button kind="primary">Save & Complete</Button>
              </Link>
            </ButtonSet>
          </Column>
        </Row>
      </Grid>
    </FormBody>
  );
}

CreateMail.getInitialProps = ({ query }) => {
  return { query };
};

export default CreateMail;
