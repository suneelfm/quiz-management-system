import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../atoms/CustomButton";
import QuestionsCard from "../molecules/QuestionsCard";
import { Question, QuestionType, Quiz } from "../../types/types";
import CustomDialog from "../molecules/CustomDialog";
import InputField from "../atoms/InputField";
import SelectFiled from "../atoms/SelectFiled";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationDialog from "../molecules/ConfirmationDialog";

type QuizPageProps = {
  isAdmin: boolean;
};
export default function QuizPage(props: QuizPageProps) {
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizTitle, setQuizTitle] = useState<{
    edit?: boolean;
    title?: string;
  }>();
  const [questions, setQuestions] = useState<Question[]>();
  const [questionDetails, setQuestionDetails] = useState<Question | null>();
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>();
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { isAdmin } = props;

  const navigate = useNavigate();
  const params = useParams<{ quizId: string }>();

  const getQuestions = () => {
    axios
      .get(`http://localhost:8081/question/${params.quizId}`)
      .then((res) => {
        setQuestions(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getQuiz = () => {
    axios
      .get(`http://localhost:8081/quiz/${params.quizId}`)
      .then((res) => {
        setQuiz(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getQuiz();
    getQuestions();
  }, []);

  const handleAnswerSelections = (questionId: string, answer: string) => {
    setAnswers((pre) => ({ ...pre, [questionId]: answer }));
  };

  const handleQuestionCreation = () => {
    (questionDetails?._id
      ? axios.put("http://localhost:8081/question", questionDetails)
      : axios.post("http://localhost:8081/question", {
          quizId: params.quizId,
          ...questionDetails,
        })
    )
      .then(() => {
        setQuestionDetails(null);
        setIsAddQuestionOpen(false);
        getQuestions();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteQuiz = () => {
    axios
      .delete(`http://localhost:8081/quiz/${params.quizId}`)
      .then(() => {
        navigate(isAdmin ? "/admin" : "/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditQuiz = () => {
    axios
      .put("http://localhost:8081/quiz", {
        _id: params.quizId,
        quizTitle: quizTitle?.title,
      })
      .then(() => {
        getQuiz();
        setQuizTitle({ edit: false, title: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Grid container p={3}>
      <Grid size={12} display={"flex"} mb={3}>
        <Typography width={"calc(100% - 284px)"} variant="h6">
          {quizTitle?.edit ? (
            <Grid display={"inline-block"} width={"calc(100% - 100px)"}>
              <InputField
                label="Quiz Title"
                value={quizTitle?.title}
                onChange={(event) =>
                  setQuizTitle({ ...quizTitle, title: event.target.value })
                }
                onBlur={handleEditQuiz}
              />
            </Grid>
          ) : (
            quiz?.quizTitle
          )}
          {isAdmin && (
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                color: "dodgerblue",
                marginLeft: "10px",
              }}
              onClick={() =>
                setQuizTitle({ edit: true, title: quiz?.quizTitle })
              }>
              Edit
            </span>
          )}
        </Typography>
        {isAdmin && (
          <>
            <CustomButton
              sx={{ marginRight: "12px" }}
              onClick={() => setConfirmDelete(true)}>
              Delete Quiz
            </CustomButton>
            <CustomButton onClick={() => setIsAddQuestionOpen(true)}>
              Add Question
            </CustomButton>
          </>
        )}
      </Grid>

      {questions?.map((question) => (
        <QuestionsCard
          key={question._id}
          isAdmin={isAdmin}
          question={question}
          answer={answers?.[question._id ?? ""]}
          onAnswerSelect={(option) =>
            handleAnswerSelections(question._id ?? "", option)
          }
          onEditClick={() => {
            setQuestionDetails(question);
            setIsAddQuestionOpen(true);
          }}
          onQuestionDelete={getQuestions}
        />
      ))}
      {!isAdmin && (
        <Grid container justifyContent={"end"} width={"100%"}>
          <CustomButton
            onClick={() => {
              console.log(answers);
            }}>
            Submit
          </CustomButton>
        </Grid>
      )}
      {isAddQuestionOpen && (
        <CustomDialog
          title="Add Question"
          onClose={() => {
            questionDetails?._id && setQuestionDetails(null);
            setIsAddQuestionOpen(false);
          }}>
          <Grid container p={2}>
            <Grid size={{ xs: 8 }} pr={2}>
              <InputField
                label="Question Statement"
                value={questionDetails?.questionStatement}
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
                value={questionDetails?.questionType}
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
                  onChange={(event) => {
                    const optionCopy = [...(questionDetails.options ?? [])];
                    optionCopy.splice(i, 1, event.target.value);
                    setQuestionDetails({
                      ...questionDetails,
                      options: optionCopy,
                    });
                  }}
                />
              </Grid>
            ))}
            {questionDetails?.questionType && (
              <Grid size={12} p={1}>
                {questionDetails?.questionType === QuestionType.Text ? (
                  <InputField
                    value={questionDetails.answer}
                    label={"Answer"}
                    onChange={(event) => {
                      setQuestionDetails({
                        ...questionDetails,
                        answer: event.target.value,
                      });
                    }}
                  />
                ) : (
                  <SelectFiled
                    label="Answer"
                    value={questionDetails.answer}
                    options={
                      (questionDetails?.questionType === QuestionType.MCQ
                        ? questionDetails.options
                        : ["Yes", "No"]) ?? []
                    }
                    onChange={(event) => {
                      setQuestionDetails({
                        ...questionDetails,
                        answer: event.target.value,
                      });
                    }}
                  />
                )}
              </Grid>
            )}

            <Grid
              size={12}
              py={2}
              display={"flex"}
              justifyContent={"space-between"}>
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
                  }}>
                  Add Option
                </CustomButton>
              )}
              <CustomButton onClick={handleQuestionCreation}>
                {questionDetails?._id ? "Update" : "Create"} Question
              </CustomButton>
            </Grid>
          </Grid>
        </CustomDialog>
      )}
      {confirmDelete && (
        <ConfirmationDialog
          title="Are you sure you want to delete this quiz?"
          onConfirm={handleDeleteQuiz}
          onDecline={() => setConfirmDelete(false)}
        />
      )}
    </Grid>
  );
}
