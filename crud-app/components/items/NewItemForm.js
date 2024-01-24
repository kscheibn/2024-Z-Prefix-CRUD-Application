import { useRef } from "react";
import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./NewItemForm.module.css";

// call create-item api when form is submitted
async function createItem(title, description, quantity) {
  const response = await fetch("/api/item/create-item", {
    method: "POST",
    body: JSON.stringify({ title, description, quantity }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  // Throw error if create new item fails
  if (!response.ok) {
    throw new Error(data.message || "Could not create new item.");
  }
}

function NewItemForm() {
  // create reference variables to store user input upon form submission
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();

  const router = useRouter();

  // call createItem() method to access create-item api when form is submitted 
  async function submitHandler(event) {
    event.preventDefault(); // prevent auto redirect

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;

    try {
      const result = await createItem(
        enteredTitle,
        enteredDescription,
        enteredQuantity
      );

      router.replace("/manager-inventory");
    } catch (error) {
      console.log(error);
    }
  }

  // return Create New Item form
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Item Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" required id="quantity" ref={quantityInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Item</button>
        </div>
      </form>
    </Card>
  );
}

export default NewItemForm;
