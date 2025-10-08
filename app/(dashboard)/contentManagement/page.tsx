import { ChartKeuangan } from "@/components/chart-area-interactive";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  // faCreditCard,
  faImages,
  // faUsers,
  // faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getJumlahTransaksi, getJumlahUser } from "@/lib/data";
// import { listDataKeuangan } from "@/lib/data";
// import ExportButton from "@/components/button";
// import { checkSaldo } from "@/lib/data";

export default async function ContentManagementPage() {

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 px-6">
          <div className="flex gap-4 py-4 md:gap-6 md:py-6">
            <Card className="w-72">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faImages}
                    className="text-2xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="font-bold text-2xl">Banner</h1>
              </CardContent>
            </Card>
            <Card className="w-72">
              <CardHeader>
                <CardTitle>
                  <FontAwesomeIcon
                    icon={faImages}
                    className="text-2xl bg-slate-100 p-3 rounded-xl"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="font-bold text-2xl">Card Rekomendasi</h1>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
