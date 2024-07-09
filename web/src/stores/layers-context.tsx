import {
  createContext,
  createEffect,
  createSignal,
  Setter,
  useContext,
  type Accessor,
  type ParentComponent,
} from "solid-js";

export const LAYERS = {
  regions: true,
  lgas: false,
  rezs: false,
  projects: true,
  safeguards: false,
  transmission: true,
};

export type LayerFilters = typeof LAYERS;

type FilterContext = {
  layers: Accessor<LayerFilters>;
  isActive: Accessor<boolean>;
  setLayers: Setter<LayerFilters>;
  toggleLayer: (key: keyof LayerFilters) => void;
  toggleAll: () => void;
  clearAll: () => void;
  getVisibilityValue: (key: keyof LayerFilters) => "none" | "visible";
};

const LayersContext = createContext<FilterContext>();

export const useLayers = () => {
  const ctx = useContext(LayersContext);

  if (ctx === undefined) {
    throw new Error(
      "`useLayers` must be used within a `LayersProvider` component",
    );
  }

  return ctx;
};

export const LayersProvider: ParentComponent = (props) => {
  const [layers, setLayers] = createSignal<LayerFilters>({ ...LAYERS });
  const [isActive, setIsActive] = createSignal<boolean>(false);

  const toggleLayer = (key: keyof LayerFilters) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAll = () => {
    setLayers((prev) => {
      return Object.fromEntries(
        Object.entries(prev).map(([key]) => [key, isActive()]),
      ) as LayerFilters;
    });
  };

  const clearAll = () =>
    setLayers(
      (prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([key]) => [key, false]),
        ) as LayerFilters,
    );

  const getVisibilityValue = (key: keyof LayerFilters) =>
    layers()[key] ? "visible" : "none";

  createEffect(() => {
    setIsActive(Object.values(layers()).some((v) => !v));
  });

  return (
    <LayersContext.Provider
      value={{
        layers,
        isActive,
        setLayers,
        toggleLayer,
        toggleAll,
        clearAll,
        getVisibilityValue,
      }}
    >
      {props.children}
    </LayersContext.Provider>
  );
};
