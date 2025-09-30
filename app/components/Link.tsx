import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { initializeTraceState } from "next/dist/trace";

interface Props {
  href: string;
  children: React.ReactNode;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href}>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
