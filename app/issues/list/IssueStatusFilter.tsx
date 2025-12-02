"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses = [
  { label: "All", value: "all" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    params.set("page", "1");

    router.push(`/issues/list?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? "all"}
      onValueChange={handleChange}
    >
      <Select.Trigger
        className="cursor-pointer"
        placeholder="Filter by status..."
      />
      <Select.Content>
        {statuses.map((s) => (
          <Select.Item key={s.value} value={s.value} className="cursor-pointer">
            {s.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
