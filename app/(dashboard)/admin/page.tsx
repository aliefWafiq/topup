import { ChartKeuangan } from "@/components/chart-area-interactive";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  faCreditCard,
  faBasketShopping,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getJumlahTransaksi, getJumlahUser } from "@/lib/data";
import { listDataKeuangan } from "@/lib/data";

export default async function Page() {
  const url = `https://api.tokovoucher.net/member?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const saldo = json.data.saldo;

  const data = await listDataKeuangan()

  const chartData = (data ?? []).map(item => ({
    bulan: item.periode.toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
    total: item.total,
    totalBersih: item.totalBersih,
  }))

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex gap-4 px-6 py-4 md:gap-6 md:py-6">
            <Card className="w-72">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-3xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Saldo Akun</p>
                <h1 className="text-3xl font-bold">
                  Rp. {saldo.toLocaleString("id-ID")}
                </h1>
              </CardContent>
            </Card>
            <Card className="w-72">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faBasketShopping}
                    className="text-3xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Jumlah Transaksi</p>
                <h1 className="text-3xl font-bold">{getJumlahTransaksi()}</h1>
              </CardContent>
            </Card>
            <Card className="w-72">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-3xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Jumlah User</p>
                <h1 className="text-3xl font-bold">{getJumlahUser()}</h1>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4 p-5 md:gap-6 md:py-6 border-2 rounded-lg">
            <ChartKeuangan chartData={chartData}/>
          </div>
        </div>
      </div>
    </>
  );
}
