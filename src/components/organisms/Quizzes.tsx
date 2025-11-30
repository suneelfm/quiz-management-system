import React, { useState } from "react";
import QuizCard from "../molecules/QuizCard";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../types/types";
import CustomDialog from "../molecules/CustomDialog";
import InputField from "../atoms/InputField";

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
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = props;

  const handleQuizCardClick = (quizId: string) => {
    navigate(isAdmin ? `/admin/quiz/${quizId}` : `/quiz/${quizId}`);
  };

  return (
    <Grid p={3}>
      <Typography variant="h5" textAlign={"center"} mb={2}>
        {isAdmin ? "Manage" : "Take"} Quizzes
      </Typography>
      {isAdmin && (
        <Grid container justifyContent={"end"} py={2}>
          <CustomButton onClick={() => setIsCreateQuizOpen(true)}>
            Create Quiz
          </CustomButton>
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
      {isCreateQuizOpen && (
        <CustomDialog
          title="Create Quiz"
          onClose={() => setIsCreateQuizOpen(false)}
        >
          <Grid container p={2}>
            <Grid size={{ xs: 10 }} pr={2}>
              <InputField label="Quiz Title" />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <CustomButton>Create</CustomButton>
            </Grid>
          </Grid>
        </CustomDialog>
      )}
    </Grid>
  );
}
