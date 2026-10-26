import Workshop from "../../../../../views/Workshop";
import { buildMetadata } from "../../../../_lib/site";

export const metadata = buildMetadata("de", "manty");

export default function Page() {
  return <Workshop lang="de" id="manty" />;
}
