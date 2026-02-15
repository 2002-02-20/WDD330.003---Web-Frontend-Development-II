import { loadHeaderFooter } from "./utils.mjs";

import { dataTimeActual } from "./data.js";
import PrincipalCart from "./principalCart.js";

const services = new PrincipalCart();
document.addEventListener("DOMContentLoaded", () => {
    services.displayCourseDetails();
    loadHeaderFooter();
    dataTimeActual();
});





