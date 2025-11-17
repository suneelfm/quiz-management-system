import { Card, Grid, Typography } from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";
import styles from "../../styles/CustomDialog.module.css";

export default function CustomDialog(props: {
  children: ReactNode;
  title: string;
  onClose?: MouseEventHandler<HTMLDivElement>;
}) {
  const { children, title, onClose } = props;
  return (
    <Grid className={styles.dialogContainer} onClick={onClose}>
      <Card
        sx={{
          width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
          borderRadius: "10px",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <Typography
          variant="h6"
          py={2}
          px={3}
          borderBottom={"1px solid gray"}
          mb={1}>
          {title}
        </Typography>
        {children}
      </Card>
    </Grid>
  );
}
