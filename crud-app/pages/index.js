import ItemList from "../components/items/ItemList";
import { connectToDatabase } from "../lib/db";

function HomePage(props) {
  return (
    <>
      <main>
        <h1>Global Inventory</h1>
        <ItemList items={props.items} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase();

  const db = client.db();

  const itemsCollection = db.collection("items");

  const items = await itemsCollection.find().toArray();

  client.close();

  return {
    props: {
      items: items.map((item) => ({
        title: item.title,
        description: item.description,
        quantity: item.quantity,
        id: item._id.toString(),
      })),
    },
  };
}

export default HomePage;
