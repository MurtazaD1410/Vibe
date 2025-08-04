import React from "react";
import { TreeItem } from "@/type";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

interface TreeProps {
  item: TreeItem;
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  parentPath: string;
}
const Tree = ({ item, parentPath, onSelect, selectedValue }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;

  if (!items.length) {
    const isSelected = selectedValue === currentPath;

    return (
      <SidebarMenuButton
        isActive={isSelected}
        onClick={() => onSelect && onSelect(currentPath)}
        className="data-[active=true]:bg-transparent py-1 px-1 h-auto"
      >
        <FileIcon />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem className="px-0">
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="">
            <ChevronRightIcon />
            <FolderIcon />
            <span className="truncate">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="px-1 py-0">
            {items.map((subItem, index) => {
              console.log(subItem);
              return (
                <Tree
                  key={index}
                  item={subItem}
                  parentPath={currentPath}
                  onSelect={onSelect}
                  selectedValue={selectedValue}
                />
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

interface Props {
  data: TreeItem[];
  value?: string | null;
  onSelect?: (value: string) => void;
}

const TreeView = ({ data, value, onSelect }: Props) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => {
                  return (
                    <Tree
                      key={index}
                      item={item}
                      selectedValue={value}
                      onSelect={onSelect}
                      parentPath=""
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};

export default TreeView;
