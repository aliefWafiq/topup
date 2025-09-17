"use client";
import { useFormStatus } from "react-dom";
import { useActionState, useTransition } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { buttonVariants } from "./ui/button";
import { PaymentLinkMidtrans } from "@/lib/action";

const initialState = {
  message: "",
};

interface GenericDeleteButtonProps {
  id: string;
  deleteAction: (id: string) => Promise<{ message: string }>;
}

export const SubmitButton = ({
  label,
  onCLick,
}: {
  label: string;
  onCLick?: () => void;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600 hover:cursor-pointer",
        {
          "opacity-50 cursor-progress": pending,
        }
      )}
      type="submit"
      disabled={pending}
      onClick={onCLick}
    >
      {label === "submit" ? (
        <>{pending ? "Submitting..." : "Submit"}</>
      ) : (
        <>{pending ? "Updating" : "Update"}</>
      )}
    </button>
  );
};

export const CheckOut = ({ onClick }: { onClick?: () => void }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600 hover:cursor-pointer",
        {
          "opacity-50 cursor-progress": pending,
        }
      )}
      type="button"
      disabled={pending}
      onClick={onClick}
    >
      <>{pending ? "Checkout..." : "Checkout"}</>
    </button>
  );
};

export const PaymentLink = ({transaksi, status}: {transaksi:any, status: string}) => {
  let [ispending, startTransition] = useTransition()

  const handlePayment = () => {
    startTransition(async() => {
      const res = await PaymentLinkMidtrans(transaksi)
    })
  }

  if(status !== 'PENDING'){
    return <p className="bg-blue-400 px-4 py-2 text-sm text-white rounded-lg">Lunas</p>
  }

  return (
    <button
      onClick={handlePayment}
      disabled={ispending}
      className="bg-blue-600 px-4 py-2 text-sm text-white rounded-lg cursor-pointer hover:bg-blue-700"
    >
      {ispending ? 'Processing..' : "Bayar"}
    </button>
  )
}

// export const PaymentLink = ({
//   onClick,
//   status,
// }: {
//   onClick?: () => void;
//   status: string;
// }) => {
//   let statusPembayaran = ""
//   if(status !== "COMPLETED"){
//     statusPembayaran = "Bayar"
//   }else{
//     statusPembayaran = "Lunas"
//   }
//   return (
//     <button
//       className={clsx(
//         "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600 hover:cursor-pointer",
//         {
//           "opacity-50 cursor-none": "Sudah di bayar",
//         }
//       )}
//     >
//       {status ? "Lunas" : "Bayar"}
//     </button>
//   );
// };

export const EditButton = () => {
  return (
    <Link
      href={""}
      className="text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600
        text-center px-5 py-3 cursor-pointer"
    >
      Edit
    </Link>
  );
};

const LayoutDeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`text-sm bg-red-500 text-white rounded-md text-center px-5 py-3 cursor-pointer 
        ${pending ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
    >
      {pending ? "Deleting" : "Delete"}
    </button>
  );
};

export const DeleteButton = ({
  id,
  deleteAction,
}: GenericDeleteButtonProps) => {
  const [state, formAction] = useActionState(
    deleteAction.bind(null, id),
    initialState
  );

  return (
    <form action={formAction}>
      <LayoutDeleteButton />
    </form>
  );
};

export const LogoutButton = () => {
  const pending = useFormStatus();

  return (
    <>
      <button
        className={clsx(
          "bg-red-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-red-600 hover:cursor-pointer",
          {
            "opacity-50 cursor-progress": !pending,
          }
        )}
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </button>
    </>
  );
};
