export enum QuestionType {
  MCQ = "MCQ",
  YesNo = "Yes/No",
  Text = "Text",
}

export type Question = {
  id?: string;
  questionStatement?: string;
  questionType?: QuestionType | string;
  options?: string[];
  answer?: string;
};

export type Quiz = {
  id: string;
  quizTitle: string;
  noQuestions: number;
};
