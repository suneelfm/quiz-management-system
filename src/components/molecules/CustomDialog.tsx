import { Card, Grid, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import styles from "../../styles/CustomDialog.module.css";

export default function CustomDialog(props: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Grid className={styles.dialogContainer}>
      <Card
        sx={{
          width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
          borderRadius: "10px",
        }}>
        <Typography
          variant="h6"
          py={2}
          px={3}
          borderBottom={"1px solid gray"}
          mb={1}>
          {props.title}
        </Typography>
        {props.children}
      </Card>
    </Grid>
  );
}
