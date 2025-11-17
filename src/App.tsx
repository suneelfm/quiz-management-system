import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quizzes from "./components/organisms/Quizzes";
import QuizPage from "./components/organisms/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Quizzes isAdmin={false} />} />
          <Route path="/quiz/:quizId" element={<QuizPage isAdmin={false} />} />
          <Route path="/admin">
            <Route index element={<Quizzes isAdmin={true} />} />
            <Route
              path={"/admin/quiz/:quizId"}
              element={<QuizPage isAdmin={true} />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
