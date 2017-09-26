import { HttpBodyParameterInformation } from './http-body-parameter-information';
import { Response, Request } from 'express';
import { Parameter, TypesHelper } from 'ts-hub';
import * as BodyParser from "body-parser";
import { HttpBodyType } from "./http-body-type";

type ParserType = "json" | "raw" | "text" | "urlencoded";

export class HttpBodyParameter implements Parameter<HttpBodyParameterInformation>{
    
    public information: HttpBodyParameterInformation;
    public index: number;
    public type: any;

    private static parsersMap = new Map<HttpBodyType, ParserType>(
        [[HttpBodyType.Json, "json"],
         [HttpBodyType.Raw, "raw"],
         [HttpBodyType.Text, "text"],
         [HttpBodyType.Urlencoded, "urlencoded"]])
    
    public getValue(request: Request, response: Response) : any {

        this.information.type || (this.information.type = HttpBodyType.Json);

        var parsers: ParserType[] = (this.information.type == HttpBodyType.Any) ? 
            Array.from(HttpBodyParameter.parsersMap.values()) : 
            [HttpBodyParameter.parsersMap.get(this.information.type)];
        
        var value = parsers.find(parserName => {
            var parser: any = BodyParser[parserName];
            parser(request, response, (error: any) => {
                if(error){
                    throw error;
                }
            });
            
            return request.body && request.body[this.information.name];
        })        

        return TypesHelper.instance.castToType(value, this.type);
    }

}