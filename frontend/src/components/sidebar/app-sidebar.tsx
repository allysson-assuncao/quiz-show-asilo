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
                    url: '/dashboard/answer/quiz',
                },
            ],
        },
        {
            title: 'Autenticação',
            /*url: "#",*/
            icon: FingerprintIcon,
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
        /*{
            title: 'Administrador',
            /!*url: "#",*!/
            icon: ShieldPlusIcon,
            isActive: false,
            items: [
                {
                    title: 'Relatório de Vendas',
                    url: '/dashboard/table/sales',
                },
                {
                    title: 'Relatório de Operação',
                    url: '/dashboard/table/operation',
                },
                {
                    title: 'Relatório de Funcionários',
                    url: '/dashboard/table/workers',
                },
            ],
        },*/
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
                <NavUser user={data.user}/>
            </SidebarFooter>
        </Sidebar>
    )
}
