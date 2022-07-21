import { useState } from "react";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import "./styles.css";

const db = new Dexie("ShoppingList");
db.version(1).stores({ item: "++id,name,quantity,price,isPurchased" });

export default function App() {
  const [quantityInput, setQuantity] = useState("");
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const list = useLiveQuery(() => db.item.toArray(), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    clearForm();
    addItemToDb();
  };

  const clearForm = () => {
    setName("");
    setQuantity("");
    setPrice("");
  };

  const addItemToDb = async () => {
    await db.item.add({
      name: nameInput,
      quantity: quantityInput,
      price: priceInput,
      isPurchased: false
    });
  };

  const handleCheckbox = async (e) => {
    const id = Number(e.target.parentNode.id);

    if (e.target.checked) {
      await db.item.update(id, {
        isPurchased: true
      });
    } else {
      await db.item.update(id, {
        isPurchased: false
      });
    }
  };

  const removeItem = async (e) => {
    const id = Number(e.target.parentNode.id);

    await db.item.delete(id);
  };

  if (!list) return null;

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
            list.map(({ name, quantity, price, isPurchased, id }) => (
              <div
                key={id}
                id={id}
                className={isPurchased ? "listItems isPurchased" : "listItems"}
              >
                <input type="checkbox" onChange={handleCheckbox} />
                <div>
                  <p>{name}</p>
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
