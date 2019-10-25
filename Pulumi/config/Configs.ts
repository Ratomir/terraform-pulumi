import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

export interface ConfigModel {
    resourceGroupName: string;
    location: string;
    env: string;
    adminPassword: string
}

export let config : ConfigModel;

export class Configs {
    constructor(){
        const pulumiConf = new pulumi.Config();
        config = {} as ConfigModel;
        config.resourceGroupName = "ratomirdemo";
        config.location = pulumiConf.require("location");
        config.env = pulumiConf.require("env");
        config.adminPassword = pulumiConf.require("adminPassword");
    }
}
