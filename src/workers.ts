
import { Category, type Worker } from "./types";

export function getAllWorkers(): Worker[] {
    return [
        { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.BusinessAnalyst },
        { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500, category: Category.Developer },
        { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, category: Category.Designer },
        { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300, category: Category.Developer }
    ];
}

export function logFirstAvailable(workers: Worker[] = getAllWorkers()): void {
    console.log(`Кількість працівників: ${workers.length}`);

    for (const worker of workers) {
        if (worker.available) {
            console.log(`Перший доступний працівник: ${worker.name} ${worker.surname}`);
            return;
        }
    }

    console.log("Доступних працівників немає");
}

export function getWorkersSurnamesByCategory(
    category: Category = Category.Designer
): Array<string> {
    const surnames: Array<string> = [];

    for (const worker of getAllWorkers()) {
        if (worker.category === category) {
            surnames.push(worker.surname);
        }
    }

    return surnames;
}

export function logWorkersNames(names: string[]): void {
    for (const name of names) {
        console.log(name);
    }
}

export function getWorkerByID(id: number): Worker | undefined {
    return getAllWorkers().find(
        (worker: Worker): boolean => worker.id === id
    );
}


export function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    console.log(`Замовник: ${customer}`);

    const availableWorkers: string[] = [];

    for (const id of workerIDs) {
        if (!Number.isInteger(id) || id <= 0) {
            console.log(`Некоректний ID працівника: ${id}`);
            continue;
        }

        const worker: Worker | undefined = getWorkerByID(id);

        if (worker === undefined) {
            console.log(`Працівника з ID ${id} не знайдено`);
            continue;
        }

        if (worker.available) {
            availableWorkers.push(`${worker.name} ${worker.surname}`);
        }
    }

    return availableWorkers;
}
