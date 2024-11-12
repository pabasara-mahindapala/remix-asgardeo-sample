import { useEffect, useState } from "react";
import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/asgardeo.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const isLoggedIn = !!user;
  if (!isLoggedIn) {
    return redirect("/login");
  }
  const ASGARDEO_SCIM_ME_URL = process.env.ASGARDEO_SCIM_ME_URL;
  return { user, ASGARDEO_SCIM_ME_URL };
};

interface UserDetails {
  id: string;
  emails: string[];
  name: {
    givenName: string;
    familyName: string;
  };
}

export default function Index() {
  const { user, ASGARDEO_SCIM_ME_URL } = useLoaderData<typeof loader>();

  const [scimUser, setScimUser] = useState<UserDetails>({} as UserDetails);

  useEffect(() => {
    fetchProtectedData();
  }, []);

  const fetchProtectedData = async () => {
    if (!user?.accessToken) {
      console.error('Access token not found');
      return;
    }

    try {
      fetch(ASGARDEO_SCIM_ME_URL, {
        method: 'GET',
        headers: {
          "Accept": "application/scim+json",
          "Content-Type": "application/scim+json",
          "Authorization": `Bearer ${user?.accessToken}`,
        },
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch protected data');
        }

        const data = await response.json();
        setScimUser(data);
      });
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  if (!user || !scimUser?.id) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-9">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            User Profile
          </p>
          <div className="flex flex-col gap-3">
            <p>
              <strong>Email:</strong> {scimUser?.emails ? scimUser.emails[0] : ''}
            </p>
            <p>
              <strong>First Name:</strong> {scimUser?.name?.givenName}
            </p>
            <p>
              <strong>Last Name:</strong> {scimUser?.name?.familyName}
            </p>
          </div>
        </nav>
        <div>
          <Form action="/auth/logout" method="post">
            <button className="m-4 p-2 cursor-pointer border-2 rounded-lg">Logout</button>
          </Form>
        </div>
      </div>
    </div>
  );
}