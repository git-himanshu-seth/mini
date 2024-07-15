import "./App.css";
import Navbar from "./components/Header";
import Loader from "./components/Loade";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes/routes";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigation = useNavigate();
  const location = useLocation();
  const params = useParams();
  const handleRoutesMap = () =>
    routes.map(({ path, Element }, index) => (
      <Route
        path={path}
        element={
          <Element
            navigation={navigation}
            location={location}
            params={params}
          />
        }
        key={`route-${index}`}
      />
    ));

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>
        <Navbar navigation={navigation} location={location} params={params} />
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>{routes && routes.length > 0 && handleRoutesMap()}</Routes>
      </Suspense>
    </>
  );
}

export default App;
