import Nav from "./Nav";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <>
      <Image
        className="background"
        alt="beautiful abstract background"
        src="/bg.jpg"
        width={2048}
        height={1152}
      />
      <Nav />
      <main>{children}</main>
    </>
  );
}
