import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800 text-white p-4">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mx-auto w-10/12 max-w-xl md:max-w-6xl mt-10 p-10 bg-white shadow-md rounded-lg">
        <Outlet />
      </main>
    </>
  );
}
