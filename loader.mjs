import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("ts-node/esm", pathToFileURL("./"));
//REMEMBER TO REMOVE THIS AND NODEMON.json ONCE ALL FILES ARE CONVERTED TO TS
//UNINSTALL THE NODEMON AND TS-NODE TOO
