# VIDEO 04 - useReducer: ejemplo complejo todo list

En este vídeo haremos uso de React.useReducer para crear un estado donde almancenaremos una lista de tareas a realizar (TODOs). 

En esa lista de tareas podremos añadir elementos, así como marcar que los hemos hecho o están pendientes.

Nuestro componente TodoList quedará de la siguiente manera:

```jsx
import React from "react";

const initialValue = {
  tasks: [{
    id: 0,
    title: "Soy la primera tarea",
    done: false,
  }],
  lastTaskCreated: 0,
};

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "CREATE TASK":
      const newTask = {
        id: state.lastTaskCreated + 1,
        title: action.payload.title,
        done: false,
      };
      newState.tasks = [...newState.tasks, newTask];
      newState.lastTaskCreated = newTask.id;

      break;

    case "CHANGE TASK":
      newState.tasks = newState.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            done: !task.done,
          }
        }
        return task;
      });
      break;

    default:
      console.error("ACTION TYPE NOT SUPPORTED");
  }

  return newState;
};

const TodoList = () => {

  const [state, dispatch] = React.useReducer(reducer, initialValue);

  const inputReference = React.useRef(null);

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    const payloadToSend = {
      title: inputReference.current.value,
    };
    dispatch({ type: "CREATE TASK", payload: payloadToSend });

    inputReference.current.value = "";
  }, []);

  const changeTask = React.useCallback((taskId) => {
    const payloadToSend = {
      id: taskId,
    };

    dispatch({ type: "CHANGE TASK", payload: payloadToSend });
  }, []);

  return (
    <div className="todo-list">

      <form onSubmit={onSubmit}>
        <input ref={inputReference} type="text" />
        <button type="submit">Crear tarea</button>
      </form>

      <h4>Tareas:</h4>

      <ul>
        {state.tasks.map((task) =>
          <li key={task.id} onClick={() => changeTask(task.id)}>
            {task.title} / Hecha: {task.done ? "Si" : "No"}
          </li>
        )}
      </ul>

    </div>
  );
}

export default TodoList;
```

Recuerda que el código que hemos visto durante los vídeos puedes encontrarlo en el siguiente repositorio:

<https://github.com/The-Valley-School/react-s7-usememo-useducer>