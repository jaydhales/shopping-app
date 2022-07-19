import { useState } from "react";
import "./styles.css";

export default function App() {
  const [quantityInput, setQuantity] = useState("");
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [list, setList] = useState([
    {
      itemName: "Dummy",
      quantity: 2,
      price: 500
    }
  ]);

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
      price: priceInput
    };

    list.length > 0 ? setList([...list, entry]) : setList([entry]);
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
            list.map(({ itemName, quantity, price }) => (
              <div key={itemName} className="listItems">
                <input type="checkbox" onChange={console.log(this)} />
                <div>
                  <p>{itemName}</p>
                  <p>
                    ${price} x {quantity}
                  </p>
                </div>
                <button>X</button>
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
