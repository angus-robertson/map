import { type ParentComponent } from "solid-js";

const RootLayout: ParentComponent = (props) => {

    return (
        <>
            {props.children}
        </>
    );
};

export default RootLayout;