import { Card, Grid, Typography } from "@mui/material";
import React, { MouseEventHandler, useState } from "react";
import { Question, QuestionType } from "../../types/types";
import RadioButton from "../atoms/RadioButton";
import CustomButton from "../atoms/CustomButton";
import InputField from "../atoms/InputField";
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";

type QuestionsCardProps = {
  isAdmin: boolean;
  question: Question;
  answer?: string;
  onAnswerSelect: (option: string) => void;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
  onQuestionDelete: () => void;
};

export default function QuestionsCard(props: QuestionsCardProps) {
  const {
    isAdmin,
    question,
    answer,
    onAnswerSelect,
    onEditClick,
    onQuestionDelete,
  } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleQuestionDelete = () => {
    axios
      .delete(`http://localhost:8081/question/${question._id}`)
      .then(() => {
        onQuestionDelete();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Card sx={{ width: "100%", marginY: 2 }}>
        <Typography variant="h6" py={1} px={2}>
          {question.questionStatement}
        </Typography>
        <Grid container py={1} px={2}>
          {question.questionType === QuestionType.Text ? (
            <InputField label="Type you answer here" />
          ) : (
            (question.questionType === QuestionType.MCQ
              ? question.options
              : ["Yes", "No"]
            )?.map((option, index) => (
              <Grid
                key={`option-${index + 1}`}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 12 / (question.options?.length || 2),
                }}>
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
            ))
          )}
        </Grid>
        {isAdmin && (
          <Grid container py={1} px={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body1">Answer: {question.answer}</Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              display={"flex"}
              justifyContent={"end"}>
              <CustomButton sx={{ marginRight: "12px" }} onClick={onEditClick}>
                Edit Question
              </CustomButton>
              <CustomButton onClick={() => setConfirmDelete(true)}>
                Delete Question
              </CustomButton>
            </Grid>
          </Grid>
        )}
      </Card>
      {confirmDelete && (
        <ConfirmationDialog
          title="Are you sure you want to delete the question"
          onConfirm={handleQuestionDelete}
          onDecline={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
