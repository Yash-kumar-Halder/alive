export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    authProvider: 'google' | 'github';
    authProviderId: string;
    workspaces: [string];
    createdAt: Date;
    updatedAt: Date;
}
