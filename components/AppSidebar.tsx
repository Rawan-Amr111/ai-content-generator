"use client";
import { useHistory } from "@/app/api/chats/HistoryContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageSquarePlus } from "lucide-react";

export function AppSidebar() {
  const { history, setSelectedItem, selectedItem } = useHistory();
  return (
    <Sidebar>
      <SidebarContent className="bg-[#003f5c]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setSelectedItem(null)}
                  className="text-white hover:bg-gray-200 font-semibold"
                >
                  <MessageSquarePlus size={20} />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {history.length > 0 && (
                <SidebarGroup>
                  <SidebarGroupLabel className="text-white">
                    History
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    {history.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setSelectedItem(item.id)}
                          className={`text-white text-sm truncate ${
                            selectedItem?.id === item.id
                              ? "bg-gray-600"
                              : "hover:bg-gray-700"
                          }`}
                        >
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
