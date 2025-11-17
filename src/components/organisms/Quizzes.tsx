import React, { useState } from "react";
import QuizCard from "../molecules/QuizCard";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../types/types";

type QuizzesProps = {
  isAdmin: boolean;
};

export default function Quizzes(props: QuizzesProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "ghj2h4f5h3",
      title: "Sample",
      questions: [{ id: "dfsdet45", questionStatement: "sdfsf" }],
    },
  ]);
  const navigate = useNavigate();
  const { isAdmin } = props;

  const handleQuizCardClick = (quizId: string) => {
    navigate(`/admin/quiz/${quizId}`);
  };

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
        <QuizCard
          key={id}
          title={title}
          noOfQuestions={questions.length}
          onClick={() => handleQuizCardClick(id)}
        />
      ))}
    </Grid>
  );
}
