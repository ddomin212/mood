import React from "react";
import { prisma } from "@/prisma/connector";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {};

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

async function NewUser({}: Props) {
  await createNewUser();
  return <div>Loading...</div>;
}

export default NewUser;
