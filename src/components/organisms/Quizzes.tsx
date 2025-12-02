import React, { useEffect, useState } from "react";
import QuizCard from "../molecules/QuizCard";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../atoms/CustomButton";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../types/types";
import CustomDialog from "../molecules/CustomDialog";
import InputField from "../atoms/InputField";
import axios from "axios";

type QuizzesProps = {
  isAdmin: boolean;
};

export default function Quizzes(props: QuizzesProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = props;

  const handleQuizCardClick = (quizId: string) => {
    navigate(isAdmin ? `/admin/quiz/${quizId}` : `/quiz/${quizId}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/quiz")
      .then((res) => {
        setQuizzes(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:8081/quiz", { quizTitle })
      .then((res) => {
        handleQuizCardClick(res.data.data._id);
      })
      .catch((error) => {
        console.error(error);
      });
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
      {quizzes?.map(({ _id, quizTitle, noQuestions }) => (
        <QuizCard
          key={_id}
          title={quizTitle}
          noOfQuestions={noQuestions}
          onClick={() => handleQuizCardClick(_id)}
        />
      ))}
      {isCreateQuizOpen && (
        <CustomDialog
          title="Create Quiz"
          onClose={() => setIsCreateQuizOpen(false)}>
          <Grid container p={2}>
            <Grid size={{ xs: 10 }} pr={2}>
              <InputField
                label="Quiz Title"
                value={quizTitle}
                onChange={(event) => setQuizTitle(event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <CustomButton onClick={handleSubmit}>Create</CustomButton>
            </Grid>
          </Grid>
        </CustomDialog>
      )}
    </Grid>
  );
}
