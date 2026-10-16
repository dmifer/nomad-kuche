import NomadKuche from "../../NomadKuche";
import { JsonLd } from "../_lib/site";

export default function Page() {
  return (
    <>
      <JsonLd lang="en" />
      <NomadKuche lang="en" />
    </>
  );
}
