import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { ResourceGroupMaker } from "./base/ResourceGroup";
import { Output } from "@pulumi/pulumi";

export class ApplicationInsights {

    instrumentationKey: Output<string>;

    constructor(resourceGroup: ResourceGroupMaker) {
        const appInsights = new azure.appinsights.Insights('blog-api-ai', {
            location: resourceGroup.resourceGroup.location,
            resourceGroupName: resourceGroup.resourceGroup.name,
            name: 'blog-api-ai',
            applicationType: "Web",
        });

        this.instrumentationKey = appInsights.instrumentationKey;
    }
}




