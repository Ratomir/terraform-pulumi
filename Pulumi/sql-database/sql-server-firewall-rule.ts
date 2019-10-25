import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core/resourceGroup";

export class AzureSqlServerFirewall{

    firewall: azure.sql.FirewallRule;

    constructor(name: string, sqlServer: azure.sql.SqlServer, resourceGroup: ResourceGroup, ipAddress: string) {

        this.firewall = new azure.sql.FirewallRule(name, {
            name: name,
            serverName: sqlServer.name,
            resourceGroupName: resourceGroup.name,
            startIpAddress: ipAddress,
            endIpAddress: ipAddress,
        });
     }
}