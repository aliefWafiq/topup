import type { Metadata } from "next";
import GamesTable from "@/components/table/game-table";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Games",
};

const GamesPage = () => {
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen flex justify-center py-14">
        <div className="w-full md:px-6">
          <h1 className="text-2xl font-bold">Game List</h1>
          <GamesTable />
        </div>
      </div>
    </>
  );
};

export default GamesPage;
