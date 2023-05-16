import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col items-center p-10 bg-white justify-center w-full">
      <h1 className="text-black mb-10 text-5xl">가위바위보</h1>
      <div className="flex gap-10">
        <Link className="text-black text-4xl" href={"/"}>
          메인
        </Link>
        <Link className="text-black text-4xl" href={"/stats"}>
          통계
        </Link>
      </div>
    </div>
  );
}
