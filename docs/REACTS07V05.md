# VIDEO 05 - Ejercicio: Carrito de la compra

En este ejercicio debes hacer uso de los dos hooks que has aprendido en esta sesión:

- UseMemo
- UseReducer

Debes crear una especie de carrito de la compra, donde podrás añadir productos. Los precios de los productos los deberás indicar también tú:

![Captura de pantalla 2022-12-28 a las 19.09.04.png](/docs/assets/ejercicio.png)

El listado de productos deberá estar gestionado por un useReducer, de igual manera que hemos hecho en el componente TodoList. Puedes apoyarte en ese código para realizar el ejercicio.

Al final de la lista de productos habrá una suma del total de los importes, esta suma deberás calcularla mediante un React.useMemo, que permitirá que optimices este cálculo y sólo lo realices si cambia la lista de productos.

Fíjate que también hay un botón para eliminar los productos de la lista. Si has implementado todo correctamente, al eliminar el producto la suma se volverá a calcular.

¡Mucho ánimo!

Recuerda que el código que hemos visto durante los vídeos puedes encontrarlo en el siguiente repositorio:

<https://github.com/The-Valley-School/react-s7-usememo-useducer>