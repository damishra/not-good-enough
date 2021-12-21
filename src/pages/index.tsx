import { Dispatch, SetStateAction } from "react";
import type { pages } from "../logic/frontend";

export default function HomePage({
  setCurrent,
}: {
  setCurrent: Dispatch<SetStateAction<pages>>;
}) {
  setCurrent("dashboard");
  return <div></div>;
}
