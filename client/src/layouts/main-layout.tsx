import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main>
      <h2>Layout</h2>
      <Outlet />
    </main>
  );
}
