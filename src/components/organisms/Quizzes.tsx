import React, { useState } from "react";
import QuizCard from "../molecules/QuizCard";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../atoms/CustomButton";

type QuizzesProps = {
  isAdmin: boolean;
};

type Question = {
  questionStatement: string;
};

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export default function Quizzes(props: QuizzesProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "ghj2h4f5h3",
      title: "Sample",
      questions: [{ questionStatement: "sdfsf" }],
    },
  ]);
  const { isAdmin } = props;
  return (
    <Grid p={3}>
      <Typography variant="h5" textAlign={"center"} mb={2}>
        {isAdmin ? "Manage" : "Take"} Quizzes
      </Typography>
      {isAdmin && (
        <Grid container justifyContent={"end"} py={2}>
          <CustomButton>Create Quiz</CustomButton>
        </Grid>
      )}
      {quizzes?.map(({ id, title, questions }) => (
        <QuizCard key={id} title={title} noOfQuestions={questions.length} />
      ))}
    </Grid>
  );
}
