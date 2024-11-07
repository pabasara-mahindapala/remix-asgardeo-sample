// app/routes/login.tsx
import { Form } from "@remix-run/react";

export default function Login() {
    return (
        <Form action="/auth/asgardeo" method="post">
            <div>
                <div className="flex justify-center items-center h-screen">
                    <button className="m-4 p-2 cursor-pointer border-white border-2 rounded-lg" type="submit">
                        Login with Asgardeo
                    </button>
                </div>
            </div>
        </Form>
    );
}