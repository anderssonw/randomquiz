import express, { Express, Request, Response } from "express";

import questionsJson from "../questions.json";
import {
  Question,
  QuestionAndAnswerResponse,
  QuestionCollection,
} from "../types";

const collection: QuestionCollection = questionsJson as QuestionCollection;
const questions = collection.questions;

const app: Express = express();
const port = process.env.PORT || 3000;

const getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};

const cleanQuestion = (question: string) => {
  return question.replace("<br />", " ").trim().slice(1, -1);
};

app.get("/random", (req: Request, res: Response) => {
  let randomQuestion = getRandomQuestion();

  while (randomQuestion.question.includes("<a href")) {
    randomQuestion = getRandomQuestion();
  }

  const cleanedQuestion = cleanQuestion(randomQuestion.question);

  const response: QuestionAndAnswerResponse = {
    question: cleanedQuestion,
    answer: randomQuestion.answer,
    category: randomQuestion.category,
  };
  res.send(response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
