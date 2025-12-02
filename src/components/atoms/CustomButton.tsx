import { Button, SxProps, Theme } from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";

type CustomButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
  [key: string]: any;
};

export default function CustomButton(props: CustomButtonProps) {
  const { children, onClick, sx, ...rest } = props;
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ borderRadius: "10px", ...sx }}
      onClick={onClick}
      {...rest}>
      {children}
    </Button>
  );
}
