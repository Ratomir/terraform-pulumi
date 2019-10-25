import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { IOperations, BaseResource } from "../base/BaseCustomResource";
import { ResourceGroup } from "@pulumi/azure/core/resourceGroup";
import { Output } from "@pulumi/pulumi";
import { AccessPolicyArgs } from "@pulumi/azure/keyvault/accessPolicy";
import * as config from "./policyListConfig"

export class ExtendKeyVault extends BaseResource<azure.keyvault.KeyVault> {
    keyVault: azure.keyvault.KeyVault;

    constructor(current: azure.core.GetClientConfigResult, resourceGroup: ResourceGroup) {

        super({
            azureProvider: "microsoft.keyvault/vaults",
            resourceGroup: resourceGroup.name,
            resourceName: "blog-keyvault"
        });

        this.keyVault = new azure.keyvault.KeyVault("blog-keyvault", {
            name: "blog-keyvault",
            location: resourceGroup.location,
            resourceGroupName: resourceGroup.name,
            enabledForDeployment: true,
            enabledForDiskEncryption: true,
            enabledForTemplateDeployment: true,
            tenantId: current.tenantId,
            skuName: "standard",

            networkAcls: {
                defaultAction: "Allow",
                bypass: "AzureServices"
            },
            tags: this.getEnvironment()
        });

        this.result = true;
    }

    assignPolicyForAdmin(tenantId: string, objectId: string){
        const accessPolicy = new azure.keyvault.AccessPolicy("blog_ratomir", {
            keyVaultId: this.keyVault.id,
            tenantId: tenantId,
            objectId: objectId,

            certificatePermissions: config.fullAdminList,
            secretPermissions: config.adminSecret,
            keyPermissions: config.readKeySecrets
        });
    }

    assignSecret(name: string, secret: Output<string>) {
        const newSecret = new azure.keyvault.Secret(name, {
            name: name,
            keyVaultId: this.keyVault.id,
            value: secret
        });
    }

    assignCertFromFile(path: string){
        const cert = new pulumi.asset.StringAsset(path);
        const newSecret = new azure.keyvault.Certificate("ratomirvukadin-cert", {
            name: "ratomirvukadin-cert",
            keyVaultId: this.keyVault.id,
            
            certificate: {
                password: "XXX",
                contents: pulumi.interpolate `${cert}`
            },
            certificatePolicy: {
                issuerParameters: {
                    name: "Self"
                },
                keyProperties: {
                    exportable: true,
                    keySize: 2048,
                    keyType: "RSA",
                    reuseKey: false
                },

                secretProperties: {
                    contentType: "application/x-pkcs12"
                }
            }
        });
    }
}
