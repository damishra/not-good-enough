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
                <Column>{"XX-0000-0000-0000000"}</Column>
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
