
export interface PrizeLogger {
    (prize: string): void;
}

export interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    markPrize: PrizeLogger;
}
