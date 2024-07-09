import {
  type Component,
  createMemo,
  createUniqueId,
  onCleanup,
  splitProps,
} from "solid-js";

import * as maplibregl from "maplibre-gl";

import { deepEqual, useMap, useMapEffect, useSourceId } from "@/components/map";
import { LayerFilters, LAYERS, useLayers } from "@/stores/layers-context";

type LayerProps = {
  id?: string;
  beforeId?: string;
  layer: Omit<
    | maplibregl.CircleLayerSpecification
    | maplibregl.FillLayerSpecification
    | maplibregl.LineLayerSpecification
    | maplibregl.SymbolLayerSpecification,
    "id" | "source"
  >;
} & LayerEvents;

type LayerEvents = Partial<{
  [P in keyof maplibregl.MapLayerEventType as `on${P}`]: (
    e: maplibregl.MapLayerEventType[P],
  ) => void;
}>;

const Layer: Component<LayerProps> = (initial) => {
  const [props, events] = splitProps(initial, ["id", "layer", "beforeId"]);

  // set id and sourceid
  const id = createMemo(() => props.id ?? createUniqueId());
  const sourceId = useSourceId();

  // layer filter
  const { getVisibilityValue } = useLayers();

  // debug handler
  const debug = (text: string, value?: unknown) => {
    console.debug("%c[MapGL]", "color: #10b981", text, value || "");
  };

  // add layer to map
  useMapEffect((map) => {
    if (!sourceId || map.getLayer(id())) return;

    map.addLayer(
      {
        id: id(),
        source: sourceId,
        ...props.layer,
      } as maplibregl.LayerSpecification,
      props.beforeId,
    );
    debug("Added Layer:", id());
  });

  // update layer paint and filter
  useMapEffect((map) => {
    if (!map.getLayer(id())) return;

    for (const [k, v] of Object.entries(props.layer.paint ?? {})) {
      if (!deepEqual(map.getPaintProperty(id(), k), v)) {
        map.setPaintProperty(id(), k, v);
      }
    }

    if (!deepEqual(map.getFilter(id()), props.layer.filter)) {
      map.setFilter(id(), props.layer.filter);
    }

    if (id() in LAYERS) {
      map.setLayoutProperty(
        id(),
        "visibility",
        getVisibilityValue(id() as keyof LayerFilters),
      );
    }
  });

  // handle layer events
  useMapEffect((map) => {
    for (const [k, h] of Object.entries(events)) {
      if (!k.startsWith("on")) continue;

      const name = k.slice(2).toLowerCase();
      map.on(name as never, id(), h);
      onCleanup(() => map.off(name as never, id(), h));
    }
  });

  onCleanup(() => {
    const map = useMap()?.();
    if (!map) return;

    if (map.getLayer(id())) {
      map.removeLayer(id());
    }
  });

  return <></>;
};

export { Layer };
