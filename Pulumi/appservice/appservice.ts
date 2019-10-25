import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core";
import { appServiceConfigPlans } from "../base/appserviceconfig";
import { config } from "../config/Configs";

export class AppService extends BaseResource<azure.appservice.AppService>{

    appService: azure.appservice.AppService;

    constructor(name: string, appServicePlan: azure.appservice.Plan, resourceGroup: ResourceGroup) {
        super({
            azureProvider: "microsoft.appsservice/appservices",
            resourceGroup: resourceGroup.name,
            resourceName: name
        });

        this.appService = new azure.appservice.AppService(name, {
            resourceGroupName: resourceGroup.name,
            name: name,
            location: resourceGroup.location,
            appServicePlanId: appServicePlan.id,
            httpsOnly: true,

            siteConfig: {
                alwaysOn: true,
                minTlsVersion: "1.2"
            }
        });
    }
}
