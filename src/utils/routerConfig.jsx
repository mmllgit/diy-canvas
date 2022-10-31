import { Layout, Spin } from "@arco-design/web-react";
import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Clock = lazy(() => import("../pages/Home/Clock"));
const Ball = lazy(() => import("../pages/Home/Ball"));
const DrawBoard = lazy(() => import("../pages/Home/DrawBoard"));
const Background = lazy(() => import("../pages/Home/Background"));

const routerConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clock",
    element: <Clock />,
  },
  {
    path: "/ball",
    element: <Ball />,
  },
  {
    path: "/drawBoard",
    element: <DrawBoard />,
  },
  {
    path: "/background",
    element: <Background />,
  },
];

const Route = (table) => {
  const newRoute = [];
  table.map((route) => {
    newRoute.push({
      path: route.path,
      element: (
        <Suspense
          fallback={
            <div
              style={{
                margin: "20px 0",
                marginBottom: "20px",
                padding: "30px 50px",
                textAlign: "center",
                borderRadius: "4px",
              }}
            >
              <Spin dot />
            </div>
          }
        >
          {route.element}
        </Suspense>
      ),
      children: route.children && Route(route.children),
    });
  });
  return newRoute;
};

export default () => useRoutes(Route(routerConfig));
