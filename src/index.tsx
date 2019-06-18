import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

type ActionType =
  | {
      type: "add-task";
      payload: string;
    }
  | {
      type: "sub-task";
      payload: number;
    };

interface StoreType {
  tasks: Array<{ id: number; task: string }>;
}

const Store: StoreType = {
  tasks: [{ id: Math.random(), task: "work" }]
};

const reducer = (state: StoreType, action: ActionType): StoreType => {
  switch (action.type) {
    // case "add-task":
    // if(action)

    case "add-task":
      const tasks = state.tasks.concat({
        id: Math.random(),
        task: action.payload
      });
      return { ...state, tasks };
    // return{ tasks: state.tasks, tasks}

    case "sub-task":
      return {
        ...state,
        tasks: state.tasks.filter(v => v.id !== action.payload)
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, Store);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // <form>
    const input = form.task as HTMLInputElement;

    dispatch({ type: "add-task", payload: input.value });
  };

  const deleteTask = (id: number) => () => {
    dispatch({ type: "sub-task", payload: id });
  };

  return (
    <div className="App">
      <h1>Hello!!!</h1>
      {state.tasks.map(task => (
        <li key={task.id}>
          <p>{task.task}</p>
          <button onClick={deleteTask(task.id)}>delete</button>
        </li>
      ))}

      <form onSubmit={submit}>
        <input type="text" name="task" />
        <button>add task</button>
      </form>
    </div>
  );
}

const rooElement = document.getElementById("root");
render(<App />, rooElement);

export default App;
