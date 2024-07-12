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
function App() {
  const navigation = useNavigate();
  const location = useLocation();
  const params = useParams();
  const handleRoutesMap = () =>
    routes.map(({ path, Element }, index) => (
      <Route
        path={path}
        // pass the navigation and location for future use
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
      <Navbar navigation={navigation} location={location} params={params} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* <Route path="/" element={<LoginAndSignUp />} /> */}
          {routes && routes.length > 0 && handleRoutesMap()}
          {/* <LoginAndSignUp />
        <DepartmentManager /> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
