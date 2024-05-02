import { initializeApp } from "firebase/app";
import { getDataFromDB } from "./_actions/db-actions";
import ControlPanel from "./_components/ControlPanel";
import ModalContext from "./_context/ModalContext";
import Modal from "./_components/Modal";
import ChangeItemValue from "./_components/RemoveItemModal";

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
      <ModalContext>
        <ControlPanel data={data.val()}>
          <Modal>
            <ChangeItemValue />
          </Modal>
        </ControlPanel>
      </ModalContext>
    </main>
  );
}
