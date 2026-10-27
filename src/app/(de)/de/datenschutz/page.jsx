import { PrivacyPage } from "../../../../SimplePages";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("de", "privacy");

export default function Page() {
  return <PrivacyPage lang="de" />;
}
