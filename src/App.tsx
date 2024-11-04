import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="min-h-screen bg-themeBg flex flex-col justify-between relative overflow-hidden z-0">
      <div
        className="absolute top-0 right-[-100px] h-full w-[30%] bg-red-500 rounded-[20rem] rotate-[-12deg]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0) 100%)",
          filter: "blur(60px)",
          WebkitFilter: "blur(60px)",
        }}
      ></div>

      <Header />
      <main className="flex-1 mb-[80px] px-[100px] z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
