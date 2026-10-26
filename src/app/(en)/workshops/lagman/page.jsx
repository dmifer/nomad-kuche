import Workshop from "../../../../views/Workshop";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("en", "lagman");

export default function Page() {
  return <Workshop lang="en" id="lagman" />;
}
