import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button className="cursor-pointer">
      <Pencil2Icon />
      <Link href={`/issues/edit?id=${issueId}`}>Edit</Link>
    </Button>
  );
};

export default EditIssueButton;
