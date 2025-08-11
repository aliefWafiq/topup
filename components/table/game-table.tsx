import { Games } from "@/types/game";
import Image from "next/image";

const GamesTable = async () => {
  const url = `https://api.tokovoucher.net/member/produk/operator/list?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}&id=1`;
  const res = await fetch(url);
  const json = await res.json();
  const games = await json.data;

  if (!games?.length) return <h1 className="text-xl">No User Found</h1>;

  return (
    <table className="w-full bg-white mt-14">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6">Icon</th>
          <th className="py-3 px-6 text-center text-sm">Id Jenis</th>
          <th className="py-3 px-6 text-center text-sm">Nama Game</th>
          <th className="py-3 px-6 text-center text-sm">Status</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game: Games) => (
          <tr key={game.id} className="border-b-2 border-gray-100">
            <td className="py-3 px-6 w-44">
              <Image
                width={200}
                height={200}
                src={game.logo || "/avatar.jpg"}
                alt="game.nama"
              />
            </td>
            <td className="py-3 px-6 text-center">{game.id}</td>
            <td className="py-3 px-6 text-center">{game.nama}</td>
            <td className="py-3 px-6 text-center">
              {Number(game.status) === 1 ? (
                <p className="bg-green-400 rounded-md py-3 font-semibold text-white">Aktif</p>
              ) : (
                <p className="bg-red-400 rounded-md py-3 font-semibold text-white">Tidak Aktif</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GamesTable;
