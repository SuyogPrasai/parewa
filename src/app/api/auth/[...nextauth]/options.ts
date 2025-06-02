import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect(); // Ensure DB connection

                try {
                    // Find user by email or username
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ],
                    });

                    if (!user) {
                        throw new Error('No user found with this email');
                    }

                    // Check if user is verified
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');

                    }

                    // Compare passwords
                    const isMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isMatch) {
                        // Return the user object without sensitive data
                        return user;
                    } else {
                        // Return null instead of throwing an error
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    // Log the error for debugging
                    console.error("Authorization error:", error.message);
                    // Return null to indicate failure
                    throw new Error(error);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
        error: "/signin", // Redirect to sign-in page on errors
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};