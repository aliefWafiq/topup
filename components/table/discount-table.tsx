import { getDiscounts } from "@/lib/data";
import clsx from "clsx";
import { DeleteButton, EditButton } from "@/components/button";
import { DeleteDiscount } from "@/lib/action";

const berlaku = (date: Date) => {
  const tgl = new Date(date);
  return tgl.toLocaleDateString("id-ID");
};

const DiscountTable = async () => {
  let discount = (await getDiscounts()) ?? [];

  if (!discount?.length) return <h1 className="text-xl">No Data Found</h1>;

  return (
    <table className="w-full bg-white mt-4 rounded-lg">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Id Discount</th>
          <th className="py-3 px-6 text-left text-sm">Nama Diskon</th>
          <th className="py-3 px-6 text-left text-sm">Kode Diskon</th>
          <th className="py-3 px-6 text-left text-sm">Persentase</th>
          <th className="py-3 px-6 text-left text-sm">Berlaku Hingga</th>
          <th className="py-3 px-6 text-left text-sm">Status</th>
          <th className="py-3 px-6 text-left text-sm">Action</th>
        </tr>
      </thead>
      <tbody>
        {discount.map((discount, i) => (
          <tr key={discount.id}>
            <td className="py-3 px-6">{discount.id}</td>
            <td className="py-3 px-6">{discount.nama_diskon}</td>
            <td className="py-3 px-6">{discount.kode_diskon}</td>
            <td className="py-3 px-6">{discount.persentase}</td>
            <td className="py-3 px-6">{berlaku(discount.berlaku_hingga)}</td>
            <td className="p-2">
              <p
                className={clsx(discount.status, {
                  "bg-red-500 text-white text-center py-3 px-3 rounded-xl":
                    discount.status === false,
                  "bg-blue-600 text-white text-center py-3 px-3 rounded-xl":
                    discount.status === true,
                })}
              >
                {discount.status === true ? "Aktif" : "Tidak aktif"}
              </p>
            </td>
            <td className="flex p-2 space-x-2">
              <DeleteButton id={discount.id} deleteAction={DeleteDiscount} />
              <EditButton/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiscountTable;
