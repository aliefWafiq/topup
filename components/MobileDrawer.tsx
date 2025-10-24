import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function MobileDrawer({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`fixed flex flex-col justify-center items-center z-50 top-0 right-0 h-screen w-full bg-white text-black transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button className="absolute right-7 top-4 p-3" onClick={onClose}>
        <FontAwesomeIcon className="text-5xl" icon={faXmark} />
      </button>
      {children}
    </div>
  );
}