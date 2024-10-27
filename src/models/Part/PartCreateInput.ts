import { z } from "zod";
import { PartSchema } from "./Part";
import { Prisma } from "@prisma/client";

export const PartCreateInputSchema =
  PartSchema satisfies z.Schema<Prisma.PartCreateInput>;
