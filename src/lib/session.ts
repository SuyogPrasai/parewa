import 'server-only';
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || '');

export const cookie = {
    name: 'signup-session',
    options: { httpOnly: true, secure: false, sameSite: 'lax' as const, path: '/' }, // Set secure: false for local testing
    duration: 1000 * 5 * 60
};

export async function encrpt(payload: any) {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime('5min')
        .sign(key);
    console.log("Generated JWT Token:", token);
    return token;
}

export async function decrypt(session: any) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256']
        });
        return payload;
    } catch (error) {
        console.log("Error decrypting session:", error);
        return null;
    }
}

export async function createSignUpSession(email: string) {
    try {
        const expires = new Date(Date.now() + cookie.duration);
        const verify_email = false;
        const verify_otp = false;
        const set_password = false;

        const session = await encrpt({ email, expires, verify_email, verify_otp, set_password });

        const cookieStore = await cookies();  // Await cookies() once
        cookieStore.set(cookie.name, session, { ...cookie.options, expires });

        console.log("Successfully created signup cookie");
        console.log("Set-Cookie Header:", cookieStore.toString()); 
    } catch (error) {
        console.log("Error creating signup cookie", error);
    }
}

export async function updateSignUpSession(updateData: Partial<{ verify_email: boolean; verify_otp: boolean; set_password: boolean }>) {
    try {
        const cookieStore = await cookies();
        const _cookie = cookieStore.get(cookie.name)?.value;
        const session = await decrypt(_cookie);

        if (!session?.email) {
            console.log("No session found or session is invalid");
            return;
        }

        const updatedSession = {
            ...session,
            ...updateData,
            expires: new Date(Date.now() + cookie.duration),
        };

        const newToken = await encrpt(updatedSession);
        cookieStore.set(cookie.name, newToken, { ...cookie.options, expires: updatedSession.expires });

        console.log("Successfully updated signup cookie");
    } catch (error) {
        console.log("Error updating signup cookie", error);
    }
}

export async function deleteSignUpSession() {
    try {
        const cookieStore = await cookies();  // Await cookies() once
        cookieStore.delete(cookie.name);
        console.log("Successfully deleted signup cookie");
    } catch (error) {
        console.log("Error deleting signup cookie", error);
    }
}
