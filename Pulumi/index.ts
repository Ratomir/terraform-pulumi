import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";

import * as base from "./base/basemodule";
import * as sql from "./sql-database/sql-module";
import { AppService, AppServicePlan } from "./appservice/appservicemodule";
import * as kv from "./key-vault/keyvaultmodule";
import { Configs, config } from "./config/Configs";
import { CosmosApp } from "./CosmosApp";
import { ApplicationInsights } from './application-insights';
import { ContainerRegistry } from './containerregistry';
import { AzureAdApplication, AzureAdServicePrincipal, AzureAdServicePrincipalPassword } from './active-directory/active-directory-app';

const prefix = "ratomirdemo";
const adminObjectId = "XXX";
new Configs();

const current = azure.core.getClientConfig();
console.log(current.subscriptionId);
const blogApp = new AzureAdApplication("blog-app");
const resourceGroupMaker = new base.ResourceGroupMaker(config.resourceGroupName, config.location);

const app = azuread.getApplication({
    name: "blog-app",
});

// Azure Acitve Directory app

const servicePrincipal = new AzureAdServicePrincipal("blog_service_principal", blogApp.application.applicationId);

const servicePrincipalPassword = new AzureAdServicePrincipalPassword("XXX", servicePrincipal.servicePrincipal.id)

const appInsights = new ApplicationInsights(resourceGroupMaker);

const azureKeyVault = buildKeyVault();

azureKeyVault.assignSecret("apiai", appInsights.instrumentationKey);

//Start sql server function
buildSqlServerAndDatabase();
buildContainerRegistry();
buildAppService();

const functions = new CosmosApp(prefix, {
    resourceGroup: resourceGroupMaker.resourceGroup,
    location: config.location,
    containerName: "ratomir",
    databaseName: "ratomir"
});

async function buildSqlServerAndDatabase() {
    const ipAddress = await base.getMyIp();
    console.log(ipAddress);
    const server = new sql.AzureSqlServer("sqlserverrvsdemo", resourceGroupMaker.resourceGroup);
    const sqlDatabase = new sql.AzureSqlDatabase("rvsdbdemo", server.sqlServer, resourceGroupMaker.resourceGroup);
    const fireWall = new sql.AzureSqlServerFirewall("rvsdbdemo", server.sqlServer, resourceGroupMaker.resourceGroup, ipAddress);
    const activeDirectoryAdmin = new sql.AzureSqlActiveDirectoryAdministrator("rvsdbdemo", server.sqlServer, resourceGroupMaker.resourceGroup,
        "ratomir@live.com", current.tenantId, adminObjectId);
}

function buildContainerRegistry() {
    const containerRegistry = new ContainerRegistry("rvsdemo", resourceGroupMaker.resourceGroup);
}

function buildAppService() {
    const appplan = new AppServicePlan("rvsdemoasp", resourceGroupMaker.resourceGroup);
    const appservice = new AppService("rvsdemowebapi", appplan.appServicePlan, resourceGroupMaker.resourceGroup);
}

function buildKeyVault(): kv.ExtendKeyVault {
    const azureKeyVault = new kv.ExtendKeyVault(current, resourceGroupMaker.resourceGroup);
    azureKeyVault.assignPolicyForAdmin(current.tenantId, adminObjectId);

    return azureKeyVault;
}