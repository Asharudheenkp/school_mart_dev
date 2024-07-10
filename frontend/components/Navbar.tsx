import Image from "next/image";
import Link from "next/link";
import logoLight from "@/public/New Project (2).png";
import logoDark from "@/public/New Project.png";

import { DarkModeToggler } from "./DarkModeToggler";

const Navbar = () => {
  return (
    <div className="w-100">
      <nav className="w-[80%] mx-auto flex justify-between mt-10">
        <Link href={"/"}>
          <h1>
            <Image
              className="w-48 h-auto hidden dark:block"
              priority={true}
              src={logoLight}
              alt="logo"
              width={1000}
              height={1000}
            />

            <Image
              className="w-48 h-auto block dark:hidden"
              priority={true}
              src={logoDark}
              alt="logo"
              width={1000}
              height={1000}
            />


          </h1>
        </Link>

        <div className="flex gap-5 items-center">
          <Link href={"/products"}>
            <p>Products</p>
          </Link>
          <DarkModeToggler />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
