import { useRouter } from "next/router";
import { useRef, useState } from "react";

import classes from "./ItemDetailForm.module.css";

import Card from "../ui/Card";

// access the delete-item api whenever "Delete" is clicked
async function deleteItem(itemId) {
  const response = await fetch("/api/item/delete-item", {
    method: "DELETE",
    body: JSON.stringify({ itemId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(data.message || "Could not delete item.");
  }
}

// access the edit-item api to edit item data
async function editItem(itemId, newTitle, newDescription, newQuantity) {
  // use edit-item api to process request
  const response = await fetch("/api/item/edit-item", {
    method: "PATCH",
    body: JSON.stringify({ itemId, newTitle, newDescription, newQuantity }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  // throw error if item could not be edited
  if (!response.ok) {
    throw new Error(data.message || "Could not edit item");
  }
}

function ItemDetailForm(props) {
  // isEditing is a flag to show whether form is in "Edit" or "Read Only" mode
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  // Create reference vars to store user input
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();

  // Toggle isEditing whenever "Edit"/"Save" button is pressed
  function switchEditModeHandler() {
    setIsEditing(!isEditing);
  }

  // Call delete-item api when "Delete" button pressed
  async function deleteHandler() {
    try {
      const result = await deleteItem(props.id);
      router.replace("/manager-inventory");
    } catch (error) {
      console.log(error);
    }
  }

  // Call edit-item api when "Save" is pressed
  async function submitHandler(event) {
    event.preventDefault(); // prevent auto-redirect

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;

    try {
      const result = await editItem(
        props.id,
        enteredTitle,
        enteredDescription,
        enteredQuantity
      );
    } catch (error) {
      return console.log(error);
    }

    setIsEditing(false); // Toggle back to "Read Only" mode
  }

  // Return editable Item Details Form. Inputs fields use readOnly property to toggle editing
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={isEditing ? classes.control : classes.content}>
          <label htmlFor="description">Item Name</label>
          <input
            type="text"
            required
            id="title"
            ref={titleInputRef}
            readOnly={!isEditing}
            defaultValue={props.title}
          />
        </div>
        <div className={isEditing ? classes.control : classes.content}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
            readOnly={!isEditing}
            defaultValue={props.description}
          ></textarea>
        </div>
        <div className={isEditing ? classes.control : classes.content}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            required
            id="quantity"
            ref={quantityInputRef}
            readOnly={!isEditing}
            defaultValue={props.quantity}
          />
        </div>
        <div className={classes.actions}>
          {isEditing && <button type="submit">Save</button>}
          {!isEditing && (
            <button type="button" onClick={switchEditModeHandler}>
              Edit
            </button>
          )}
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </form>
    </Card>
  );
}

export default ItemDetailForm;
