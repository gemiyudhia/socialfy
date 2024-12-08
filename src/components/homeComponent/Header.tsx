import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center space-x-3">
      <Image
        src="/images/socialfy.png"
        alt="Socialfy logo"
        width={100}
        height={100}
        className="rounded-full"
      />
    </div>
  );
}