# VIDEO 01 - React.useMemo: conceptos básicos

En esta sesión vamos a hablar de React.useMemo:

<https://es.reactjs.org/docs/hooks-reference.html#usememo>

React.useMemo es un hook en React que te permite optimizar el rendimiento de tu componente al recordar los resultados de llamadas a funciones costosas. Recibe como argumento una función y una lista de dependencias, y sólo vuelve a calcular el resultado de la función si alguna de las dependencias ha cambiado:

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

En este vídeo haremos uso de React.useMemo para memorizar unos cálculos sobre resultados y mostrar una pelotita verde o roja dependiendo de si la nota está por encima de la media o por debajo.

El código de nuestro componente Results queda así:

```jsx
import React from "react";

const mapResults = (resultlist) => {
  console.log("Ejecutado calculo de resultados");

  const total = resultlist.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = total / resultlist.length;

  return resultlist.map((elem, index) => {
    return <p key={index}>{elem} {elem >= average ? '🟢' : '🔴'} </p>
  });
}

const Results = () => {

  const [render, setRender] = React.useState(false);
  const [resultsNumber] = React.useState([2, 6, 5, 8, 1, 3, 10, 2]);
  const memoizedValue = React.useMemo(() => mapResults(resultsNumber), [resultsNumber]);

  return (
    <div className="results">
      {memoizedValue}

      <p>Valor actual: {render.toString()}</p>
      <button onClick={() => setRender(!render)}>Cambiar estado</button>
    </div>
  );
}

export default Results;
```

La parte importante está en el uso de React.useMemo:

```jsx
const memoizedValue = React.useMemo(() => mapResults(resultsNumber), [resultsNumber]);
```

Mediante esa línea le indicamos a React que memorize el resultado de **mapResults(resultsNumber)** en la variable **memoizedValue** y solo vuelva a calcular su resultado si cambia el array **resultsNumber**
