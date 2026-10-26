import { PrivacyPage } from "../../../SimplePages";
import { buildMetadata } from "../../_lib/site";

export const metadata = buildMetadata("en", "privacy");

export default function Page() {
  return <PrivacyPage lang="en" />;
}
