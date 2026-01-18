import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/connectDB";
import User from "@/backend/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider !== "google") return false;

      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      const adminEmail = process.env.ADMIN_EMAIL;

      if (!existingUser) {
        const newUser = await User.create({
          name: user.name,
          email: user.email,
          avatar: user.image,
          googleId: account.providerAccountId,
          provider: "google",
          role: user.email === adminEmail ? "admin" : "user",
        });

        user.id = newUser._id;
      } else {
        user.id = existingUser._id;
        user.role = existingUser.role;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      } else if (!token.role) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
