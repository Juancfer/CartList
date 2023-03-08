# VIDEO 03 - useReducer: Conceptos básicos y ejemplo contador

En los próximos vídeos trabajaremos con useReducer:

<https://reactjs.org/docs/hooks-reference.html#usereducer>

React.useReducer es un hook en React que te permite gestionar el estado de una manera predecible, similar a cómo usarías una función reductora con la librería Redux. Recibe como argumento una función reductora y un estado inicial, y devuelve el estado actual y una función dispatch que puedes usar para actualizar el estado.

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Una ventaja de usar React.useReducer es que puede ser más fácil gestionar cambios de estado complejos, especialmente en componentes o aplicaciones más grandes. También te permite mantener toda la lógica de gestión del estado en un único lugar, lo que puede facilitar la comprensión y depuración de tu código.

La siguiente imagen de la librería Redux muestra de manera muy clara el funcionamiento de la librería y también de useReducer que sigue un flujo similar.

![redux-diagram.gif](/docs/assets/redux-diagram.gif)

En este vídeo haremos un pequeño contador que además mostrará el número de pasos ejecutados. Nuestro componente Counter quedará así:

```jsx
import React from "react";

console.log("CREO VALOR INICIAL");
const initialValue = {
  value: 0,
  numSteps: 0,
  lastUpdated: new Date(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        value: state.value + 1,
        numSteps: state.numSteps + 1,
        lastUpdated: new Date(),
      }
    case 'DECREMENT':
      return {
        value: state.value - 1,
        numSteps: state.numSteps + 1,
        lastUpdated: new Date(),
      }
    default:
      console.error("Case not supported");
  }
}

const Counter = () => {
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  return (
    <div className="counter">
      <p>Valor actual: {state.value}</p>
      <p>Numero de pasos: {state.numSteps}</p>
      <p>Última actualización: {state.lastUpdated.toString()}</p>

      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Aumentar</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Disminuir</button>
    </div>
  );
}

export default Counter;
```
