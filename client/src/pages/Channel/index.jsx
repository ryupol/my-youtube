import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import ChannelContent from "./ChannelContent";

function Channel() {
  return (
    <main id="channel">
      <Navbar />
      <Sidebar />
      <ChannelContent />
    </main>
  );
}

export default Channel;
