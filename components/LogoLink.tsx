import Link from "next/link";

export default function LogoLink() {
  return (
    <div className="mb-4 text-center sm:mb-0">
      <Link
        href="/"
        className={`text-2xl font-bold transition-colors duration-300 text-white`}>
        TopUpID
      </Link>
    </div>
  );
}
