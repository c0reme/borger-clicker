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
    if (!localStorage[key]) localStorage[key] = '';
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

function unitify(number = 0, decimals = 1) {
    if (number < Math.pow(10, 3)) return number.toLocaleString('en-US');
    else if (number < Math.pow(10, 6)) return `${(number / Math.pow(10, 3)).toFixed(decimals)}K`; // (K) Thousand - 10^3 
    else if (number < Math.pow(10, 9)) return `${(number / Math.pow(10, 6)).toFixed(decimals)}M`; // (M) Million - 10^6
    else if (number < Math.pow(10, 12)) return `${(number / Math.pow(10, 9)).toFixed(decimals)}B`; // (B) Billion - 10^9
    else if (number < Math.pow(10, 15)) return `${(number / Math.pow(10, 12)).toFixed(decimals)}t`; // (t) trillion - 10^12
    else if (number < Math.pow(10, 18)) return `${(number / Math.pow(10, 15)).toFixed(decimals)}q`;
    else if (number < Math.pow(10, 21)) return `${(number / Math.pow(10, 18)).toFixed(decimals)}Q`;
    else if (number < Math.pow(10, 24)) return `${(number / Math.pow(10, 21)).toFixed(decimals)}s`;
    else if (number < Math.pow(10, 27)) return `${(number / Math.pow(10, 24)).toFixed(decimals)}S`;
    else if (number < Math.pow(10, 30)) return `${(number / Math.pow(10, 27)).toFixed(decimals)}o`;
    else if (number < Math.pow(10, 33)) return `${(number / Math.pow(10, 30)).toFixed(decimals)}n`;
    else if (number < Math.pow(10, 36)) return `${(number / Math.pow(10, 33)).toFixed(decimals)}d`;
    else if (number < Math.pow(10, 39)) return `${(number / Math.pow(10, 36)).toFixed(decimals)}U`;
    else return number.toLocaleString('en-US');
}

class GameSystem {
    async init() {
        if (typeof Storage === 'undefined') {
            alert('Sadly, your browser does not support web storage.');
        } else {
            if (!localStorage.upgrades) this.upgrades = { clickers: 0 }
            if (!localStorage.bps) this.bps = 0;
            if (!localStorage.borgers) this.borgers = 0;
            if (!localStorage.click_amount) this.click_amount = 1;
        }
        $('#bps').text(unitify(this.bps));
        $('#borgers').text(unitify(this.borgers));
    }

    get borgers() { return get('borgers') }
    set borgers(value) {
        set('borgers', value)
        $('#borgers').text(unitify(this.borgers))
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
        $('#bps').text(unitify(this.bps))
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

    get click_amount() { return get('click_amount') };
    set click_amount(value) { set('click_amount', value) }
}

var Game = new GameSystem();
$(async () => {
    await Game.init(); // Initalises the game.
    let temp = Game.borgers;
    setInterval(() => {
        Game.addBorgers(Game.bps / 100);
    }, 10)
    setInterval(() => {
        if (Game.borgers > 0) {
            $('title').text(`${unitify(Game.borgers)} borgers ∙ Borger Clicker by Cammy`)
        } else {
            $('title').text(`Borger Clicker by Cammy`)
        }
        $('#bps').text(unitify(Game.borgers - temp));
        setTimeout(() => {
            temp = Game.borgers;
        }, .01)
    }, 1000)
})