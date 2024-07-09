import { type Component, createSignal } from "solid-js";

import { cn } from "@/libs/utils";

import { Logo } from "./logo";

export const Header: Component = () => {
  const [visible, _] = createSignal<boolean>(false);

  return (
    <div class="h-[77px] w-full m-0 fixed px-4 z-[1010] flex flex-col items-stretch justify-center">
      <div class="flex justify-between m-0">
        <a href="/" class="flex items-center cursor-pointer">
          <Logo class="h-12 w-12" />
          <span
            class={cn(
              "mx-4 sm:w-auto sm:text-xs hidden sm:block",
              visible() ? "text-primary-foreground" : "text-primary",
            )}
          >
            Net Zero Map Project
          </span>
        </a>
        <div class="flex gap-x-3 items-center"></div>
      </div>
    </div>
  );
};
