export interface IDatabaseService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    create<T>(collection: string, data: T): Promise<string>;
    read<T>(collection: string, id: string): Promise<T | null>;
    update<T>(collection: string, id: string, data: Partial<T>): Promise<void>;
    delete(collection: string, id: string): Promise<void>;
}