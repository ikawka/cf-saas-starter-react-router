import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from ".";
import { z } from "zod/v4";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello World";
  }),
});

const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findMany();
  }),
  getUsersProtected: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findMany();
  }),
  deleteUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (ctx.auth.user?.id !== input) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot delete self",
        });
      }
      return ctx.db.delete(user).where(eq(user.id, input));
    }),
});

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
