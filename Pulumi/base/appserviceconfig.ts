export interface AppServiceConfigPlan {
    env: string,
    tier: string,
    size: string
}

export const appServiceConfigPlans:AppServiceConfigPlan[] = [
    {
        env: "Dev",
        tier: "Basic",
        size: "B1"
    },
    {
        env: "QA",
        tier: "Standard",
        size: "S1"
    }
];