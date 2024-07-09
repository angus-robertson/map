import {
  IoCheckmark,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "solid-icons/io";
import { ParentComponent, Show, type Component } from "solid-js";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useLayers, type LayerFilters } from "@/stores/layers-context";

export const SidebarBodyLayer: Component = () => {
  const { layers, clearAll } = useLayers();

  return (
    <div class="px-4 flex flex-col">
      <div class="pt-0">
        <span class="uppercase text-destructive text-xs leading-4 tracking-wide">
          Show
        </span>
        <Collapsible class="py-6 border-b border-secondary group/root">
          <CollapsibleTrigger class="flex justify-between items-center w-full">
            <h2 class="leading-5 text-base">Regions and Zones</h2>
            <div class="hover:shadow-[_0px_0px_10px_rgba(0,0,0,0.25)] h-8 w-8 rounded-full flex items-center justify-center border border-transparent">
              <IoChevronUpOutline class="hidden group-data-[expanded=]/root:block" />
              <IoChevronDownOutline class="hidden group-data-[closed=]/root:block" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent class="overflow-hidden mt-6">
            <Select value="regions">Regions of Interest</Select>
            <Select value="lgas">Local Government Areas</Select>
            <Select value="rezs">Renewable Energy Zones</Select>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible class="py-6 border-b border-secondary group/root">
          <CollapsibleTrigger class="flex justify-between items-center w-full">
            <h2 class="leading-5 text-base">Projects</h2>
            <div class="hover:shadow-[_0px_0px_10px_rgba(0,0,0,0.25)] h-8 w-8 rounded-full flex items-center justify-center border border-transparent">
              <IoChevronUpOutline class="hidden group-data-[expanded=]/root:block" />
              <IoChevronDownOutline class="hidden group-data-[closed=]/root:block" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent class="overflow-hidden mt-6">
            <Select value="projects">Projects</Select>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible class="py-6 border-b border-secondary group/root">
          <CollapsibleTrigger class="flex justify-between items-center w-full">
            <h2 class="leading-5 text-base">Facilities</h2>
            <div class="hover:shadow-[_0px_0px_10px_rgba(0,0,0,0.25)] h-8 w-8 rounded-full flex items-center justify-center border border-transparent">
              <IoChevronUpOutline class="hidden group-data-[expanded=]/root:block" />
              <IoChevronDownOutline class="hidden group-data-[closed=]/root:block" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent class="overflow-hidden mt-6">
            <Select value="safeguards">Safeguards</Select>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible class="py-6 border-b border-secondary group/root">
          <CollapsibleTrigger class="flex justify-between items-center w-full">
            <h2 class="leading-5 text-base">Infrastructure</h2>
            <div class="hover:shadow-[_0px_0px_10px_rgba(0,0,0,0.25)] h-8 w-8 rounded-full flex items-center justify-center border border-transparent">
              <IoChevronUpOutline class="hidden group-data-[expanded=]/root:block" />
              <IoChevronDownOutline class="hidden group-data-[closed=]/root:block" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent class="overflow-hidden mt-6">
            <Select value="transmission">Transmission</Select>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div class="h-[40px] mt-auto flex items-start justify-between text-muted-foreground text-sm pt-4">
        <span class="">
          Showing {Object.entries(layers()).filter(([, val]) => val).length} of{" "}
          {Object.values(layers()).length}.
        </span>
        <button
          class="block mr-4 uppercase pb-1 border-b border-destructive/80 hover:border-destructive hover:border-b-2 hover:text-primary tracking-wide"
          onClick={() => clearAll()}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

type SelectProps = {
  value: keyof LayerFilters;
};

const Select: ParentComponent<SelectProps> = (props) => {
  const { layers, toggleLayer } = useLayers();

  const handleClick = () => {
    toggleLayer(props.value);
  };

  return (
    <label
      class="first:mt-0 last:mb-0 my-2 flex items-center cursor-pointer text-sm"
      onClick={handleClick}
    >
      <div class="mr-4 border border-primary/80 w-4 h-4 relative">
        <Show when={layers()[props.value]}>
          <IoCheckmark class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </Show>
      </div>
      <span>{props.children}</span>
    </label>
  );
};
