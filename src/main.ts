
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
        -ArgumentList '/k', 'npx.cmd ng serve --open'
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


async function main(): Promise<void> {
    try {
        while (true) {
            console.log("\n=================================");
            console.log("     Вибір лаб роботи");
            console.log("=================================");
            console.log("1 — Практична робота №1");
            console.log("2 — Практична робота №2");
            console.log("3 — Практична робота №3 (Angular)");
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
                    console.log("Запуск Angular у новому вікні PowerShell...");
                    runLab3();
                    break;

                case "0":
                    console.log("Завершення програми.");
                    return;

                default:
                    console.log("Невірний вибір! Введіть 0, 1, 2 або 3.");
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
