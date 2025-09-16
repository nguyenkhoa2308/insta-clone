import Sidebar from "~/components/layout/Sidebar";
import Topbar from "~/components/layout/Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh]">
      <Topbar />
      <div className="mx-auto max-w-5xl flex">
        <main className="flex-1 flex justify-center p-3 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
