import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.js";
import {dataTimeActual } from "./data.js";

const services = new ExternalServices();

//services.getRandomVerse();
//services.getHeroes();
loadHeaderFooter();
dataTimeActual();
