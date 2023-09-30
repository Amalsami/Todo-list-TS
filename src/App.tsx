import React from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoView from "./TodoView";
import TodoFooter from "./TodoFooter";

function App() {
  return (
    <>
      <TodoList>
        <TodoForm></TodoForm>
        <TodoView></TodoView>
        <TodoFooter></TodoFooter>
      </TodoList>
    </>
  );
}

export default App;
