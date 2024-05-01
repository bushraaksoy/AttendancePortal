import { Route, Routes } from "react-router-dom";
import { adminRoutes, publicRoutes, userRoutes } from "./routes";
import PrivateRoutes from "./PrivateRoutes";

const CustomRoutes = () => {
  // create adminRoutes and userRoutes, and map using PrivateRoutes allowing specified users.

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.id} path={route.path} element={<route.element />} />
      ))}
      <Route element={<PrivateRoutes roles={["TEACHER", "STUDENT"]} />}>
        {userRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
      </Route>
      <Route element={<PrivateRoutes roles={["ADMIN"]} />}>
        {adminRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
