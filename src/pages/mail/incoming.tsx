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
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import FormBody from "../../components/formbody";
import type { pages } from "../../logic/frontend";

const rowSpacing = { margin: "1rem -1rem" };

export default function CreateMail({
  setCurrent,
}: {
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  setCurrent("mail_create");
  return (
    <FormBody
      currentPage={0}
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
            <Heading>Add new mail record...</Heading>
          </Column>
          <Column>
            <Heading>Step 1 of 3</Heading>
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
              name={"source"}
              legendText={"Select source"}
              valueSelected={"LETTER"}
              defaultSelected={"LETTER"}
            >
              <RadioButton value={"LETTER"} labelText={"Letter"} />
              <RadioButton value={"EMAIL"} labelText={"Email"} />
            </RadioButtonGroup>
          </Column>
        </Row>
        <Row>
          <Column>
            <Select
              labelText={"Category"}
              name="category"
              id="categoryInput"
              helperText={"Select the category of the mail subject."}
            >
              {["endorsement", "invitation", "promotion"].map((value) => (
                <SelectItem
                  value={value}
                  text={value[0].toUpperCase() + value.substring(1)}
                  key={value}
                />
              ))}
            </Select>
          </Column>
          <Column>
            <Select
              labelText={"Language"}
              name="language"
              id="languageInput"
              helperText={"Select the language the mail was writtien in."}
            >
              <SelectItem value={"ENGLISH"} text={"English"} />
              <SelectItem value={"HINDI"} text={"Hindi"} />
            </Select>
          </Column>
          <Column>
            <TextInput
              labelText={"Letter Number"}
              name="letterNumber"
              id="letterNumberInput"
              placeholder="XX-0000000000"
              helperText={"Enter the e-office number for the mail."}
            />
          </Column>
          <Column>
            <DatePicker dateFormat="d/m/Y" datePickerType="single">
              <DatePickerInput
                labelText={"Date on Mail"}
                name="dateOnMail"
                placeholder="dd/mm/yyyy"
                id="dateOnMailInput"
                helperText={"Enter the date on the mail."}
              />
            </DatePicker>
          </Column>
          <Column>
            <DatePicker dateFormat="d/m/Y" datePickerType="single">
              <DatePickerInput
                labelText={"Date Recieved"}
                name="dateRecieved"
                placeholder="dd/mm/yyyy"
                id="dateRecievedInput"
                helperText={"Enter the date the mail was recieved."}
              />
            </DatePicker>
          </Column>
        </Row>
        <Row style={rowSpacing}>
          <Column>
            <Select
              labelText={"Recieved At"}
              name="recievedAt"
              id="recievedAtInput"
              helperText={"Select where the mail was recieved."}
            >
              <SelectItem value={"MINISTRY"} text="Ministry" />
              <SelectItem value={"FIELDCAMP"} text="Field Camp" />
              <SelectItem value={"RESIDENCE"} text="Residence" />
            </Select>
          </Column>
          <Column>
            <Select
              labelText={"Designation"}
              name="designation"
              id="designationInput"
              helperText={"Select the designation of the sender."}
            >
              {["MP", "MLA", "SGT"].map((value) => (
                <SelectItem value={value} text={value} key={value} />
              ))}
            </Select>
          </Column>
          <Column>
            <TextInput
              labelText={"Sender's Name"}
              name="senderName"
              id="senderNameInput"
              helperText={"Enter the full name of the sender."}
              placeholder="John Doe"
            />
          </Column>
          <Column>
            <TextInput
              labelText={"Organization"}
              name="organization"
              id="organizationInput"
              placeholder="BJP"
              helperText="Enter the sender's organization."
            />
          </Column>
          <Column>
            <Select
              labelText={"State"}
              name="state"
              id="stateInput"
              helperText="Enter the sender's state."
            >
              {["Delhi", "Uttar Pradesh", "Haryana", "Punjab"].map((state) => (
                <SelectItem value={state} text={state} key={state} />
              ))}
            </Select>
          </Column>
        </Row>
        <Row style={rowSpacing}>
          <Column>
            <TextArea
              labelText={"Sender's Address"}
              name="address"
              helperText="Enter the sender's address."
            />
          </Column>
          <Column lg={3}>
            <Select
              labelText={"Constituency"}
              name="constituency"
              id="constituencyInput"
              helperText="Enter the sender's constituency."
            >
              {["Barmer", "Uttar Pradesh", "Haryana", "Punjab"].map((state) => (
                <SelectItem value={state} text={state} key={state} />
              ))}
            </Select>
          </Column>
        </Row>
        <Row>
          <Column />
          <Column />
          <Column />
          <Column />
          <Column>
            <Link href={"/mail/processing"} passHref={true}>
              <Button kind="primary">Save & Continue</Button>
            </Link>
          </Column>
        </Row>
      </Grid>
    </FormBody>
  );
}
