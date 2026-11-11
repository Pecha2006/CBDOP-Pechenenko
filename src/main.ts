
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

import { runLab1 } from "./lab1/index";
import { runLab2 } from "./lab2/index";

const rl = createInterface({
    input: stdin,
    output: stdout
});

// Запуск практичної №3
function runLab3(): void {
    const angularDirectory = resolve(__dirname, "..", "lab3-angular");

    const command = `
        Start-Process -FilePath 'cmd.exe'
        -WorkingDirectory '${angularDirectory.replace(/'/g, "''")}'
        -ArgumentList '/k', 'npx.cmd ng serve --open --port 4200'
    `.replace(/\r?\n/g, " ");

    try {
        execFileSync(
            "powershell.exe",
            ["-NoProfile", "-Command", command],
            { stdio: "inherit" }
        );

        console.log("Команду запуску Angular виконано.");
    } catch (error) {
        console.error("Помилка запуску Angular:", error);
    }
}

// Запуск практичної №4
function runLab4(): void {
    const angularDirectory = resolve(__dirname, "..", "lab4-angular");

    const command = `
        Start-Process -FilePath 'cmd.exe'
        -WorkingDirectory '${angularDirectory.replace(/'/g, "''")}'
        -ArgumentList '/k', 'npx.cmd ng serve --open --port 4201'
    `.replace(/\r?\n/g, " ");

    try {
        execFileSync(
            "powershell.exe",
            ["-NoProfile", "-Command", command],
            { stdio: "inherit" }
        );

        console.log("Команду запуску Angular виконано.");
    } catch (error) {
        console.error("Помилка запуску Angular:", error);
    }
}

// Запуск практичної №5
function runLab5(): void {
    const angularDirectory = resolve(__dirname, "..", "lab5-angular");

    const command = `
        Start-Process -FilePath 'cmd.exe'
        -WorkingDirectory '${angularDirectory.replace(/'/g, "''")}'
        -ArgumentList '/k', 'npx.cmd ng serve --open --port 4202'
    `.replace(/\r?\n/g, " ");

    try {
        execFileSync(
            "powershell.exe",
            ["-NoProfile", "-Command", command],
            { stdio: "inherit" }
        );

        console.log("Команду запуску Angular виконано.");
    } catch (error) {
        console.error("Помилка запуску Angular:", error);
    }
}

// Запуск практичної №6
function runLab6(): void {
    const angularDirectory = resolve(__dirname, "..", "lab6-angular");

    const command = `
        Start-Process -FilePath 'cmd.exe'
        -WorkingDirectory '${angularDirectory.replace(/'/g, "''")}'
        -ArgumentList '/k', 'npx.cmd ng serve --open --port 4203'
    `.replace(/\r?\n/g, " ");

    try {
        execFileSync(
            "powershell.exe",
            ["-NoProfile", "-Command", command],
            { stdio: "inherit" }
        );

        console.log("Команду запуску Angular виконано.");
    } catch (error) {
        console.error("Помилка запуску Angular:", error);
    }
}

// Запуск команди в окремому вікні CMD у папці Angular-проєкту
function runInNewWindow(projectFolder: string, npxCommand: string): void {
    const angularDirectory = resolve(__dirname, "..", projectFolder);

    const command = `
        Start-Process -FilePath 'cmd.exe'
        -WorkingDirectory '${angularDirectory.replace(/'/g, "''")}'
        -ArgumentList '/k', '${npxCommand}'
    `.replace(/\r?\n/g, " ");

    try {
        execFileSync(
            "powershell.exe",
            ["-NoProfile", "-Command", command],
            { stdio: "inherit" }
        );

        console.log("Команду виконано у новому вікні CMD.");
    } catch (error) {
        console.error("Помилка запуску:", error);
    }
}

// Запуск практичної №7 (тестування Angular компонент)
async function runLab7(): Promise<void> {
    console.log("1 — Запустити тести (Karma + Jasmine у браузері)");
    console.log("2 — Запустити тести з покриттям коду (coverage)");
    console.log("3 — Запустити застосунок (ng serve)");
    console.log("0 — Назад");

    const choice: string = (await rl.question("Введіть номер: ")).trim();

    switch (choice) {
        case "1":
            console.log("Запуск тестів у новому вікні CMD...");
            runInNewWindow("lab7-angular", "npx.cmd ng test");
            break;

        case "2":
            console.log("Запуск тестів з покриттям у новому вікні CMD...");
            runInNewWindow("lab7-angular", "npx.cmd ng test --code-coverage --watch=false");
            break;

        case "3":
            console.log("Запуск Angular у новому вікні CMD...");
            runInNewWindow("lab7-angular", "npx.cmd ng serve --open --port 4204");
            break;

        case "0":
            break;

        default:
            console.log("Невірний вибір!");
    }
}

// Головне меню
async function main(): Promise<void> {
    try {
        while (true) {
            console.log("\n=================================");
            console.log("     Вибір лаб роботи");
            console.log("=================================");
            console.log("1 — Практична робота №1");
            console.log("2 — Практична робота №2");
            console.log("3 — Практична робота №3 (Angular)");
            console.log("4 — Практична робота №4 (Angular)");
            console.log("5 — Практична робота №5 (Angular)");
            console.log("6 — Практична робота №6 (Angular + Ionic Storage)");
            console.log("7 — Практична робота №7 (Тестування Angular)");
            console.log("0 — Вихід");
            console.log("=================================");

            const choice: string =
                (await rl.question("Введіть номер: ")).trim();

            switch (choice) {
                case "1":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №1 ===\n");
                    runLab1();
                    break;

                case "2":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №2 ===\n");
                    runLab2();
                    break;

                case "3":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №3 ===\n");
                    console.log("Запуск Angular у новому вікні CMD...");
                    runLab3();
                    break;

                case "4":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №4 ===\n");
                    console.log("Запуск Angular у новому вікні CMD...");
                    runLab4();
                    break;

                case "5":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №5 ===\n");
                    console.log("Запуск Angular у новому вікні CMD...");
                    runLab5();
                    break;

                case "6":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №6 ===\n");
                    console.log("Запуск Angular у новому вікні CMD...");
                    runLab6();
                    break;

                case "7":
                    console.log("\n=== ПРАКТИЧНА РОБОТА №7 ===\n");
                    await runLab7();
                    break;

                case "0":
                    console.log("Завершення програми.");
                    return;

                default:
                    console.log("Невірний вибір! Введіть число від 0 до 7.");
            }
        }
    } finally {
        rl.close();
    }
}

void main().catch((error: unknown): void => {
    console.error("Помилка виконання:", error);
    process.exitCode = 1;
});
