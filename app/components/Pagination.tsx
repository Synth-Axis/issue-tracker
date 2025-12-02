"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const changePageSize = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", size);
    params.set("page", "1"); // Reset to first page
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" justify="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
        className="cursor-pointer"
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="cursor-pointer"
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
        className="cursor-pointer"
      >
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
        className="cursor-pointer"
      >
        <DoubleArrowRightIcon />
      </Button>
      <Select.Root
        defaultValue={pageSize.toString()}
        onValueChange={changePageSize}
      >
        <Select.Trigger className="cursor-pointer" />
        <Select.Content>
          <Select.Item value="5">5 per page</Select.Item>
          <Select.Item value="10">10 per page</Select.Item>
          <Select.Item value="15">15 per page</Select.Item>
          <Select.Item value="20">20 per page</Select.Item>
          <Select.Item value="25">25 per page</Select.Item>
          <Select.Item value="30">30 per page</Select.Item>
          <Select.Item value="50">50 per page</Select.Item>
          <Select.Item value="100">100 per page</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default Pagination;
