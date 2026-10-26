import About from "../../../views/About";
import { buildMetadata } from "../../_lib/site";

export const metadata = buildMetadata("en", "story");

export default function Page() {
  return <About lang="en" />;
}
