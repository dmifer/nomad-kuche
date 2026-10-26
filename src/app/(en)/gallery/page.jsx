import Gallery from "../../../views/Gallery";
import { buildMetadata } from "../../_lib/site";

export const metadata = buildMetadata("en", "gallery");

export default function Page() {
  return <Gallery lang="en" />;
}
