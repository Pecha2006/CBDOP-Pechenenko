
import type { Worker, PrizeLogger } from "./types";

export const logPrize: PrizeLogger = (prize: string): void => {
    console.log(`Нагорода: ${prize}`);
};

export function getAllWorkers(): Worker[] {
    return [
        { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, markPrize: logPrize },
        { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500, markPrize: logPrize },
        { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, markPrize: logPrize },
        { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300, markPrize: logPrize }
    ];
}

export function getWorkerByID(id: number): Worker | undefined {
    return getAllWorkers().find(
        (worker: Worker): boolean => worker.id === id
    );
}

export function PrintWorker(worker: Worker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}
