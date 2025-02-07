"use client";

import { TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import { Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description…" />
      <Button>Submit New</Button>
    </div>
  );
};

export default NewIssuePage;
