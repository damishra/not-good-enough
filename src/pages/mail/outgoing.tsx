import {
  Button,
  Column,
  DatePicker,
  DatePickerInput,
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
import FormBody from "../../components/formbody";

const rowSpacing = { margin: "1rem -1rem" };

export default function CreateMail() {
  return (
    <FormBody>
      <Grid>
        <Row>
          <Column>
            <Heading>Add new mail record...</Heading>
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
                <Column>{"XX-0000-0000-0000000"}</Column>
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
                <SelectItem value={dept} text={dept} />
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
                    <SelectItem value={dept} text={dept} />
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
                      <SelectItem value={state} text={state} />
                    )
                  )}
                </Select>
              </Column>
            </Row>
          </Column>
        </Row>
      </Grid>
    </FormBody>
  );
}
