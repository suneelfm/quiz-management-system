import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import QuestionsCard from "../molecules/QuestionsCard";
import { Question } from "../../types/types";

type QuizPageProps = {
  isAdmin: boolean;
};
export default function QuizPage(props: QuizPageProps) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "hjhg234",
      questionStatement: "sdgsdhsfh",
      options: ["sdfd", "sdf", "werd", "wer"],
      answer: "sdf",
    },
  ]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>();

  const { isAdmin } = props;

  const handleAnswerSelections = (questionId: string, answer: string) => {
    setAnswers((pre) => ({ ...pre, [questionId]: answer }));
  };
  return (
    <Grid container p={3}>
      <Grid size={12} display={"flex"} mb={3}>
        <Typography width={"calc(100% - 145px)"} variant="h6">
          Quiz Title
        </Typography>
        {isAdmin && <CustomButton>Add Question</CustomButton>}
      </Grid>

      {questions.map((question) => (
        <QuestionsCard
          key={question.id}
          isAdmin={isAdmin}
          question={question}
          answer={answers?.[question.id]}
          onAnswerSelect={(option) =>
            handleAnswerSelections(question.id, option)
          }
        />
      ))}
    </Grid>
  );
}
