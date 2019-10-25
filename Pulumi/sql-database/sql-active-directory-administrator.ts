import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core/resourceGroup";

export class AzureSqlActiveDirectoryAdministrator{

    activeDirectoryAdministrator: azure.sql.ActiveDirectoryAdministrator;

    constructor(name: string, sqlServer: azure.sql.SqlServer, resourceGroup: ResourceGroup,
        login: string, tenantId: string, objectId: string) {

        this.activeDirectoryAdministrator = new azure.sql.ActiveDirectoryAdministrator(name, {
            serverName: sqlServer.name,
            resourceGroupName: resourceGroup.name,
            login: login,
            objectId: objectId,
            tenantId: tenantId
        });
    }
}