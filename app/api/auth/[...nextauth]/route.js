

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const authOptions = {
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user
                }
                return null

            }
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }