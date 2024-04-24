import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";

const CustomRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.id} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};

export default CustomRoutes;
