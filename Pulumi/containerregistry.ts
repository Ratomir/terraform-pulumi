import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import { ResourceGroupMaker } from "./base/ResourceGroup";
import { ResourceGroup } from "@pulumi/azure/core/resourceGroup";
import { BaseResource } from "./base/BaseCustomResource";

export class ContainerRegistry extends BaseResource<azure.containerservice.Registry> {

    constructor(name: string, resourceGroup: ResourceGroup) {
        super({
            azureProvider: "microsoft.containerregistry/containerregistries",
            resourceGroup: resourceGroup.name,
            resourceName: name
        });
        const cr = new azure.containerservice.Registry(name, {
            adminEnabled: false,
            location: resourceGroup.location,
            sku: "Basic",
            resourceGroupName: resourceGroup.name,
            name: name,
            tags: this.getEnvironment()
        });
    }
}