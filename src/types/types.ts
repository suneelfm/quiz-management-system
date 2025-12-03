export enum QuestionType {
  MCQ = "MCQ",
  YesNo = "Yes/No",
  Text = "Text",
}

export type Question = {
  _id?: string;
  questionStatement?: string;
  questionType?: QuestionType | string;
  options?: string[];
  answer?: string;
  marks?: number;
};

export type Quiz = {
  _id: string;
  quizTitle: string;
  noQuestions: number;
};
