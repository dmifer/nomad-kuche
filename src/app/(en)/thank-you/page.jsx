import { ThankYouPage } from "../../../SimplePages";
import { buildMetadata } from "../../_lib/site";

export const metadata = buildMetadata("en", "thanks");

export default function Page() {
  return <ThankYouPage lang="en" />;
}
