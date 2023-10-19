import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import AskQuestion from "@/components/askQuestion";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const user = await currentUser();
  return (
    <main className="flex flex-wrap my-10 items-center p-24">
      <div className="w-full flex justify-center my-10 text-3xl font-semibold">
        Hello {user?.lastName}, Ask a question to the sport bot
      </div>

      <div className="flex justify-center m-auto space-x-10">
        <div className="w-full ">
          <AskQuestion />
        </div>
      </div>
    </main>
  );
}
