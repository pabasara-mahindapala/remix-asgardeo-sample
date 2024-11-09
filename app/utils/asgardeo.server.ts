import { Authenticator } from "remix-auth";
import { AsgardeoStrategy } from "remix-auth-asgardeo";
import { createCookieSessionStorage } from "@remix-run/node";

type User = {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    accessToken: string;
};

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
        scope: "openid profile email internal_login",
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
        return {
            id: profile.id,
            email: profile?._json?.email ?? "",
            firstName: profile._json?.given_name ?? "",
            lastName: profile._json?.family_name ?? "",
            accessToken: accessToken,
        } as User;
    }
);

authenticator.use(asgardeoStrategy);

export let { getSession, commitSession, destroySession } = sessionStorage;