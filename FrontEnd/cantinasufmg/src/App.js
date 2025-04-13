import React, { Fragment } from "react";
import AppRoutes from "./routes/AppRoutes";
import { GlobalStyles } from "@mui/material";

function App() {
    return (
        <Fragment>
            <GlobalStyles styles={{ "body, html": { margin: 0, padding: 0 } }} />
            <AppRoutes />
        </Fragment>
    );
}

export default App;
