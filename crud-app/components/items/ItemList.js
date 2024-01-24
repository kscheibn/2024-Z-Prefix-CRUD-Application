import { usePathname } from "next/navigation";

import Item from "./Item";
import classes from "./ItemList.module.css";

function ItemList(props) {

  // Obtain current URL path to pass as a prop to Item component
  const currentPath = usePathname();

  // return list of Item card components. include path prop so Item knows how to forward
  // user if they click on Item "Details"
  return (
    <ul className={classes.list}>
      {props.items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          quantity={item.quantity}
          path={currentPath} 
        />
      ))}
    </ul>
  );
}

export default ItemList;
