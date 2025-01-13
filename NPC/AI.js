/** @format */

const Main = new NativeClass('Terraria', 'Main');
const NPC = new NativeClass('Terraria', 'NPC');

/**
 * Randomly determines if an event should occur based on a given chance percentage.
 *
 * @param {number} chance - The chance percentage (0 to 100) for the event to occur.
 * @returns {boolean} - True if the event occurs, otherwise false.
 */
function randomChance(chance) {
	return Math.random() * 100 < chance;
}

/**
 * Hooks into the AI method of NPCs to modify their behavior dynamically.
 * Specifically, this hook monitors the behavior of Slime NPCs (type 1) and
 * gives them a 10% chance to steal the item held by the player when certain conditions are met.
 * Additionally, the `ai[1]` property of the Slime is used to store the type of the item that will be dropped
 * when the Slime dies.
 *
 * The following checks are performed:
 * - The NPC is a Slime (type 1).
 * - The NPC has not been spawned by a statue (`!self.SpawnedFromStatue`).
 * - The NPC intersects with the player's hitbox.
 * - The NPC has a 10% chance (as specified by the `randomChance` function) to steal the item.
 *
 * If these conditions are met, the NPC will steal the item from the player's hand.
 * The item is removed from the player's hand, and the NPC stores its type in `ai[1]`, which will later be
 * used to drop the item when the Slime dies.
 *
 * @param {Function} original - The original AI method of the NPC, preserving default behavior.
 * @param {object} self - The NPC object being modified (in this case, a Slime of type 1).
 *
 */
NPC.AI.hook((original, self) => {
	original(self);

	// Check if the NPC is a Slime (type 1) and wasn't spawned from a statue
	if (self.type == 1 && self.ai[1] <= 0 && !self.SpawnedFromStatue) {
		// Check if the NPC intersects with the player's hitbox and if the chance condition is met
		if (self.Hitbox['bool Intersects(Rectangle rect)'](Main.player[self.target].Hitbox) && randomChance(10)) {
			const pItem = Main.player[self.target].HeldItem;

			// If the player is holding an item, steal it
			if (pItem.type > 0) {
				// Store the item type in the NPC's ai[1] and remove it from the player's hand
				self.ai[1] = pItem.type;
				pItem.type = 0; // Remove the item from the player's inventory
			}
		}
	}

	/*
	 **Note**: The hook allows the player to modify the behavior of the NPC in any way they choose. You can add
	 * additional checks, modify the NPC's properties, or even change its AI logic, giving full control over the NPC's
	 * actions during this phase.
	 */
});
