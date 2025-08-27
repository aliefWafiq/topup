// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faCreditCard, faBasketShopping, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getJumlahTransaksi, getJumlahUser } from "@/lib/data";
import data from "@/app/(dashboard)/admin/data.json";

export default async function Page() {
  const url = `https://api.tokovoucher.net/member?member_code=${process.env.MEMBER_CODE}&signature=${process.env.SIGNATURE_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const saldo = json.data.saldo;

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex gap-4 py-4 md:gap-6 md:py-6">
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
                <h1 className="text-3xl font-bold">
                  {getJumlahTransaksi()}
                </h1>
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
                <h1 className="text-3xl font-bold">
                  {getJumlahUser()}
                </h1>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={data}/>
          </div>
        </div>
      </div>
    </>
  );
}
