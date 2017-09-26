import { HttpNamedParameterInformation } from './../../information';
import { OptionsJson, OptionsText, OptionsUrlencoded, Options } from "body-parser";
import { HttpBodyType } from "./http-body-type";

export class HttpBodyParameterInformation extends HttpNamedParameterInformation{
    options?: Options | OptionsJson | OptionsUrlencoded | OptionsText;
    type?: HttpBodyType
}