import { ChartKeuangan } from "@/components/chart-area-interactive";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  faCreditCard,
  faBasketShopping,
  faUsers,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getJumlahTransaksi, getJumlahUser } from "@/lib/data";
import { listDataKeuangan } from "@/lib/data";
import ExportButton from "@/components/button";
import { checkSaldo } from "@/lib/data";

export default async function Page() {
  const saldo = await checkSaldo();
  const data = await listDataKeuangan();

  const chartData = (data ?? []).map((item) => ({
    bulan: item.periode.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    }),
    total: item.total,
    totalBersih: item.totalBersih,
  }));

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 py-4 md:gap-6 md:py-6">
            <Card className="w-full md:w-96">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-2xl bg-slate-100 p-3 rounded-xl"
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
            <Card className="w-full md:w-96">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faBasketShopping}
                    className="text-2xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Jumlah Transaksi</p>
                <h1 className="text-3xl font-bold">{getJumlahTransaksi()}</h1>
              </CardContent>
            </Card>
            <Card className="w-full md:w-96">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-2xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Jumlah User</p>
                <h1 className="text-3xl font-bold">{getJumlahUser()}</h1>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    className="text-3xl bg-slate-100 p-3 rounded-xl"
                  />
                  <p className="ml-4">Data Keuangan</p>
                </div>
                <div>
                  <ExportButton data={data || []} fileName={"Data Keuangan"} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartKeuangan chartData={chartData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
