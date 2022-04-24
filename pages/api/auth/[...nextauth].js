import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          name: "Manish Sharma",
          email: "manishsharma3115@gmail.com",
        };
        return user;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
  },
});
