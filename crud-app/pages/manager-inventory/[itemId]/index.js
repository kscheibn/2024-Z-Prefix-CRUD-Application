import ItemDetailForm from "../../../components/items/ItemDetailForm";
import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "bson";

function ManagerItemDetails(props) {
  return (
    <>
      <h1>Item Details</h1>
      <ItemDetailForm
        title={props.itemData.title}
        description={props.itemData.description}
        quantity={props.itemData.quantity}
        id={props.itemData.id}
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

// export async function getStaticPaths() {
//   const client = await connectToDatabase();
//   const db = client.db();

//   const itemsCollection = db.collection("items");

//   const items = await itemsCollection.find({}, { _id: 1 }).toArray();

//   client.close();

//   return {
//     fallback: true,
//     paths: items.map((item) => ({
//       params: { itemId: item._id.toString() },
//     })),
//   };
// }

// export async function getStaticProps(context) {
//   const itemId = context.params.itemId;

//   const client = await connectToDatabase();
//   const db = client.db();

//   const itemsCollection = db.collection("items");

//   const selectedItem = await itemsCollection.findOne({
//     _id: new ObjectId(itemId),
//   });

//   return {
//     props: {
//       itemData: {
//         id: selectedItem._id.toString(),
//         title: selectedItem.title,
//         description: selectedItem.description,
//         quantity: selectedItem.quantity,
//       },
//     },
//   };
// }

export default ManagerItemDetails;
