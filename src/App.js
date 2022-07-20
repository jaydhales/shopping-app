import { useState } from "react";
import "./styles.css";

export default function App() {
  const [quantityInput, setQuantity] = useState("");
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    clearForm();
    updateList();
  };

  const clearForm = () => {
    setName("");
    setQuantity("");
    setPrice("");
  };

  const updateList = () => {
    let entry = {
      itemName: nameInput,
      quantity: quantityInput,
      price: priceInput,
      done: false
    };

    list.length > 0 ? setList([...list, entry]) : setList([entry]);
  };

  const handleCheckbox = (e) => {
    const newState = list.map((obj) => {
      if (obj.itemName === e.target.parentNode.id) {
        if (e.target.checked) {
          return { ...obj, done: true };
        } else {
          return { ...obj, done: false };
        }
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    setList(newState);
  };

  const removeItem = (e) => {
    const newState = list.filter(
      (obj) => obj.itemName !== e.target.parentNode.id
    );

    setList(newState);
  };

  return (
    <div className="App">
      <header>
        <h3>My List</h3>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameInput">
            Name of Item:
            <input
              type="text"
              id="nameInput"
              value={nameInput}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="quantityInput">
            Quantity:
            <input
              type="number"
              id="quantityInput"
              value={quantityInput}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>

          <label htmlFor="priceInput">
            Price:
            <input
              type="number"
              id="priceInput"
              value={priceInput}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>

          <input type="submit" value="Add item" />
        </form>

        <div className="list">
          <p>List of Items:</p>
          {list.length > 0 &&
            list.map(({ itemName, quantity, price, done }) => (
              <div
                key={itemName}
                id={itemName}
                className={done ? "listItems done" : "listItems"}
              >
                <input type="checkbox" onChange={handleCheckbox} />
                <div>
                  <p>{itemName}</p>
                  <p>
                    ${price} x {quantity}
                  </p>
                </div>
                <button onClick={removeItem}>X</button>
              </div>
            ))}

          <p id="totalPrice">
            Total Price:{" "}
            {list.length > 0 &&
              "$" +
                list.reduce((acc, object) => {
                  return acc + object.price * object.quantity;
                }, 0)}
          </p>
        </div>
      </main>
    </div>
  );
}
