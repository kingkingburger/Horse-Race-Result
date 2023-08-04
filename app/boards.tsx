"use client";
import Link from "next/link";
import React from "react";
import { Dropdown, Button } from "@nextui-org/react";
import DropdownItem from "@nextui-org/react/types/dropdown/dropdown-item";
import { Item } from "@react-stately/collections";
import { Menu } from "react-feather";

export default function Boards({ topic }: any) {
  return (
    <Dropdown>
      <Dropdown.Button flat>Trigger</Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions">
        <Dropdown.Item key="new">New file</Dropdown.Item>
        <Dropdown.Item key="copy">Copy link</Dropdown.Item>
        <Dropdown.Item key="edit">Edit file</Dropdown.Item>
        <Dropdown.Item key="delete" color="error">
          Delete file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
