import { useState, useEffect } from 'react';

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setIsLoggedIn(true);
            setUser(userData);
        }
    }, []);

    return { isLoggedIn, user };
}

export default useAuth;
