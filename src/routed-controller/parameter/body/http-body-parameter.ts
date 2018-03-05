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
    
    public async getValue(staticData: any, request: Request, response: Response) : Promise<any> {

        this.information.type || (this.information.type = HttpBodyType.Json);

        var parsers: ParserType[] = (this.information.type == HttpBodyType.Any) ? 
            Array.from(HttpBodyParameter.parsersMap.values()) : 
            [HttpBodyParameter.parsersMap.get(this.information.type)];
        
        var possibleValues = await Promise.all(parsers.map(parserName => {
            var parser: any = BodyParser[parserName];
            return this.parseBody(parser, request, response);
        }));        

        return TypesHelper.instance.castToType(possibleValues.find(value => value), this.type);
    }

    private parseBody(parser: any, request: Request, response: Response): Promise<any> {
        return new Promise((resolve, reject) => {
            parser(this.information.options)(request, response, (error: any) => {
                if(error){
                    resolve();
                }
                else {
                    resolve(request.body && request.body[this.information.name]);
                }
            });
        });
    }

}