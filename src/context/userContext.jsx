import React, { createContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "@firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.log("Invalid userId");

                return;
            }

            const docRef = doc(db, "users", userId);

            try {
                const userDoc = await getDoc(docRef);

                if (userDoc.exists()) {
                    setUser(userDoc.data());
                    console.log("exists");
                } else {
                    console.error("No such user!");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <UserContext.Provider value={{ user, setUser, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
