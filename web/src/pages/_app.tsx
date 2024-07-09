import { type ParentComponent } from "solid-js";

import { LayersProvider } from "@/stores/layers-context";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/sidebar";

const RootLayout: ParentComponent = (props) => {
  return (
    <>
      <LayersProvider>
        <Header />
        {props.children}
        <Sidebar />
      </LayersProvider>
    </>
  );
};

export default RootLayout;
