
import { auth } from "@/auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faMoneyBillWave, faGamepad } from "@fortawesome/free-solid-svg-icons"

const Dashboard = async () => {
  const session = await auth();
  return (
    <div className="max-w-screen-xl mx-auto py-8 p-4">
      <h1 className="text-2xl">Dashboard</h1>
      <h2 className="text-xl">
        Welcome Back: <span className="font-bold">{session?.user?.name}</span>
      </h2>
      <div className="space-x-3 w-full h-fit my-5 flex flex-wrap">
        <Link className="bg-green-400 w-1/5 h-44 rounded-xl text-2xl font-bold text-white flex-col flex justify-center items-center" href="/list-transaksi">
          <FontAwesomeIcon icon={faMoneyBillWave} size="2xl" />          
          Transactions
        </Link>
        <Link className="bg-blue-400 w-1/5 h-44 rounded-xl text-2xl font-bold text-white flex-col flex justify-center items-center" href="/users">
          <FontAwesomeIcon icon={faUser} size="2xl" />
          Users
        </Link>
        <Link className="bg-red-600 w-1/5 h-44 rounded-xl text-2xl font-bold text-white flex-col flex justify-center items-center" href="/games">
          <FontAwesomeIcon icon={faGamepad} size="2xl" />
          Games
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
