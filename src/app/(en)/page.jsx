import Home from "../../views/Home";
import { JsonLd } from "../_lib/site";

export default function Page() {
  return (
    <>
      <JsonLd lang="en" />
      <Home lang="en" />
    </>
  );
}
