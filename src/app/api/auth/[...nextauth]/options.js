import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

import db from "../../../../../prisma/db"



export const options = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'email',
                    placeholder: 'Digite seu e-mail'
                },
                password: {
                    label: 'Senha',
                    type: 'password',
                    placeholder: 'Digite sua senha'
                }
            },
            async authorize(credentials) {
                try {
                    console.log('credentials');
                    const foundUser = await db.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    })

                    if (foundUser) {

                        const matchPassword = await bcrypt.compare(
                            credentials.password,
                            foundUser.password
                        );

                        if (matchPassword) {
                            delete foundUser.password
                            return foundUser
                        }
                    }

                } catch (error) {
                    console.log(error)
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user && token) {
                session.user.id = parseInt(token.sub)
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
}