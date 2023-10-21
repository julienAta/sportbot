import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import AskQuestion from "@/components/askQuestion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

export default async function Home() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const user = await currentUser();
  return (
    <main className="flex flex-wrap my-10 justify-center items-center lg:p-24 p-3">
      <div className="flex justify-center text-center h-screen min-w-full">
        <Card className="lg:p-10 lg:w-2/3  w-full h-4/5 lg:h-4/6">
          <CardHeader>
            <CardTitle> Hello {user?.lastName}</CardTitle>
            <CardDescription>Ask a question to the sport bot</CardDescription>
          </CardHeader>

          <div className="flex justify-center  ">
            <div className="w-full ">
              <AskQuestion />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
