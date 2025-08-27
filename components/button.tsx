"use client";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { signOut } from "next-auth/react";

const initialState = {
  message: "",
};

interface GenericDeleteButtonProps {
  id: string
  deleteAction: (id: string) => Promise<{ message: string }>
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

export const DeleteButton = ({ id, deleteAction }: GenericDeleteButtonProps) => {
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
