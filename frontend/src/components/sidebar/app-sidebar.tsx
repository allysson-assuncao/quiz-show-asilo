"use client"

import * as React from "react"
import {
    Command, FingerprintIcon, FolderKanbanIcon,
    GlobeIcon,
    LifeBuoy,
    Send,
    SquareTerminal,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {NavMain} from "@/components/sidebar/nav/nav-main";
import {NavAbout} from "@/components/sidebar/nav/nav-about";
import {NavSecondary} from "@/components/sidebar/nav/nav-secondary";
import {NavUser} from "@/components/sidebar/nav/nav-user";
import {RootState} from "@/store";
import {useSelector} from "react-redux";

const data = {
    user: {
        name: "Quiz Show Asilo",
        email: "quiz.showasilo@gmail.com",
        avatar: "/avatars/quiz_asilo.jpg",
    },
    navMain: [
        {
            title: "Gestão",
            /*url: "#",*/
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Perguntas",
                    url: '/dashboard/manage/questions',
                },
                {
                    title: "Quizes",
                    url: '/dashboard/manage/quiz',
                },
            ],
        },
        {
            title: "Operação",
            /*url: "#",*/
            icon: FolderKanbanIcon,
            isActive: true,
            items: [
                {
                    title: "Responder Quiz",
                    url: '/dashboard/take-quiz',
                },
            ],
        },
        {
            title: 'Autenticação',
            /*url: "#",*/
            icon: FingerprintIcon,
            isActive: true,
            items: [
                {
                    title: 'Login',
                    url: '/login',
                },
                {
                    title: 'Cadastro',
                    url: '/register',
                }
            ],
        },
        {
            title: "Relatórios",
            /*url: "#",*/
            icon: FolderKanbanIcon,
            isActive: true,
            items: [
                {
                    title: "Rank de Resultados",
                    url: '/dashboard/report',
                },
            ],
        },
    ],
    projects: [
        {
            name: 'Sites',
            /*url: "#",*/
            icon: GlobeIcon,
            itemNames: ['GitHub'],
            itemUrls: ['https://github.com/allysson-assuncao/quiz-show-asilo'],
        },
    ],
    navSecondary: [
        {
            title: "Suporte",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

    const {email, profilePicturePath} = useSelector((state: RootState) => state.auth);

    const formatImageUrl = (path: string | null) => {
        if (!path) return '';
        return `http://localhost:8081/Pictures/images/${path}`;
    };

    const dynamicUser = {
        name: data.user.name || "Usuário",
        email: email || "email@exemplo.com",
        avatar: formatImageUrl(profilePicturePath),
    };

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div
                                    className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4"/>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Quiz Show Asilo</span>
                                    <span className="truncate text-xs">Extensão</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavAbout projects={data.projects}/>
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={dynamicUser}/>
            </SidebarFooter>
        </Sidebar>
    )
}
