import { Form } from "carbon-components-react";
import { PropsWithChildren } from "react";

export default function FormBody({ children }: PropsWithChildren<any>) {
  return (
    <Form style={{ margin: "1rem", backgroundColor: "Window" }}>
      {children}
    </Form>
  );
}
