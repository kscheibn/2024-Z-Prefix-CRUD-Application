import classes from './Card.module.css';

// create a Card layout element to display items
function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;