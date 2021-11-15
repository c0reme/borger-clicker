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

function unitify(number, decimals = 1) {
    if (number < Math.pow(10, 3)) return number.toLocaleString('en-US');
    else if (number < Math.pow(10, 6)) return `${(number.toFixed(decimals) /  Math.pow(10, 3)).toLocaleString('en-US')}K`;
    else if (number < Math.pow(10, 9)) return `${(number.toFixed(decimals) /  Math.pow(10, 6)).toLocaleString('en-US')}M`;
    else if (number < Math.pow(10, 12)) return `${(number.toFixed(decimals) / Math.pow(10, 9)).toLocaleString('en-US')}B`;
    else if (number < Math.pow(10, 15)) return `${(number.toFixed(decimals) / Math.pow(10, 12)).toLocaleString('en-US')}t`;
    else if (number < Math.pow(10, 18)) return `${(number.toFixed(decimals) / Math.pow(10, 15)).toLocaleString('en-US')}q`;
    else if (number < Math.pow(10, 21)) return `${(number.toFixed(decimals) / Math.pow(10, 18)).toLocaleString('en-US')}Q`;
}

class GameSystem {
    async init() {
        if (typeof Storage === 'undefined') {
            alert('Sadly, your browser does not support web storage.');
        } else {
            if (!localStorage.upgrades) this.upgrades = { borgerboy: 0 }
            if (!localStorage.bps) this.bps = 0;
            if (!localStorage.borgers) this.borgers = 0;
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
}

var Game = new GameSystem();
$(async () => {
    await Game.init(); // Initalises the game.
    let temp = Game.borgers;
    setInterval(() => {
        Game.addBorgers(Game.bps / 100);
    }, 10)
    setInterval(() => {
        if (Game.borgers >  0) {
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