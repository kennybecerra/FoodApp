import style from "../scss/main.scss";
//import img from "../images/wow.jpg";
import {myFunc} from "./test.js";


// Functions meant to include the assets files if they can not be included via the css or html
function requireAll(r) { r.keys().forEach(r); } 
requireAll(require.context('../assets/SVG/', true, /\.svg$/));
//requireAll(require.context('../assets/images/', true,  /\.(png|jpeg|jpg)$/));
//requireAll(require.context('../assets/videos/', true,  /\.(mp4|webm|mov)$/));

let a = "hello";

console.log(a);

myFunc();

