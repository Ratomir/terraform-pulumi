import { BaseResource } from "../base/BaseCustomResource";
import * as azure from "@pulumi/azure";
import { Output } from "@pulumi/pulumi";
import * as config from "./policyListConfig"

export class KeyVaultAccessPolicy{
    accessPolicy: azure.keyvault.AccessPolicy;

    constructor(keyVaultId: Output<string>, tenantId: string, objectId: string) {

        this.accessPolicy = new azure.keyvault.AccessPolicy("blog_ratomir", {
            keyVaultId: keyVaultId,
            tenantId: tenantId,
            objectId: objectId,

            certificatePermissions: config.fullAdminList,
            secretPermissions: config.adminSecret,
            keyPermissions: config.readKeySecrets
        });
    }
} 