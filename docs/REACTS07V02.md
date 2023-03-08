# VIDEO 02 - useMemo: Ejemplo ordenación posts

En este vídeo haremos un ejemplo con useMemo para renderizar una lista de posts y mostrarlos ordenados. Gracias a useMemo solo volveremos a ordenar los posts en caso de que cambie la lista, o de que cambie el criterio de ordenación (ascendente o descendente).

El código de nuestro componente OrderedPosts queda así:

```jsx
import React from "react";

const OrderedPosts = (props) => {

  console.log("Renderizado componente");

  const [orderAscending, setOrderAscending] = React.useState(true);
  const [render, setRender] = React.useState(false);

  const postOrdered = React.useMemo(() => {

    console.log("Ordenamos posts");

    return props.posts
      .map(post => {
        return {
          ...post,
          date: new Date(post.date)
        }
      })
      .sort((a, b) => {
        if (orderAscending) {
          return a.date < b.date ? -1 : 1
        }
        return a.date > b.date ? -1 : 1;
      });

  }, [props.posts, orderAscending]);

  return (

    <div>
      {postOrdered.map((post) => {
        return <div key={post.title}>
          <p>Titulo: {post.title}</p>
          <p>Fecha: {post.date.toString()}</p>
        </div>
      })}

      <button onClick={() => setOrderAscending(!orderAscending)}>
        Cambiar orden {orderAscending ? 'Descendente' : 'Ascendente'}
      </button>

      <button onClick={() => setRender(!render)}>Cambiar estado (no provoca ordenación)</button>
    </div>
  );
}

export default OrderedPosts;
```

Algunas de las cosas adicionales que hemos visto en este vídeo son el uso de Array.sort

<https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>

NOTA:

Es importante tener en cuenta que React.useMemo no siempre es necesario, y en muchos casos los beneficios de rendimiento pueden ser mínimos. En general, es una buena idea usarlo solo si has identificado un problema de rendimiento específico que se pueda abordar con la memoria caché.
