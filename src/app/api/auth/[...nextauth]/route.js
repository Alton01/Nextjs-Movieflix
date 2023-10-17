import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

const authOptions = {
    providers : [
        GithubProvider ({
            clientId: 'Iv1.6552e2b3e22269c7',
            clientSecret: '82958d7f9207e4e92da07e64100999da04a5b8ef'
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session?.user?.name.split("").join("").toLocaleLowerCase();

            session.user.uid = token.sub

            return session
        },
    },
    secret : "key_secret_key"
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }