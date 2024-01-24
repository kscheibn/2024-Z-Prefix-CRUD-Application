import { useRouter } from "next/router";

import classes from "./ItemDetail.module.css";

import Card from "../ui/Card";

function ItemDetail(props) {
  const router = useRouter();

  // Send user back to "All Items" page if they click the "Back" button
  function backButtonHandler(event) {
    event.preventDefault();

    router.push("/");
  }

  // Return item details card component
  return (
    <Card>
      <div className={classes.content}>
        <h2>{props.title}</h2>
      </div>
      <div className={classes.description}>
        <p>{props.description}</p>
      </div>
      <div className={classes.content}>
        <h3>Quantity: {props.quantity}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={backButtonHandler}>Back</button>
      </div>
    </Card>
  );
}

export default ItemDetail;
