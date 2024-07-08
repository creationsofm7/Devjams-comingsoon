import "./App.css";
import CountdownTimer from "./components/countdown/countdown";
import Navbar from "./components/navbar/navbar";

function App() {
  const targetDate: string = "2024-08-31T00:00:00";

  return (
    <>
      <Navbar />
      <div className="h-screen ">
        <div className="">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </>
  );
}

export default App;
