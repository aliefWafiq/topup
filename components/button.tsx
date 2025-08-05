"use client";
import { useFormStatus } from "react-dom";
import { clsx } from "clsx";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

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
      type="submit"
      disabled={pending}
      onClick={onClick}
    >
      <>{pending ? "Checkout..." : "Checkout"}</>
    </button>
  );
};

export const EditButton = () => {
  return (
    <Link
      href={""}
      className="py-3 text-sm bg-gray-50 rounded-bl-md hover:bg-gray-100
        text-center"
    >
      Edit
    </Link>
  );
};

export const DeleteButton = () => {
  return (
    <form
      className="y-3 text-sm bg-gray-50 rounded-bl-md hover:bg-gray-100
        text-center"
    >
      <button type="submit">delete</button>
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
