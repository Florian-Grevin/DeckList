export const handle401 = (error, navigate) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return true;
        }
        return false;
    }