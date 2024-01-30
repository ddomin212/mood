import { auth } from "@clerk/nextjs";
import { prisma } from "./connector";

export const getUserByClerkId = async () => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });

  return user;
};
