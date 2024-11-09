# Remix Asgardeo Sample

This is a sample [Remix](https://remix.run) app that uses [Asgardeo](https://wso2.com/asgardeo/) for authentication.

## Getting Started

1. Clone this repository:

2. Sign up for a free Asgardeo account [here](https://wso2.com/asgardeo).

3. Sign into Asgardeo console and navigate to **Applications > New Application**. Select Traditional Web Application

4. Select OpenID Connect (OIDC) as the protocol and complete the wizard popup by providing a suitable name and the authorized redirect URL `http://localhost:5173/auth/asgardeo/callback` (**Note**: The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use `http://localhost:5173/auth/asgardeo/callback`, as the sample application will be accessible at this URL).

5. Once you create the application, you will be directed to the Quick Start tab of the created application which will guide you to integrate login to your application in several technologies (**Note**: Information available in the Quick Start tab of your app are required to configure Asgardeo in the Remix app).

6. Navigate to **User Management > Users** and [create a new user](https://wso2.com/asgardeo/docs/guides/users/manage-users/#onboard-users).

6. Create the .env file in the root of the project and add the environment variables as shown below:

```
ASGARDEO_CLIENT_ID=<client_id>
ASGARDEO_CLIENT_SECRET=<client_secret>
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<asgardeo_organization_name>
ASGARDEO_LOGOUT_URL=https://api.asgardeo.io/t/<asgardeo_organization_name>/oidc/logout
ASGARDEO_RETURN_TO_URL=http://localhost:5173/login
ASGARDEO_SCIM_ME_URL=https://api.asgardeo.io/t/<asgardeo_organization_name>/scim2/Me
```

7. Clone the remix-auth-asgardeo repo from https://github.com/pavinduLakshan/remix-auth-asgardeo

8. Run the following commands in the root directory of the remix-auth-asgardeo repository to install the dependencies.

```
npm install
npm link
```

9. Switch the directory to the root of the remix-asgardeo-sample project again and run the following command to link the remix-auth-asgardeo package.

```
npm link remix-auth-asgardeo
```

10. Install dependencies by running the following command in the root of the remix-asgardeo-sample project:

```
npm install
```

11. Run the dev server:

```
npm run dev
```

12. Open your browser and navigate to `http://localhost:5173`. You will be redirected to the Asgardeo login page. Log in with the user you created in step 6.

13. You will be redirected back to the Remix app and see the index page with the user's information.

## Docs

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Asgardeo docs](https://wso2.com/asgardeo/docs/)