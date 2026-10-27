import { ThankYouPage } from "../../../../SimplePages";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("de", "thanks");

export default function Page() {
  return <ThankYouPage lang="de" />;
}
