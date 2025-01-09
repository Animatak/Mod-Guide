const NPC = new NativeClass('Terraria', 'NPC');
const NPCID = new NativeClass('Terraria.ID', 'NPCID');

/**
 * @summary
 * Allows you to modify the default settings of an NPC, such as its life, damage, and other properties,
 * dynamically during the initialization process.
 *
 * @param {Function} original - The original SetDefaults method, preserving default NPC behavior.
 * @param {object} npc - The NPC object being modified.
 * @param {number} type - The type of the NPC being initialized.
 * @param {object} spawnparans - Parameters used during the NPC spawn process.
 */

/**
 * Hook to modify NPC properties during the SetDefaults process.
 */
NPC.SetDefaults.hook((original, npc, Type, spawnparans) => {
	// Preserve the original behavior of the NPC
	original(npc, Type, spawnparans);

	/**
	 * Switch block to modify specific NPC types.
	 */
	switch (Type) {
		case 1: // Blue Slime
		case 2: // Demon Eye
		case 3: // Zombie
			npc.life = npc.lifeMax *= 3; // Sets life and lifeMax to 3x their original value.
			npc.damage *= 2; // Multiplies the Damage dealt to the Player by 2.
			break;
	}

	/**
	 * Example of handling a specific NPC type (type == 22).
	 * NPC Guide has 250 Life, and when spawned, it will have 500.
	 */

	// You can use NPCID to get the Type.
	// Example: NPCID.Guide will return the Type 22.
	if (Type == 22) {
		// Correctly multiplies both life and lifeMax to avoid inconsistencies.
		npc.life = npc.lifeMax *= 2;
	}
});
