import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core/resourceGroup";

export class AzureSqlDatabase extends BaseResource<azure.sql.Database>{

    sqlDatabase: azure.sql.Database;

    constructor(name: string, sqlServer: azure.sql.SqlServer, resourceGroup: ResourceGroup) {
        super({
            azureProvider: "microsoft.database/databases",
            resourceGroup: resourceGroup.name,
            resourceName: name
        });

        this.sqlDatabase = new azure.sql.Database(name, {
            name: name,
            serverName: sqlServer.name,
            resourceGroupName: resourceGroup.name,
            location: resourceGroup.location,
            createMode: "Default",
            edition: "Basic",
            tags: this.getEnvironment()
        });
     }
}