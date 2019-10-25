import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core";
import { appServiceConfigPlans } from "../base/appserviceconfig";
import { config } from "../config/Configs";

export class AppServicePlan extends BaseResource<azure.appservice.Plan>{

    appServicePlan: azure.appservice.Plan;

    constructor(name: string, resourceGroup: ResourceGroup) {
        super({
            azureProvider: "microsoft.appsserviceplan/plans",
            resourceGroup: resourceGroup.name,
            resourceName: name
        });

        const plan = appServiceConfigPlans.filter((plan) => plan.env === config.env)[0];

        this.appServicePlan = new azure.appservice.Plan(name, {
            resourceGroupName: resourceGroup.name,
            name: name,
            location: resourceGroup.location,
            kind: "Linux",
            reserved: true,
            sku: {
                tier: plan.env,
                size: plan.size,
            },
        });
    }
}