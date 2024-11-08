import { Authenticator } from "remix-auth";
import { AsgardeoStrategy } from "remix-auth-asgardeo";
import { createCookieSessionStorage } from "@remix-run/node";

type User = { id: string; username: string; };

export let sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: ["s3cr3t"],
        secure: process.env.NODE_ENV === "production",
    },
});

export let authenticator = new Authenticator<User>(sessionStorage);

const asgardeoStrategy = new AsgardeoStrategy(
    {
        authorizedRedirectUrl: "http://localhost:5173/auth/asgardeo/callback",
        clientID: process.env.ASGARDEO_CLIENT_ID ?? "",
        clientSecret: process.env.ASGARDEO_CLIENT_SECRET ?? "",
        baseUrl: process.env.ASGARDEO_BASE_URL ?? "",
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
        return {
            id: profile.id,
            username: profile?._json?.username ?? "",
        } as User;
    }
);

authenticator.use(asgardeoStrategy);

export let { getSession, commitSession, destroySession } = sessionStorage;