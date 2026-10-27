import { ImpressumPage } from "../../../../SimplePages";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("de", "impressum");

export default function Page() {
  return <ImpressumPage lang="de" />;
}
