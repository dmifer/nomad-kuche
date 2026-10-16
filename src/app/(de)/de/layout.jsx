import { RootShell, buildMetadata } from "../../_lib/site";

export { viewport } from "../../_lib/site";

export const metadata = buildMetadata("de");

export default function Layout({ children }) {
  return <RootShell lang="de">{children}</RootShell>;
}
