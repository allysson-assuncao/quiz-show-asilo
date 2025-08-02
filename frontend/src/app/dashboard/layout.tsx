'use client'

import React, {useEffect} from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {ClientOnly} from "@/components/helpers/ClientOnly";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {setProfilePicture} from "@/store/slices/authSlice";
import {fetchUserProfilePicturePath} from "@/services/userService";

export default function DashboardLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const dispatch = useDispatch();
    const { email, isAuthenticated, profilePicturePath } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated && email && !profilePicturePath) {
            const getProfilePic = async () => {
                try {
                    const path = await fetchUserProfilePicturePath(email);
                    if (path) {
                        dispatch(setProfilePicture(path));
                    }
                } catch (error) {
                    console.error("Erro ao buscar a foto de perfil:", error);
                }
            };
            getProfilePic();
        }
    }, [isAuthenticated, email, profilePicturePath, dispatch]);

    return (
        <ProtectedRoute>
            <div>
                <SidebarProvider>
                    <ClientOnly>
                        <AppSidebar/>
                    </ClientOnly>
                    <main className="flex-grow h-full w-full max-w-[1920px] px-4 md:px-8 5xl:mx-auto 5xl:px-32">
                        {children}
                    </main>
                </SidebarProvider>
            </div>
        </ProtectedRoute>
    );
}
