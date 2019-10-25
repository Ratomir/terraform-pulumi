
import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";

export interface CosmosAppArgs {
    resourceGroup: azure.core.ResourceGroup;
    location: string;
    databaseName: pulumi.Input<string>;
    containerName: pulumi.Input<string>;
}

export class CosmosApp {

    constructor(name: string,
        args: CosmosAppArgs) {

        const resourceGroup = args.resourceGroup;

        // Cosmos DB Account with multiple replicas
        const cosmosAccount = new azure.cosmosdb.Account(`cosmos-${name}`, {
            name: name + "cosmos-db",
            kind: "MongoDB",
            resourceGroupName: resourceGroup.name,
            location: args.location,
            enableAutomaticFailover: false,
            offerType: "Standard",
            consistencyPolicy: {
                consistencyLevel: "Session",
                maxIntervalInSeconds: 10,
                maxStalenessPrefix: 200,
            },
            
            geoLocations: [{ failoverPriority: 0, location: args.location }]
        });

        const database = new azure.cosmosdb.MongoDatabase(`db-${name}`, {
            resourceGroupName: resourceGroup.name,
            accountName: cosmosAccount.name,
            name: args.databaseName,
        });

        const container = new azure.cosmosdb.MongoCollection(`sql-${name}`, {
            resourceGroupName: resourceGroup.name,
            accountName: cosmosAccount.name,
            databaseName: database.name,
            name: `sql-${name}`
        });
    }
}