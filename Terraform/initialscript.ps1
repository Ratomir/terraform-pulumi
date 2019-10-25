az account list --query "[].{name:name, subscriptionId:id, tenantId:tenantId}"

$SUBSCRIPTION_ID = "XXX"
az account set --subscription="${SUBSCRIPTION_ID}"
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/${SUBSCRIPTION_ID}"