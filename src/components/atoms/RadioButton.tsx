import { FormControlLabel, Radio } from "@mui/material";
import React from "react";

type RadioButtonProps = {
  checked?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
};
export default function RadioButton(props: RadioButtonProps) {
  const { label, checked, onChange } = props;
  return (
    <FormControlLabel
      onChange={(_, checked) => onChange?.(checked)}
      checked={checked}
      control={<Radio />}
      label={label}
      title={label}
      sx={{
        maxWidth: "100%",
        "& .MuiFormControlLabel-label": {
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
    />
  );
}
