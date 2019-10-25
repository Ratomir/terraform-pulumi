import { Configs, ConfigModel, config } from "../config/Configs";
import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";

export interface IOperations<T> {
    serviceUp(): boolean;
    getConfig(): ConfigModel;
    roleAssigniment(principalId: pulumi.Input<string>, roleDefinitionName: string): boolean;
}

interface ResourceArg {
    azureProvider: string;
    resourceName: string;
    resourceGroup: pulumi.Output<string>
}

export class BaseResource<T> implements IOperations<T>{

    resource: ResourceArg;

    constructor(resource: ResourceArg){
        this.resource = resource;
    }

    roleAssigniment(principalId: pulumi.Input<string>, roleDefinitionName: string): boolean {
        const currentConfig = azure.core.getClientConfig();

        const newRole = new azure.authorization.Assignment(this.resource.resourceName, {
            roleDefinitionName: roleDefinitionName,
            principalId: principalId,
            scope: this.resource.resourceGroup.apply(t => "/subscriptions/" + currentConfig.subscriptionId + "/resourcegroups/" + t + "/providers/" + 
            this.resource.azureProvider + "/" + this.resource.resourceName),
        });

        return true;
    }

    getConfig(): ConfigModel {
        return config;
    }

    result: boolean = false;

    serviceUp(): boolean {
        return this.result;
    }

    getEnvironment() {
        return { "environment": this.getConfig().env }
    }

    
}