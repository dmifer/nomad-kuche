import Gallery from "../../../../views/Gallery";
import { buildMetadata } from "../../../_lib/site";

export const metadata = buildMetadata("de", "gallery");

export default function Page() {
  return <Gallery lang="de" />;
}
