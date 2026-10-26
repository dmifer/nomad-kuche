import { ImpressumPage } from "../../../SimplePages";
import { buildMetadata } from "../../_lib/site";

export const metadata = buildMetadata("en", "impressum");

export default function Page() {
  return <ImpressumPage lang="en" />;
}
