
import type { Worker } from "./types";
import { getAllWorkers, getWorkerByID, PrintWorker, logPrize } from "./workers";
import type { Author, Librarian } from "./interfaces";
import { UniversityLibrarian, ReferenceItem, Encyclopedia } from "./classes";

export function runLab2(): void {
    console.log("=== Завдання 2.1. Визначення інтерфейсу ===");

    const workers: Worker[] = getAllWorkers();

    console.log("\nУсі працівники:");
    console.log(workers);

    console.log("\nПошук працівника за ID:");

    const worker: Worker | undefined = getWorkerByID(2);

    if (worker !== undefined) {
        PrintWorker(worker);
    } else {
        console.log("Працівника не знайдено");
    }

    console.log("\n=== Завдання 2.2. Інтерфейси для типів функцій ===");

    logPrize("За відмінну роботу");

    if (worker !== undefined) {
        worker.markPrize("Працівник місяця");
    }

    console.log("\n=== Завдання 2.3. Розширення інтерфейсів ===");

    const favoriteAuthor: Author = {
        name: "Olena Kovalenko",
        email: "olena@example.com",
        numBooksPublished: 5
    };

    console.log("\nУлюблений автор:");
    console.log(`Ім'я: ${favoriteAuthor.name}`);
    console.log(`Email: ${favoriteAuthor.email}`);
    console.log(`Кількість опублікованих книг: ${favoriteAuthor.numBooksPublished}`);

/*    const favoriteLibrarian: Librarian = {
        name: "Iryna Melnyk",
        email: "iryna@example.com",
        department: "Literature",

        assistCustomer(custName: string): void {
            console.log(`${this.name} is assisting ${custName}`);
        }
    };*/

    console.log("\n=== Завдання 2.4. Інтерфейси для типів класів ===");

    const favoriteLibrarian: Librarian = new UniversityLibrarian();

    favoriteLibrarian.name = "Iryna Melnyk";
    favoriteLibrarian.email = "iryna@example.com";
    favoriteLibrarian.department = "Literature";

    console.log("\nБібліотекар, створений через клас:");
    console.log(`Ім'я: ${favoriteLibrarian.name}`);
    console.log(`Email: ${favoriteLibrarian.email}`);
    console.log(`Відділ: ${favoriteLibrarian.department}`);

    favoriteLibrarian.assistCustomer("Ivan");



    console.log("\n=== Завдання 2.5. Створення та використання класів ===");

    /*
    const ref: ReferenceItem = new ReferenceItem("TypeScript Handbook", 2024);

    ref.printItem();

    ref.publisher = "Packt Publishing";

    console.log(`Видавництво: ${ref.publisher}`);
    */

    console.log("ReferenceItem тепер абстрактний, тому створення ref закоментовано.");


    console.log("\n=== Завдання 2.6. Розширення класів ===");

    const refBook: Encyclopedia = new Encyclopedia(
        "Encyclopedia of Programming",
        2025,
        3
    );

    refBook.printItem();

    console.log("\n=== Завдання 2.7. Створення абстрактних класів ===");

    refBook.printCitation();

    refBook.publisher = "Packt Publishing";
    console.log(`Видавництво: ${refBook.publisher}`);
}
