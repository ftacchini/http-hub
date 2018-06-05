export const OperationsRegistryId = "OperationsRegistryId"; 

export class OperationsRegistry {

    private _registry: any[] = [];

    public get registry(): any[] {
        return this._registry;
    }

    public register(operation: any): void {
        this._registry.push(operation);
    }

    public clean(): void {
        this._registry = [];
    }
}