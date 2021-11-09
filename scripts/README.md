## Game system
The game system is created using [JavaScipt Classes - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), the class is delared in [GameSystem.js](./GameSystem.ts), please use the syntax of `Game` when you are using the system in the console.

Example *(read [BorgerPerSecond](#bps-borgers-per-second) for more information)*:
```typescript
    Game.bps = 100000;
```
* [Syntaxes](#syntaxes)
    * [`Game.addBorgers()`](#addborgers) => returns `number`
    * [`Game.removeBorgers()`](#removeborgers) => returns `number`
    * [`Game.bps`](#bps-borgers-per-second) => returns `number`
    * [`Game.addUpgrade()`](#addUpgrade) => returns `string`
    * [`Game.removeUpgrade()`](#removeUpgrade) => returns `string`
### Syntaxes
* #### `addBorgers()`
    Adds the amount of borgers to the user's browser storage.

    ```typescript
        // Syntax
        Game.addBorgers(amount: number);
        // Usage example
        Game.addBorgers(999999999); // Adds 999,999,999 borgers
    ```
* #### `removeBorgers()`
    Removes the amount of borgers from the user's browser storage.

    ```typescript
        // Syntax
        Game.removeBorgers(amount: number);
        // Usage example
        Game.removeBorgers(999999999); // Removes 999,999,999 borgers
    ```
* #### `bps` (Borgers per Second)
    Borgers per second defines the amount of borgers gained every second depending on this value.

    ```typescript
        // Syntax
        Game.bps = value: number;
        // Usage example
        Game.bps = 100000; // The amount of borgers second is now 100,000
    ```
* #### `addUpgrade()`
    Adds an upgrade or upgrades to the `<key>` provided.

    ```typescript
        // Syntax
        Game.addUpgrade(key: string, amount: number);  
        // Usage example
        Game.addUpgrade("borgerboy", 5); // Adds 5 borger boy upgrades
    ```
* #### `removeUpgrade()`
    Removes an upgrade or upgrades from the `<key>` provided.

    ```typescript
        // Syntax
        Game.removeUpgrade(key: string, amount: number);  
        // Usage example
        Game.removeUpgrade("borgerboy", 5); // Removes 5 borger boy upgrades
    ```
