import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { IOperations } from "./BaseCustomResource";
import { Configs, config } from "./../config/Configs";

export class ResourceGroupMaker {

    resourceGroup: azure.core.ResourceGroup;

    constructor(name: string, location: string){
        this.resourceGroup = new azure.core.ResourceGroup("ratomirdemo-rg", {
            name: name,
            location: location,
        });
    }
}