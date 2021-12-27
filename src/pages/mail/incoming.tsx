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
import { Dispatch, SetStateAction, useState } from "react";
import FormBody from "../../components/formbody";
import type { pages } from "../../logic/frontend";
import type {
  Region,
  PostType,
  Category,
  State,
  Designation,
} from "@prisma/client";
import { clientDB, uniqueID } from "../../logic/utilities";

const rowSpacing = { margin: "1rem -1rem" };
export type Mode = "CREATE" | "UPDATE";

export const getServerSideProps = async (ctx) => {
  let idx: bigint;
  let mode: Mode;
  if (ctx.query && ctx.query.idx) idx = ctx.query.idx;
  else idx = BigInt(await uniqueID.asyncGetUniqueID());
  if (ctx.query && ctx.query.mode) mode = ctx.query.mode;
  else mode = "CREATE";

  const categories = await clientDB.category.findMany();
  const states = await clientDB.state.findMany();
  const designations = await clientDB.designation.findMany();

  return {
    props: {
      idx: idx.toString(),
      mode,
      date: new Date().toLocaleString().toUpperCase(),
      categories: categories.map((category) => ({
        id: category.id.toString(),
        name: category.name,
      })),
      states: states.map((state) => ({
        id: state.id.toString(),
        name: state.name,
      })),
      designations: designations.map((designation) => ({
        id: designation.id.toString(),
        name: designation.name,
      })),
    },
  };
};

function CreateMail({
  idx,
  mode,
  date,
  categories,
  states,
  designations,
  setCurrent,
}: {
  idx: string;
  mode: Mode;
  date: string;
  categories: Category[];
  states: State[];
  designations: Designation[];
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  const [format, setFormat] = useState("LETTER");
  const [region, setRegion] = useState("MINISTRY");
  const [language, setLanguage] = useState("LANGUAGE");
  const [letterNumber, setLetterNumber] = useState("");
  const [dateOnMail, setDateOnMail] = useState(new Date().toLocaleDateString());
  const [dateRecieved, setDateRecieved] = useState(
    new Date().toLocaleDateString()
  );
  const [category, setCategory] = useState(categories.at(0).id);
  const [designation, setDesignation] = useState(designations.at(0).id);
  const [] = useState();

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
            <Heading>
              {mode === "CREATE" ? "Add new" : "Update existing"} mail record...
            </Heading>
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
                <Column>{date}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: "bold", textAlign: "right" }}>
                  Last Updated:
                </Column>
                <Column>{date}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: "bold", textAlign: "right" }}>
                  Record ID:
                </Column>
                <Column>
                  {region.charAt(0).toUpperCase() + idx.toString()}
                </Column>
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
              valueSelected={format}
              defaultSelected={format}
              onChange={(event) => setFormat(event.valueOf() as string)}
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
              value={category.toString()}
              onChange={(event) =>
                setCategory(BigInt(event.currentTarget.value))
              }
            >
              {categories.map((category) => (
                <SelectItem
                  value={category.id.toString()}
                  text={category.name}
                  key={category.id.toString()}
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
              value={language}
              onChange={(event) => setLanguage(event.currentTarget.value)}
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
              value={letterNumber}
              onChange={(event) => setLetterNumber(event.currentTarget.value)}
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
                value={dateOnMail}
                onChange={(event) => setDateOnMail(event.currentTarget.value)}
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
              {designations.map((designation) => (
                <SelectItem
                  value={designation.id.toString()}
                  text={designation.name}
                  key={designation.id.toString()}
                />
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
              {states.map((state) => (
                <SelectItem
                  value={state.id.toString()}
                  text={state.name}
                  key={state.id.toString()}
                />
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
            <Link
              href={`/mail/processing?idx=${
                region.charAt(0).toUpperCase() + idx.toString()
              }&mode=${mode}`}
              passHref={true}
            >
              <Button
                onClick={async (event) => {
                  event.preventDefault();
                  await fetch(
                    mode === "CREATE"
                      ? "/api/mail/create"
                      : `/api/mail/update/${idx}`,
                    {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify(region, (_, value) =>
                        typeof value === "bigint" ? value.toString() : value
                      ),
                    }
                  );
                }}
                kind="primary"
              >
                Save & Continue
              </Button>
            </Link>
          </Column>
        </Row>
      </Grid>
    </FormBody>
  );
}

export default CreateMail;
