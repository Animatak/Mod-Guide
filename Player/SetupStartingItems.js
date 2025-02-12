/*
 * Modifying the Player's Starting Items
 *
 * This code modifies the player's starting inventory when creating a new character,
 * adding tools, weapons, and resources directly to the inventory.
 *
 */

const GUIPlayerCreateMenu = new NativeClass('', 'GUIPlayerCreateMenu');
const Main = new NativeClass('Terraria', 'Main');

const Item = new NativeClass('Terraria', 'Item');
const ItemID = new NativeClass('Terraria.ID', 'ItemID');
const PrefixID = new NativeClass('Terraria.ID', 'PrefixID');

const SetDefaults = Item['void SetDefaults(int Type)'];

// Creating a hook to modify the player's starting items
GUIPlayerCreateMenu.SetupStartingItems.hook((original, self) => {
	original(self); // Keeps the original game behavior

	// Get the player being created
	const player = Main.PendingPlayer;

	// Index of the first available slot in the inventory
	let Slot = 0;

	/*
	 * If you don’t want to replace the default starting items,
	 * Just remove the "/*" at the beginning and end
	 */

	/* 
    for (let i = 0; i < 40; i++) { // The main inventory has 40 slots
        const item = player.inventory[i];
        if (item.type > 0) {
            Slot++; // Move to the next free slot
        }
    } 
    */

	/*
	 * Adding New Items to the Inventory
	 */
	let inventory = player.inventory;

	/*
	 * It is not mandatory to use ItemID or PrefixID
	 * You can use the ID that represents each Item or Prefix.
	 * Examples:
	 * SetDefaults(inventory[Slot], 1); Iron Pickaxe
	 * inventory[Slot++].Prefix(83); Legendary
	 */

	/*
	 * 1. Iron Broadsword with the "Legendary" Prefix
	 */
	SetDefaults(inventory[Slot], ItemID.IronBroadsword); // Sets the item as an Iron Broadsword
	inventory[Slot++].Prefix(PrefixID.Legendary); // Applies the "Legendary" prefix

	/*
	 * 2. Iron Pickaxe with the "Legendary" Prefix
	 */
	SetDefaults(inventory[Slot], ItemID.IronPickaxe); // Sets the item as an Iron Pickaxe
	inventory[Slot++].Prefix(PrefixID.Legendary); // Applies the "Legendary" prefix

	/*
	 * 3. Iron Axe with the "Legendary" Prefix
	 */
	SetDefaults(inventory[Slot], ItemID.IronAxe); // Sets the item as an Iron Axe
	inventory[Slot++].Prefix(PrefixID.Legendary); // Applies the "Legendary" prefix

	/*
	 * 4. Life Crystal
	 * Helps unlock the Nurse NPC
	 */
	SetDefaults(inventory[Slot++], ItemID.LifeCrystal); // Adds one Life Crystal

	/*
	 * 5. Mana Crystal
	 * Helps increase mana capacity
	 */
	SetDefaults(inventory[Slot++], ItemID.ManaCrystal); // Adds one Mana Crystal

	/*
	 * 6. 50 Silver Coins in the Coin Slot
	 * Helps unlock the Merchant NPC
	 */
	SetDefaults(inventory[50], ItemID.SilverCoin); // Adds Silver Coins to slot 50 (coin slot)
	inventory[50].stack = 50; // 50 Silver Coins
});
