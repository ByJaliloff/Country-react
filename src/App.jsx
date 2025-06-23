import { Routes, Route, Navigate } from "react-router-dom";
import Title from "./components/Title";
import Main from "./components/Main";
import Details from "./pages/Details";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import RootLayout from "./layout/RootLayout";
import { DataProvider } from "./context/DataContext"; 

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/countries" />} />

        <Route path="/" element={<RootLayout />}>
          <Route
            path="countries/:region?"
            element={
              <>
                <Title />
                <Main />
              </>
            }
          />
          <Route path="details/:code" element={<Details />} />
          <Route path="*" element={<Error />} />
        </Route>

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
