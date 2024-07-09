import {
  type ParentComponent,
  createContext,
  createMemo,
  createUniqueId,
  onCleanup,
  useContext,
} from "solid-js";

import { type SourceSpecification } from "maplibre-gl";

import { useMap, useMapEffect } from "./map";

const SourceIdContext = createContext<string>();
const useSourceId = () => useContext(SourceIdContext);

type SourceProps = {
  id?: string;
  source: SourceSpecification;
};

const Source: ParentComponent<SourceProps> = (props) => {
  const id = createMemo(() => props.id ?? createUniqueId());

  // debug handler
  const debug = (text: string, value?: unknown) => {
    console.debug("%c[MapGL]", "color: #10b981", text, value || "");
  };

  // add source to map
  useMapEffect((map) => {
    if (!map.getSource(id())) {
      map.addSource(id(), props.source);
    }

    debug("Added Source:", id());
  });

  onCleanup(() => {
    const m = useMap()?.();
    if (!m) return;

    if (m.getSource(id())) {
      m.removeSource(id());
    }
  });

  return (
    <SourceIdContext.Provider value={id()}>
      {props.children}
    </SourceIdContext.Provider>
  );
};

export { Source, useSourceId };
