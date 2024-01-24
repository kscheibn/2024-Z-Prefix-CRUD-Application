import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./Item.module.css";

function Item(props) {
  const router = useRouter();

  const longDescription = props.description.length > 100;

  // function to redirect user to correct page if "Details" button pressed
  function showDetailsHandler() {

    // If coming from "All Items" page, direct user to generic item details
    if (props.path === "/") {
      router.push("/" + props.id); 
    } else {
      // If coming from "My Inventory" page, direct user to editable item details form
      router.push(props.path + "/" + props.id); 
    }
  }

  // return Item card with Item name, description, and quantity
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.description}>
          {longDescription && (
            <p>
              <strong>Description:</strong>{" "}
              {props.description.slice(0, 99) + "..."}
            </p>
          )}
          {!longDescription && (
            <p>
              <strong>Description:</strong> {props.description}
            </p>
          )}
        </div>
        <div className={classes.content}>
          <h3>Quantity: {props.quantity}</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Details</button>
        </div>
      </Card>
    </li>
  );
}

export default Item;
