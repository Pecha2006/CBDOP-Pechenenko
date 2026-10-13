
export function createCustomerID(name: string, id: number): string {
    if (name.trim() === "") {
        throw new Error("Ім'я замовника не може бути порожнім");
    }

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("ID повинен бути додатним цілим числом");
    }

    return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    if (name.trim() === "") {
        throw new Error("Ім'я замовника не може бути порожнім");
    }

    if (age !== undefined && (!Number.isInteger(age) || age < 0)) {
        throw new Error("Вік повинен бути невід'ємним цілим числом");
    }

    if (city !== undefined && city.trim() === "") {
        throw new Error("Назва міста не може бути порожньою");
    }

    console.log(`Замовник: ${name}`);

    if (age !== undefined) {
        console.log(`Вік: ${age}`);
    }

    if (city !== undefined) {
        console.log(`Місто: ${city}`);
    }
}
