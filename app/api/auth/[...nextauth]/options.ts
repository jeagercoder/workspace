import bcrypt from 'bcrypt';


import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth";
import type { Adapter } from 'next-auth/adapters';



const prisma = new PrismaClient()

export const AuthOptions: NextAuthOptions = {
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _req) {
                const password = credentials?.password
                if (!password) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (user && bcrypt.compareSync(password, user.password)) {
                    return user
                }
                return null

            }
        })
    ]
}