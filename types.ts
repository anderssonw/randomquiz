export type Question = {
  category: string;
  air_date: string;
  question: string;
  value: string;
  answer: string;
  round: string;
  show_number: string;
};

export type QuestionCollection = {
  questions: Question[];
};

export type QuestionAndAnswerResponse = {
  question: string;
  answer: string;
  category: string;
  value: number;
};
