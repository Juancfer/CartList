import React from "react";
import "./CartList.css"

const initialValue = {
    product: [], 
    lastProductCreated: 0,
    totalPrice: 0,
};

const reducer = (state, action) => {
    const newState = {...state};

    switch(action.type) {
        case "ADD PRODUCT":
            const newProduct = {
                id: state.lastProductCreated + 1,
                name: action.payload.name,
                price: action.payload.price,
            };
            newState.product = [...newState.product, newProduct];
            newState.lastProductCreated = newProduct.id;
            newState.totalPrice = newState.product.reduce((prev, product) => prev + product.price, 0);
            break;

        case "DELETE PRODUCT":
            const deletedProduct = newState.product.find((product) => product.id === action.payload.id) 

            newState.product = newState.product.filter((product) => product.id !== action.payload.id);
            newState.totalPrice -= deletedProduct.price;
            break;
        default:
            console.error("ACTION TYPE NOT SUPPORTED")
    }

    return newState;
};

const CartList = () => {
    const [state, dispatch] = React.useReducer(reducer, initialValue);

    const nameRef = React.useRef(null);
    const priceRef = React.useRef(null);

    const onSubmit = React.useCallback((event) =>{
        event.preventDefault();
        const payloadToSend = {
            name: nameRef.current.value,
            price: parseFloat(priceRef.current.value),
        };
        dispatch({ type: "ADD PRODUCT", payload: payloadToSend});

        nameRef.current.value = "";
        priceRef.current.value = "";
    }, []);

    const deleteProduct = React.useCallback((productId) =>{
        const payloadToSend = {
            id: productId,
        };
        dispatch({ type: "DELETE PRODUCT", payload: payloadToSend});

    }, []);

    return(
        <div className="cartlist">
            <form onSubmit={onSubmit}>
                <input ref={nameRef} type="text" placeholder="Nombre del producto"/>
                <input ref={priceRef} type="text" placeholder="Precio del producto" />
                <button type="submit">Añadir producto</button>
            </form>

            <h4>Productos:</h4>

            <ul>
                {state.product.map((product) =>
                    <li key={product.id}>
                        {product.name} / Precio: {product.price}€ {''}
                        <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                    </li>
                )}
            </ul>
            <strong>Total: {state.totalPrice}€</strong>
        </div>
    )
}

export default CartList;