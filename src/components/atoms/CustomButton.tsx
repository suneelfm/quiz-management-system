import { Button } from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";

type CustomButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
};

export default function CustomButton(props: CustomButtonProps) {
  const { children, onClick, ...rest } = props;
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ borderRadius: "10px" }}
      onClick={onClick}
      {...rest}>
      {children}
    </Button>
  );
}
