import { type Component } from "solid-js";

import { Layer, Map, Source } from "@/components/map";
import {
  FillLayerSpecification,
  GeoJSONSourceSpecification,
  type LineLayerSpecification,
  type VectorSourceSpecification,
} from "maplibre-gl";
import style from "/style.json?url";

const DATA_SOURCE: VectorSourceSpecification = {
  type: "vector",
  tiles: ["/map/tiles/{z}/{x}/{y}.pbf"],
  minzoom: 5,
  maxzoom: 8,
  bounds: [114.613709, -43.164386, 153.59442, -12.377064],
};

const TRANSMISSION_LAYER: Omit<LineLayerSpecification, "source"> = {
  id: "transmission",
  type: "line",
  minzoom: 5,
  "source-layer": "transmission",
  paint: {
    "line-color": "#000000",
    "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.5, 10, 1.8],
    "line-opacity": ["interpolate", ["linear"], ["zoom"], 4, 0.6, 8, 1],
  },
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

const PROJECTS_SOURCE: GeoJSONSourceSpecification = {
  type: "geojson",
  data: "/map/projects.json",
};

const PROJECTS_FILL_LAYER: Omit<FillLayerSpecification, "source"> = {
  id: "projects-fill",
  type: "fill",
  minzoom: 5,
  paint: {
    "fill-color": [
      "case",
      ["==", ["get", "technology"], "onshore wind"],
      "#00aa45",
      "#000000",
    ],
    "fill-opacity": [
      "interpolate",
      ["exponential", 1.96],
      ["zoom"],
      5,
      0,
      7.8,
      0.5,
      16,
      0,
    ],
  },
};

const PROJECTS_OUTLINE_LAYER: Omit<LineLayerSpecification, "source"> = {
  id: "project-outline",
  type: "line",
  minzoom: 5,
  paint: {
    "line-color": [
      "case",
      ["==", ["get", "technology"], "onshore wind"],
      "#00aa45",
      "#000000",
    ],
    "line-opacity": [
      "interpolate",
      ["exponential", 1.96],
      ["zoom"],
      5,
      0,
      7.8,
      1,
    ],
    "line-width": ["interpolate", ["linear"], ["zoom"], 8, 2, 12, 3.5],
  },
};

const Home: Component = () => {
  return (
    <>
      <Map
        class="h-full w-full"
        options={{
          center: [132.7, -27.7],
          style: style,
          zoom: 4,
        }}
      >
        <Source id="data" source={DATA_SOURCE}>
          <Layer id="transmission" layer={TRANSMISSION_LAYER} />
        </Source>
        <Source id="projects" source={PROJECTS_SOURCE}>
          <Layer id="projects" layer={PROJECTS_FILL_LAYER} />
          <Layer id="projects-outline" layer={PROJECTS_OUTLINE_LAYER} />
        </Source>
      </Map>
    </>
  );
};

export default Home;
