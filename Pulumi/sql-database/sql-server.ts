import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core/resourceGroup";

export class AzureSqlServer extends BaseResource<azure.sql.SqlServer>{

    sqlServer: azure.sql.SqlServer;

    constructor(name: string, resourceGroup: ResourceGroup) {
        super({
            azureProvider: "microsoft.sqlserver/servers",
            resourceGroup: resourceGroup.name,
            resourceName: name
        });

        this.sqlServer = new azure.sql.SqlServer(name, {
            name: name,
            resourceGroupName: resourceGroup.name,
            location: resourceGroup.location,
            version: "12.0",
            administratorLogin: "ratomir",
            administratorLoginPassword: this.getConfig().adminPassword,
            tags: this.getEnvironment()
        });
     }
}