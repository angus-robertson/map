import { cn } from "@/libs/utils";
import { splitProps, type Component, type ComponentProps } from "solid-js";

export const IoClose: Component<ComponentProps<"svg">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      class={cn("overflow-visible text-current", local.class)}
      {...others}
    >
      <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"></path>
    </svg>
  );
};