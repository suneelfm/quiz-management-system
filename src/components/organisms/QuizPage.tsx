import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import QuestionsCard from "../molecules/QuestionsCard";
import { Question, QuestionType } from "../../types/types";
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
      questionType: QuestionType.MCQ,
      options: [
        "sdfdsdffsdfsdfsdfsdfsdfdsfxcxcbxcnbxcnxcn",
        "sdf",
        "werd",
        "wer",
      ],
      answer: "sdf",
    },
  ]);
  const [questionDetails, setQuestionDetails] = useState<Question>();
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
          answer={answers?.[question.id ?? ""]}
          onAnswerSelect={(option) =>
            handleAnswerSelections(question.id ?? "", option)
          }
        />
      ))}
      {isAddQuestionOpen && (
        <CustomDialog
          title="Add Question"
          onClose={() => setIsAddQuestionOpen(false)}
        >
          <Grid container p={2}>
            <Grid size={{ xs: 8 }} pr={2}>
              <InputField
                label="Question Statement"
                onChange={(event) =>
                  setQuestionDetails({
                    ...questionDetails,
                    questionStatement: event.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <SelectFiled
                label="Question Type"
                options={[
                  QuestionType.MCQ,
                  QuestionType.YesNo,
                  QuestionType.Text,
                ]}
                onChange={(event) => {
                  const value = event.target.value;
                  let optionsCopy = [...(questionDetails?.options ?? [])];
                  if (value === QuestionType.MCQ) {
                    optionsCopy.push("");
                  } else optionsCopy = [];
                  setQuestionDetails({
                    ...questionDetails,
                    questionType: value,
                    options: optionsCopy,
                  });
                }}
              />
            </Grid>
            {questionDetails?.options?.map((option, i) => (
              <Grid key={`option-${i + 1}`} size={{ xs: 12, sm: 6 }} p={1}>
                <InputField
                  value={option}
                  label={`Option ${i + 1}`}
                  onChange={() => {}}
                />
              </Grid>
            ))}
            <Grid
              size={12}
              py={2}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {questionDetails?.questionType === QuestionType.MCQ && (
                <CustomButton
                  disabled={(questionDetails.options?.length ?? 0) >= 4}
                  onClick={() => {
                    const optionsCopy = [...(questionDetails.options ?? [])];
                    optionsCopy.push("");
                    setQuestionDetails({
                      ...questionDetails,
                      options: optionsCopy,
                    });
                  }}
                >
                  Add Option
                </CustomButton>
              )}
              <CustomButton>Create Question</CustomButton>
            </Grid>
          </Grid>
        </CustomDialog>
      )}
    </Grid>
  );
}
