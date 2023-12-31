import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "./ModeToggle";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
