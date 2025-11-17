import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import QuestionsCard from "../molecules/QuestionsCard";
import { Question } from "../../types/types";
import CustomDialog from "../molecules/CustomDialog";
import InputField from "../atoms/InputField";
import SelectFiled from "../atoms/SelectFiled";

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
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState<boolean>(false);

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
        {isAdmin && (
          <CustomButton onClick={() => setIsAddQuestionOpen(true)}>
            Add Question
          </CustomButton>
        )}
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
      {isAddQuestionOpen && (
        <CustomDialog
          title="Add Question"
          onClose={() => setIsAddQuestionOpen(false)}>
          <Grid container p={2}>
            <Grid size={{ xs: 8 }} pr={2}>
              <InputField label="Question Statement" />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <SelectFiled
                label="Question Type"
                options={["MCQ", "Yes/No", "Text"]}
              />
            </Grid>
          </Grid>
        </CustomDialog>
      )}
    </Grid>
  );
}
