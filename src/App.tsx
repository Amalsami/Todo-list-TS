import TodoList from "./modules/todos/components/todo-list";
import TodoForm from "./modules/todos/components/todo-form";
import TodoView from "./modules/todos/components/todo-view";
import TodoFooter from "./modules/todos/components/todos-footer";

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
