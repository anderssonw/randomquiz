"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_json_1 = __importDefault(require("../questions.json"));
const collection = questions_json_1.default;
const questions = collection.questions;
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const getRandomQuestion = () => {
    return questions[Math.floor(Math.random() * questions.length)];
};
const cleanQuestion = (question) => {
    return question.replace("<br />", " ").trim().slice(1, -1);
};
app.get("/random", (req, res) => {
    let randomQuestion = getRandomQuestion();
    while (randomQuestion.question.includes("<a href")) {
        randomQuestion = getRandomQuestion();
    }
    const cleanedQuestion = cleanQuestion(randomQuestion.question);
    const response = {
        question: cleanedQuestion,
        answer: randomQuestion.answer,
    };
    res.send(response);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
