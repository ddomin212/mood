import { prisma } from "@/prisma/connector";
import { getUserByClerkId } from "@/prisma/getUser";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { analyzeEntry } from "../_utils/ai";

export const POST = async () => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vitae arcu. Integer imperdiet lectus quis justo. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Curabitur sagittis hendrerit ante. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Etiam egestas wisi a erat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Nulla est. Mauris elementum mauris vitae tortor. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.

      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Etiam neque. Aliquam erat volutpat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. In rutrum. Fusce tellus. Integer tempor. Aliquam erat volutpat. Aenean placerat. Pellentesque ipsum. Morbi scelerisque luctus velit. Aliquam erat volutpat. Nam sed tellus id magna elementum tincidunt.`,
    },
  });

  const analysis = await analyzeEntry(entry);
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};
