import {
  type Accessor,
  Component,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  JSX,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from "solid-js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapContext = createContext<Accessor<maplibregl.Map | undefined>>();

const useMap = () => {
  const ctx = useContext(MapContext);

  if (ctx === undefined) {
    throw new Error("`useMap` must be used within a `MapProvider` component");
  }

  return ctx;
};

const useMapEffect = (f: (map: maplibregl.Map) => void) =>
  createEffect(() => {
    const map = useMap()();
    map && f(map);
  });

type MapProps = {
  id?: string;
  style?: JSX.CSSProperties;
  class?: string;
  classList?: Record<string, boolean | undefined>;
  cursor?: string;
  options?: Partial<Omit<maplibregl.MapOptions, "container">>;
  children?: JSX.Element;
} & MapEvents;

type MapEvents = Partial<{
  [P in keyof maplibregl.MapEventType as `on${P}`]: (
    e: maplibregl.MapEventType[P],
  ) => void;
}>;

const Map: Component<MapProps> = (initial) => {
  const [props, events] = splitProps(initial, [
    "id",
    "style",
    "class",
    "classList",
    "cursor",
    "options",
    "children",
  ]);

  // Signals
  const [map, setMap] = createSignal<maplibregl.Map>();

  const id = createMemo(() => props.id ?? createUniqueId());
  const interactive = createMemo(
    () =>
      typeof props.options?.interactive === "undefined" ||
      props.options.interactive,
  );

  const container = (
    <div
      id={id()}
      class={props.class}
      classList={props.classList}
      style={props.style}
    />
  ) as HTMLDivElement;

  onMount(() => {
    const map = new maplibregl.Map({
      style: "https://demotiles.maplibre.org/style.json",
      ...props.options,
      container,
    });

    void map.once("load", () => setMap(map));
  });

  createEffect(() => {
    const canvas = map()?.getCanvas();
    if (canvas) {
      canvas.style.cursor = props.cursor ?? interactive() ? "grab" : "auto";
    }
  });

  createEffect(() => {
    const m = map();
    if (!m) return;

    for (const [key, handler] of Object.entries(events)) {
      if (!key.startsWith("on")) continue;

      const name = key.slice(2).toLowerCase();
      m.on(name as never, handler as never);
      onCleanup(() => m.off(name as never, handler));
    }
  });

  onCleanup(() => {
    map()?.remove();
  });

  return (
    <MapContext.Provider value={map}>
      {container}
      {props.children}
    </MapContext.Provider>
  );
};

export { Map, useMap, useMapEffect };
export type { MapProps };

