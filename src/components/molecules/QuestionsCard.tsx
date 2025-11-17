import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { Question } from "../../types/types";
import RadioButton from "../atoms/RadioButton";

type QuestionsCardProps = {
  isAdmin: boolean;
  question: Question;
  answer?: string;
  onAnswerSelect: (option: string) => void;
};

export default function QuestionsCard(props: QuestionsCardProps) {
  const { isAdmin, question, answer, onAnswerSelect } = props;

  return (
    <Card sx={{ width: "100%", marginY: 2 }}>
      <Typography variant="h6" py={1} px={2}>
        Question statement
      </Typography>
      <Grid container py={1} px={2}>
        {question.options?.map((option, index) => (
          <Grid
            key={`option-${index + 1}`}
            size={{ xs: 12, sm: 6, lg: 12 / (question.options?.length ?? 1) }}>
            {isAdmin ? (
              `${index + 1}. ${option}`
            ) : (
              <RadioButton
                label={option}
                checked={answer === option}
                onChange={() => onAnswerSelect(option)}
              />
            )}
          </Grid>
        ))}
      </Grid>
      {isAdmin && (
        <Typography variant="body1" py={1} px={2}>
          Answer: {question.answer}
        </Typography>
      )}
    </Card>
  );
}
