import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../../lib/db";

import ItemList from "../../components/items/ItemList";

function ManagerInventoryPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Prevent unauthenticated users from accessing this page
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  // Displaying loading page while above getSession() logic is executed
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Return the manager's inventory
  return (
    <>
      <h1>My Inventory</h1>
      <ItemList items={props.items} />
    </>
  );
}

export async function getServerSideProps(context) {
  // retrieve current user
  const session = await getSession(context);
  const user = session.user.name;

  // retrive user's items from items collection
  const client = await connectToDatabase();
  const db = client.db();
  const itemsCollection = db.collection("items");

    //filter items to include only those submitted by current user
  const items = await itemsCollection.find({user: user}).toArray();
  client.close();

  // sent item props to ItemList component
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

export default ManagerInventoryPage;
