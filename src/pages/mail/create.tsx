import {
  Form,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
  Dropdown,
  DatePicker,
  TextInput,
  TextArea,
  Column,
  Grid,
  Row,
  Button,
  ButtonSet,
} from "carbon-components-react";
import { uniqueID } from "../../logic/utilities";

export default function CreateMail() {
  return (
    <Form>
      <Grid>
        <Row style={{ marginTop: "1rem" }}>
          <Column>
            <RadioButtonGroup
              name={"format"}
              legendText="Format"
              valueSelected={"LETTER"}
            >
              <RadioButton
                name="format"
                value={"LETTER"}
                labelText="Letter"
                size={500}
              />
              <RadioButton
                name="format"
                value={"EMAIL"}
                labelText="Email"
                size={500}
              />
            </RadioButtonGroup>
          </Column>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Column lg={2}>
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
          </Column>
          <Column lg={2}>
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
          </Column>
          <Column lg={2}>
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
            <Dropdown
              id={""}
              items={["Categories"]}
              label="Categories"
              size="lg"
              style={{ marginTop: "1rem" }}
            />
          </Column>
          <Column lg={4}>
            <Row style={{ marginTop: "1rem" }}>
              <Column>
                <Dropdown
                  id={""}
                  items={["Categories"]}
                  label="Categories"
                  size="lg"
                />
              </Column>
              <Column>
                <Dropdown
                  id={""}
                  items={["Categories"]}
                  label="Categories"
                  size="lg"
                />
              </Column>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Column>
                <TextArea labelText="Text" />
              </Column>
            </Row>
          </Column>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Column lg={2} />
          <Column lg={2} />
          <Column lg={2} />
          <Column lg={2}>
            <Column lg={6} />
            <Column lg={6}>
              <Button size="lg" isExpressive>
                Submit
              </Button>
            </Column>
          </Column>
        </Row>
      </Grid>
    </Form>
  );
}
