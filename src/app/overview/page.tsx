import ControlPanel from "../_components/ControlPanel";
import DisplayedModal from "../_components/DisplayedModal";

export default function Overview() {
  return (
    <main className="h-screen overflow-hidden">
      <ControlPanel>
        <DisplayedModal />
      </ControlPanel>
    </main>
  );
}
