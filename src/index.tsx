import { render } from "react-dom";
import App from "./1_App/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "1_App/providers/ThemeProvider";

render(
  <BrowserRouter>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
)