import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";
import styles from "../../styles/CustomDialog.module.css";
import CustomButton from "../atoms/CustomButton";

type ConfirmationDialogProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onDecline?: MouseEventHandler<HTMLButtonElement>;
};

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { title, subtitle, onConfirm, onDecline } = props;
  return (
    <Grid className={styles.dialogContainer}>
      <Card
        sx={{
          width: { xs: "100%", sm: "80%", md: "50%", lg: "30%" },
          borderRadius: "10px",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <CardContent>
          {title}
          {subtitle && (
            <Typography mt={2} variant="subtitle2">
              {subtitle}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {onDecline && (
            <CustomButton onClick={onDecline} size="small">
              Cancel
            </CustomButton>
          )}
          {onConfirm && (
            <CustomButton onClick={onConfirm} size="small">
              Ok
            </CustomButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
