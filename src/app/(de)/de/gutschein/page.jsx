import Gift from "../../../../views/Gift";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("de", "gift");

export default function Page() {
  return <Gift lang="de" />;
}
