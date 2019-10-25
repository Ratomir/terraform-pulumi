import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";

export class AzureAdApplication {

    application: azure.ad.Application;

    constructor(name: string, arg?: azure.ad.ApplicationArgs) {

        if (arg == null) {
            this.application = new azure.ad.Application(name, {
                name: name,
                homepage: "https://homepage",
                identifierUris: ["http://localhost:21509/"],
                availableToOtherTenants: false,
                oauth2AllowImplicitFlow: true,
                replyUrls: ["http://localhost:21509/signin-oidc"]
            });
        } else {
            this.application = new azure.ad.Application("blog-app", arg);
        }
    }

}

export class AzureAdServicePrincipal {
    servicePrincipal: azure.ad.ServicePrincipal;

    constructor(name: string, applicationId: pulumi.Input<string>) {
        this.servicePrincipal = new azure.ad.ServicePrincipal(name, {
            applicationId: applicationId
        });
    }
}

export class AzureAdServicePrincipalPassword {

    constructor(value: string, principalId: pulumi.Input<string>) {
        const currentDate = new Date();

        const servicePrincipalPassword = new azure.ad.ServicePrincipalPassword("blog_service_app_password", {
            servicePrincipalId: principalId,
            endDate: (currentDate.getFullYear() + 3)+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate() + "T00:00:00Z",
            value: value
        });
    }
}

