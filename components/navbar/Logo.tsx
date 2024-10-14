import Link from "next/link";
import { MdDiversity3 } from "react-icons/md";

export default function Logo() {
  return (
    <div className="bg-primary flex items-center justify-center h-12 w-12 rounded-md">
      <Link href={"/"} className="text-4xl text-white ">
        <MdDiversity3 />
      </Link>
    </div>
  );
}
