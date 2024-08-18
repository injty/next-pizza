"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

import { FC } from "react";

interface AddressInputProps {
  onChange: (value: string) => void;
}

export const AddressInput: FC<AddressInputProps> = ({ onChange }) => {
  return <AddressSuggestions onChange={(data) => onChange(data?.value as string)} token="9af2202e1faaae8fc9a29f32dabbcbf9f7ee8c66" />;
};
