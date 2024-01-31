import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <br />
      <br />
      <br />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
