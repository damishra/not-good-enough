import {
  Column,
  Form,
  Grid,
  ProgressIndicator,
  ProgressStep,
  Row,
} from "carbon-components-react";
import { PropsWithChildren } from "react";

export default function FormBody({
  children,
  currentPage,
  pages,
}: PropsWithChildren<any>) {
  return (
    <Form style={{ margin: "1rem" }}>
      {children}
      <Grid style={{ position: "fixed", width: "80%", bottom: "0" }}>
        <Row style={{ margin: "1rem -1rem" }}>
          <Column>
            <ProgressIndicator
              vertical={false}
              currentIndex={currentPage as number}
              spaceEqually
              style={{ position: "relative", bottom: "0" }}
            >
              {(
                pages as { name: string; description: string; link: string }[]
              ).map((page) => (
                <ProgressStep
                  label={page.name}
                  description={page.description}
                  key={page.name}
                  onClick={(event) => {
                    event.preventDefault();
                    location.href = page.link;
                  }}
                />
              ))}
            </ProgressIndicator>
          </Column>
        </Row>
      </Grid>
    </Form>
  );
}
