import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext() ?? {};

    const login = async ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        const success = handleInput({
            username,
            password,
        });

        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data))
            if (setAuthUser) {
                setAuthUser(data);
            }
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, login };
};

export default useLogin;

function handleInput({
    username,
    password
}: {
    username: string;
    password: string;
}) {
    if (!username || !password) {
        toast.error("Fill all fields");
        return false;
    }
    return true;
}