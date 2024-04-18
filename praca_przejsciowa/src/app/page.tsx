import { initializeApp } from "firebase/app";
import { getDataFromDB } from "./api/db-actions";
import ControlPanel from "./components/ControlPanel";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

export default async function Home() {
  const data = await getDataFromDB("/items");

  return (
    <main className="h-screen overflow-hidden">
      <ControlPanel data={data.val()} />
    </main>
  );
}
