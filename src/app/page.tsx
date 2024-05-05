import ControlPanel from "./_components/ControlPanel";
import ModalContext from "./_context/ModalContext";
import DisplayedModal from "./_components/DisplayedModal";

export default async function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <ModalContext>
        <ControlPanel>
          <DisplayedModal />
        </ControlPanel>
      </ModalContext>
    </main>
  );
}
