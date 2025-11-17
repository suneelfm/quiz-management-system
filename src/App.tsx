import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quizzes from "./components/organisms/Quizzes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Quizzes isAdmin={false} />} />
          <Route path="/admin">
            <Route index element={<Quizzes isAdmin={true} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
