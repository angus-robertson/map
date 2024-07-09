import { createMediaQuery } from "@solid-primitives/media";
import { type IconTypes } from "solid-icons";
import {
  IoClose,
  IoFilter,
  IoInformationCircle,
  IoLayers,
  IoSearch,
} from "solid-icons/io";
import { createSignal, For, Match, Switch, type Component } from "solid-js";

import { cn } from "@/libs/utils";

import { SidebarBodyFilter } from "@/components/sidebar/sidebar-body-filter";
import { SidebarBodyLayer } from "@/components/sidebar/sidebar-body-layers";

type modes = "none" | "filter" | "layers" | "info" | "search";

const navs: { value: modes; icon: IconTypes }[] = [
  {
    value: "filter",
    icon: IoFilter,
  },
  {
    value: "layers",
    icon: IoLayers,
  },
  {
    value: "info",
    icon: IoInformationCircle,
  },
  {
    value: "search",
    icon: IoSearch,
  },
];

export const Sidebar: Component = () => {
  const [mode, setMode] = createSignal<modes>("none");
  const [open, setOpen] = createSignal<boolean>(false);
  const isMobile = createMediaQuery("(max-width: 640px)");

  const handleClick = (value: modes) => {
    if (mode() === value) {
      setMode("none");
      setOpen(false);
      return;
    }
    setMode(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMode("none");
  };

  //TODO: Add shadow to header on scroll
  return (
    <>
      <nav
        class={cn(
          "fixed top-0 px-4 pt-20 transition-left ease-in-out duration-500 z-50 rounded overflow-hidden",
          !open() && "left-0",
          open() && "-left-full sm:left-sidebar",
        )}
      >
        <div class="w-12  flex flex-col list-none overflow-hidden shadow-lg text-primary">
          <div class="w-12 flex flex-col list-none rounded overflow-hidden shadow-lg">
            <For each={navs}>
              {(item) => (
                <div
                  onClick={() => handleClick(item.value)}
                  class={cn(
                    "h-12  cursor-pointer list-none text-center grid place-items-center hover:bg-textcolor",
                    "text-primary/80 hover:text-primary",
                    open() &&
                      mode() == item.value &&
                      "bg-primary text-primary-foreground/80 hover:text-primary-foreground",
                    mode() != item.value && "bg-secondary",
                  )}
                >
                  <item.icon class="h-6 w-6" />
                </div>
              )}
            </For>
          </div>
        </div>
      </nav>
      <aside
        class={cn(
          "fixed pl-4 pt-20 ease-in-out duration-500 text-primary/80 z-40",
          open() && !isMobile() && "left-0 top-0 h-full w-sidebar",
          open() && isMobile() && "left-0 bottom-0 h-full w-full",
          !open() && isMobile() && "transition-bottom bottom-[-100%]",
          !open() && !isMobile() && "transition-left -translate-x-full",
        )}
      >
        <div class="bg-primary-foreground h-full overflow-y-auto shadow-lg">
          <div class="relative">
            <button
              class="absolute top-0 right-0 m-4 p-0.5 cursor-pointer z-20 border-textcolor border-2 hover:bg-textcolor hover:border-textcolor hover:text-secondary rounded-full"
              onClick={() => handleClose()}
            >
              <IoClose class="h-6 w-6" />
            </button>
          </div>
          <Switch>
            <Match when={mode() === "filter"}>
              <SidebarHeader title="Filter" />
              <SidebarBodyFilter />
            </Match>
            <Match when={mode() === "layers"}>
              <SidebarHeader title="Layers" />
              <SidebarBodyLayer />
            </Match>
            <Match when={mode() === "info"}>
              <SidebarHeader title="Info" />
            </Match>
            <Match when={mode() === "search"}>
              <SidebarHeader title="Search" />
            </Match>
          </Switch>
        </div>
      </aside>
    </>
  );
};

interface SidebarHeaderProps {
  title?: string;
}

const SidebarHeader: Component<SidebarHeaderProps> = (props) => {
  return (
    <>
      <h1 class="text-2xl font-semibold p-4 sticky top-0 bg-primary-foreground z-10 w-full">
        <span class="w-[85%] inline-block text-primary/90">{props.title}</span>
      </h1>
    </>
  );
};
