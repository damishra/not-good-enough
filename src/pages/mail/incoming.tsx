import {
  Button,
  Column,
  ComboBox,
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormBody from "../../components/formbody";
import type { pages } from "../../logic/frontend";
import type {
  Region,
  PostType,
  Category,
  State,
  Designation,
  Organisation,
  Constituency,
  Sender,
} from "@prisma/client";
import { clientDB, uniqueID } from "../../logic/utilities";
import { useRouter } from "next/router";

const rowSpacing = { margin: "1rem -1rem" };
export type Mode = "CREATE" | "UPDATE";

export const getServerSideProps = async (ctx: {
  query: { idx: bigint | undefined; mode: Mode | undefined };
}) => {
  let idx: bigint;
  let mode: Mode;
  if (ctx.query && ctx.query.idx) idx = ctx.query.idx;
  else idx = BigInt(await uniqueID.asyncGetUniqueID());
  if (ctx.query && ctx.query.mode) mode = ctx.query.mode;
  else mode = "CREATE";

  const categories = await clientDB.category.findMany();
  const states = await clientDB.state.findMany();
  const designations = await clientDB.designation.findMany();
  const organizations = await clientDB.organisation.findMany();
  const constituencies = await clientDB.constituency.findMany();
  const senders = await clientDB.sender.findMany();

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
      organizations: organizations.map((organization) => ({
        id: organization.id.toString(),
        name: organization.name,
      })),
      constituencies: constituencies.map((constituency) => ({
        id: constituency.id.toString(),
        name: constituency.name,
        state_id: constituency.state_id.toString(),
      })),
      senders: senders.map((sender) => ({
        ...sender,
        id: sender.id.toString(),
        organisation_id: sender.organisation_id.toString(),
        designation_id: sender.designation_id.toString(),
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
  organizations,
  constituencies,
  senders,
  setCurrent,
}: {
  idx: string;
  mode: Mode;
  date: string;
  categories: Category[];
  states: State[];
  designations: Designation[];
  organizations: Organisation[];
  constituencies: Constituency[];
  senders: Sender[];
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  const [format, setFormat] = useState("LETTER" as PostType);
  const [region, setRegion] = useState("MINISTRY" as Region);
  const [language, setLanguage] = useState("LANGUAGE");
  const [letterNumber, setLetterNumber] = useState("");
  const [dateOnMail, setDateOnMail] = useState(new Date().toLocaleDateString());
  const [dateRecieved, setDateRecieved] = useState(
    new Date().toLocaleDateString()
  );
  const [category, setCategory] = useState(categories.at(0).id);
  const [designation, setDesignation] = useState(designations.at(0).id);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState(organizations.at(0).id);
  const [state, setState] = useState(states.at(0).id);
  const [address, setAddress] = useState("");
  const [constituency, setConstituency] = useState(
    constituencies
      .map((cons) => {
        if (cons.state_id === state) return cons;
      })
      .at(0)?.id ?? 0n
  );

  const router = useRouter();

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
              onChange={(event) => setFormat(event.valueOf() as PostType)}
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
                value={dateRecieved}
                onChange={(event) => setDateRecieved(event.currentTarget.value)}
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
              value={region}
              onChange={(event) =>
                setRegion(event.currentTarget.value as Region)
              }
            >
              <SelectItem value={"MINISTRY" as Region} text="Ministry" />
              <SelectItem value={"FIELDCAMP" as Region} text="Field Camp" />
              <SelectItem value={"RESIDENCE" as Region} text="Residence" />
            </Select>
          </Column>
          <Column>
            <Select
              labelText={"Designation"}
              name="designation"
              id="designationInput"
              helperText={"Select the designation of the sender."}
              value={designation.toString()}
              onChange={(event) =>
                setDesignation(BigInt(event.currentTarget.value))
              }
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
            <ComboBox
              titleText={"Sender's Name"}
              name="senderName"
              id="senderNameInput"
              helperText={"Enter the full name of the sender."}
              placeholder="John Doe"
              value={name}
              items={senders.map((sender) => sender.fullname)}
              onChange={(event) => {
                setName(event.selectedItem);
                const index = senders.findIndex(
                  (sender) =>
                    sender.fullname === name &&
                    BigInt(sender.designation_id) === BigInt(designation)
                );
                if (index > -1) {
                  setAddress(senders[index].address);
                  setOrganization(senders[index].organisation_id);
                }
              }}
            />
          </Column>
          <Column>
            <Select
              labelText={"Organization"}
              name="organization"
              id="orgInput"
              helperText={"Select the organization of the sender."}
              value={organization.toString()}
              onChange={(event) =>
                setOrganization(BigInt(event.currentTarget.value))
              }
            >
              {organizations.map((organization) => (
                <SelectItem
                  value={organization.id.toString()}
                  text={organization.name}
                  key={organization.id.toString()}
                />
              ))}
            </Select>
          </Column>
          <Column>
            <Select
              labelText={"State"}
              name="state"
              id="stateInput"
              helperText="Enter the sender's state."
              value={state.toString()}
              onChange={(event) => {
                setState(BigInt(event.currentTarget.value));
                setConstituency(
                  constituencies[
                    constituencies.findIndex((cs) => cs.state_id === state)
                  ]?.id ?? constituencies.at(0).id
                );
              }}
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
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
            />
          </Column>
          <Column lg={3}>
            <Select
              labelText={"Constituency"}
              name="constituency"
              id="constituencyInput"
              helperText="Enter the sender's constituency."
              value={constituency.toString() ?? 0n.toString()}
              onChange={(event) =>
                setConstituency(BigInt(event.currentTarget.value))
              }
            >
              {constituencies.map((cs) =>
                BigInt(cs.state_id) === BigInt(state) ? (
                  <SelectItem
                    value={cs.id.toString()}
                    text={cs.name}
                    key={cs.id.toString()}
                  />
                ) : (
                  ""
                )
              )}
            </Select>
          </Column>
        </Row>
        <Row>
          <Column />
          <Column />
          <Column />
          <Column />
          <Column>
            <Button
              onClick={async (event) => {
                event.preventDefault();
                const senderdet =
                  senders[
                    senders.findIndex((sender) => sender.fullname === name)
                  ].id ?? name;
                const body = {
                  id: idx,
                  format,
                  language,
                  category,
                  letterNumber,
                  dateOnMail,
                  dateRecieved,
                  region,
                  designation,
                  senderdet,
                  organization,
                  state,
                  address,
                  constituency,
                };
                const result = await fetch(
                  mode === "CREATE"
                    ? "/api/mail/create"
                    : `/api/mail/update/${idx}`,
                  {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(body, (_, value) =>
                      typeof value === "bigint" ? value.toString() : value
                    ),
                  }
                );

                if (result.status === 201) {
                  await router.prefetch(
                    `/mail/processing?idx=${idx}&mode=${mode}`
                  );
                  router.push(`/mail/processing?idx=${idx}&mode=${mode}`);
                } else {
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    Big Error
                  </div>;
                }
              }}
              kind="primary"
            >
              Save & Continue
            </Button>
          </Column>
        </Row>
      </Grid>
    </FormBody>
  );
}

export default CreateMail;
