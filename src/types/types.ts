export type Question = {
  id: string;
  questionStatement: string;
  options?: string[];
  answer?: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};
