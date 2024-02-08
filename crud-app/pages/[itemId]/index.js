import ItemDetail from "../../components/items/ItemDetail";
import { connectToDatabase } from "../../lib/db";
import { ObjectId } from "bson";

function ItemDetails(props) {
  // Display basic Item detail card without edit/delete buttons
  return (
    <>
      <h1>Item Details</h1>
      <ItemDetail
        title={props.itemData.title || ""}
        description={props.itemData.description}
        quantity={props.itemData.quantity}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const itemId = context.params.itemId;

  const client = await connectToDatabase();
  const db = client.db();

  const itemsCollection = db.collection("items");

  const selectedItem = await itemsCollection.findOne({
    _id: new ObjectId(itemId),
  });

  return {
    props: {
      itemData: {
        id: selectedItem._id.toString(),
        title: selectedItem.title,
        description: selectedItem.description,
        quantity: selectedItem.quantity,
      },
    },
  };
}

export default ItemDetails;
