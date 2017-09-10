import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;
};

export const AppConfig: IAppConfig = {    
    //apiEndpoint: "http://46.101.201.71:3000/api/" 
    apiEndpoint: "http://localhost:3000/api/"
    //apiEndpoint: "http://gb.matchyourtie.com:3000/api/"   
};
