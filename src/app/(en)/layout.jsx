import { RootShell, buildMetadata } from "../_lib/site";

export { viewport } from "../_lib/site";

export const metadata = buildMetadata("en");

export default function Layout({ children }) {
  return <RootShell lang="en">{children}</RootShell>;
}
