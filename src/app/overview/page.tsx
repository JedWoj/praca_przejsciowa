import ControlPanel from "../_components/ControlPanel";
import DisplayedModal from "../_components/DisplayedModal";

export default function Overview() {
  return (
    <main className="overflow-hidden">
      <ControlPanel>
        <DisplayedModal />
      </ControlPanel>
    </main>
  );
}