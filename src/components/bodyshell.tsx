import { PropsWithChildren } from "react";

export default function BodyShell({ children }: PropsWithChildren<any>) {
  return (
    <div
      style={{
        marginTop: "3rem",
        marginLeft: "16rem",
        width: "calc(100vw - 16rem)",
        height: "calc(100vh - 3rem)",
        padding: "1rem",
      }}
    >
      {children}
    </div>
  );
}
