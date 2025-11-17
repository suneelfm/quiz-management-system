import { Card, Grid, Typography } from "@mui/material";
import React, { MouseEventHandler, ReactNode } from "react";
import styles from "../../styles/QuizCard.module.css";

type QuizCardProps = {
  title: string;
  noOfQuestions: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function QuizCard(props: QuizCardProps) {
  const { title, noOfQuestions, onClick } = props;
  return (
    <Card className={styles.quizCard}>
      <Grid
        sx={{ cursor: "pointer" }}
        width={"100%"}
        py={1}
        px={2}
        onClick={onClick}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">
          Number of Questions: {noOfQuestions}
        </Typography>
      </Grid>
    </Card>
  );
}
