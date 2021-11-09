function get(key: string): any {
    return localStorage[key];
}

function set(key: string, value: any): any {
    localStorage[key] = value;
    return localStorage[key];
}

type expressions = { '+': string, '-': string, '*': string, '/': string };

function math(key: string, expression: keyof expressions, value: any): number {
    switch (expression) {
        case '+':
            return set(key, get(key) + value);
        case '-':
            return set(key, get(key) - value);
        case '*':
            return set(key, get(key) * value);
        case '/':
            return set(key, get(key) / value);
    }
}

export class GameSystem {
    constructor() {
        if (typeof Storage === 'undefined') {
            alert('Sadly, your browser does not support web storage.');
        }
    }

    /**
     * Adds the amount of borgers to the user's browser storage.
     * @example
     * ```ts
     * Game.addBorgers(999999999);
     * ```
    */
    addBorgers(amount: number): number {
        return math('borgers', '+', amount);
    }

    /**
     * Removes the amount of borgers from the user's browser storage.
     * @example
     * ```ts
     * Game.removeBorgers(999999999);
     * ```
    */
    removeBorgers(amount: number): number {
        return math('borgers', '-', amount);
    }

    /**
     * Borgers per second defines the amount of borgers gained every second depending on this value.
     * @example
     * ```ts
     * Game.bps = 100000;
     * ```
     */
    get bps(): number { return get('bps') }
    set bps(value: number) { set('bps', value) }

    /**
     * Adds an upgrade or upgrades to the `key` provided.
     * @example
     * ```ts
     * Game.addUpgrade("borgerboy", 5);
     * ```
     */
    addUpgrade(key: string, amount: number) {
        return math(key, '+', amount);
    }

    /**
     * Removes an upgrade or upgrades from the `key` provided.
     * @example
     * ```ts
     * Game.removeUpgrade("borgerboy", 5);
     * ```
     */
    removeUpgrade(key: string, amount: number) {
        return math(key, '-', amount);
    }
}
