import About from "../../../../views/About";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("de", "story");

export default function Page() {
  return <About lang="de" />;
}
