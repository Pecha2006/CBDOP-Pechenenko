import {Category, type Worker} from "./types";
import {
    getAllWorkers,
    logFirstAvailable,
    getWorkersSurnamesByCategory,
    logWorkersNames,
    getWorkerByID,
    checkoutWorkers
} from "./workers";
import {createCustomerID, createCustomer} from "./customers";

export function runLab1(): void {
    console.log("Список усіх працівників:", getAllWorkers());
    logFirstAvailable();

    console.log("\nПрізвища працівників категорії Developer:");

    const developerSurnames: Array<string> =
        getWorkersSurnamesByCategory(Category.Developer);

    logWorkersNames(developerSurnames);

    console.log("\nІмена та прізвища всіх Developer:");

    getAllWorkers().forEach((worker: Worker): void => {
        if (worker.category === Category.Developer) {
            console.log(`${worker.name} ${worker.surname}`);
        }
    });

    console.log("\nПошук працівника за ID:");

    const foundWorker: Worker | undefined = getWorkerByID(2);

    if (foundWorker !== undefined) {
        console.log(`Ім'я: ${foundWorker.name}`);
        console.log(`Прізвище: ${foundWorker.surname}`);
        console.log(`Зарплата: ${foundWorker.salary}`);
    } else {
        console.log("Працівника не знайдено");
    }

    console.log("\nСтворення ID замовника:");

    const myName: string = "Ivan";
    const listNumber: number = 19;

    let myID: string = createCustomerID(myName, listNumber);

    console.log(`Мій ID: ${myID}`);

    let idGenerator: (name: string, id: number) => string =
        (name: string, id: number): string => {
            return `${name}${id}`;
        };

    console.log(`ID через стрілочну функцію: ${idGenerator(myName, listNumber)}`);

    idGenerator = createCustomerID;

    console.log(`ID через createCustomerID: ${idGenerator(myName, listNumber)}`);

    console.log("\nСтворення замовників:");

    console.log("\nВиклик з одним параметром:");
    createCustomer("Ivan");

    console.log("\nВиклик з двома параметрами:");
    createCustomer("Ivan", 20);

    console.log("\nВиклик з трьома параметрами:");
    createCustomer("Ivan", 20, "Kyiv");

    console.log("\nПрацівники категорії за замовчуванням (Designer):");

    const designerSurnames: Array<string> =
        getWorkersSurnamesByCategory();

    logWorkersNames(designerSurnames);

    console.log("\nПеревірка доступності працівників:");

    const myWorkers: string[] = checkoutWorkers("Ivan", 19, 1, 2, 4);

    console.log("\nДоступні працівники:");

    myWorkers.forEach((name: string): void => {
        console.log(name);
    });
}