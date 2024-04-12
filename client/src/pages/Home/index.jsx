import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import HomeContent from "./HomeContent";

function Home() {
  return (
    <main id="home">
      <Navbar />
      <Sidebar />
      <HomeContent />
    </main>
  );
}

export default Home;
