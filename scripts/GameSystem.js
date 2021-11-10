if (typeof Storage === 'undefined') {
    alert('Sadly, your browser does not support web storage.');
} else {
    if (typeof localStorage.upgrades === 'undefined') {
        this.upgrades = {
            borgerboy: 0
        };
    }
    if (typeof localStorage.bps === 'undefined') this.bps = 0;
    if (typeof localStorage.borgers === 'undefined') this.borgers = 0;
}

function get(key) {
    return JSON.parse(localStorage[key]);
}

function set(key, value) {
    localStorage[key] = JSON.stringify(value);
    return JSON.parse(localStorage[key]);
}

function math(key, expression, value) {
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

class GameSystem {
    async init() {
        $('#bps').text((this.bps).valueOf().toLocaleString('en-US'));
        $('#borgers').text((this.borgers).valueOf().toLocaleString('en-US'));
    }

    get borgers() { return get('borgers') }
    set borgers(value) {
        set('borgers', value)
        $('#borgers').text((this.borgers).valueOf().toLocaleString('en-US'));
    }

    /**
     * Adds the amount of borgers to the user's browser storage.
     * @example
     * ```ts
     * Game.addBorgers(999999999);
     * ```
    */
    addBorgers(amount) {
        this.borgers += amount;
        return this.borgers;
    }

    /**
     * Removes the amount of borgers from the user's browser storage.
     * @example
     * ```ts
     * Game.removeBorgers(999999999);
     * ```
    */
    removeBorgers(amount) {
        this.borgers -= amount;
        return this.borgers;
    }

    /**
     * Borgers per second defines the amount of borgers gained every second depending on this value.
     * @example
     * ```ts
     * Game.bps = 100000;
     * ```
     */
    get bps() { return get('bps') }
    set bps(value) {
        set('bps', value)
        $('#bps').text(this.bps.toLocaleString('en-US'))
    }

    /**
     * Adds an upgrade or upgrades to the `key` provided.
     * @example
     * ```ts
     * Game.addUpgrade("borgerboy", 5);
     * ```
     */
    addUpgrade(key, amount) {
        let object = JSON.parse(localStorage['upgrades']);
        object[key] += amount;
        localStorage['upgrades'] = JSON.stringify(object);
        return get('upgrades');
    }

    /**
     * Removes an upgrade or upgrades from the `key` provided.
     * @example
     * ```ts
     * Game.removeUpgrade("borgerboy", 5);
     * ```
     */
    removeUpgrade(key, amount) {
        let object = JSON.parse(localStorage['upgrades']);
        object[key] -= amount;
        localStorage['upgrades'] = JSON.stringify(object);
        return localStorage['upgrades'][key];
    }

    get upgrades() { return get('upgrades') }
    set upgrades(value) { set('upgrades', JSON.stringify(value)) }
}

var Game = new GameSystem();
