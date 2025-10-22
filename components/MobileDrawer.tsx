import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
      <ul className="flex flex-col justify-center items-center space-y-4">
        <li className="text-3xl hover:text-blue-900 hover:font-semibold">
          <Link href="/">Home</Link>
        </li>
        <li className="text-3xl hover:text-blue-900 hover:font-semibold">
          <Link href="/">Games</Link>
        </li>
        <li className="text-3xl hover:text-blue-900 hover:font-semibold">
          <Link href="/">Promo</Link>
        </li>
        <li className="mt-4">
          <Link
            href="/register"
            className={`border border-black text-3xl px-4 py-2 rounded-lg transition-colors `}
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
}
