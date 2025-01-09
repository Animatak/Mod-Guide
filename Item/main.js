/** @format */

const Item = new NativeClass('Terraria', 'Item');
const ItemID = new NativeClass('Terraria.ID', 'ItemID');

/**
 * @summary
 * Allows you to modify the default settings of an Item, such as its damage, rarity, and other properties,
 * dynamically during the initialization process.
 *
 * @param {Function} original - The original SetDefaults method, preserving default Item behavior.
 * @param {object} self - The Item object being modified.
 * @param {number} Type - The type of the Item being initialized.
 * @param {boolean} noMatCheck - Determines if material checks should be bypassed.
 * @param {ItemVariant} variant - The specific variant of the Item being initialized.
 */

/**
 * Hook to modify Item properties during the SetDefaults process.
 * It is essential to specify the correct method signature to avoid overload issues.
 *
 * Why specify the method signature?
 * - The `SetDefaults` method is overloaded (has multiple versions), and using a generic reference (`Item.SetDefaults`)
 *   may cause the wrong method to be hooked or lead to runtime errors.
 * - By specifying the full signature, we explicitly target the correct method and ensure the intended behavior.
 */
Item['void SetDefaults(int Type, bool noMatCheck, ItemVariant variant)'].hook((original, self, Type, noMatCheck, variant) => {
	// Preserve the original behavior of the Item
	original(self, Type, noMatCheck, variant);

	/**
	 * Example: Modifying damage for a specific Item type (Type === 1).
	 */
	if (Type == 1) { // Iron Pickaxe
		self.damage = 12; // Sets the damage value of the Iron Pickaxe.

		self.shoot = 1; // Sets the shoot type to Arrow.
		// You can use ProjectileID to specify the type by name.
		// Example: ProjectileID.FireArrow will return Type 2.

		self.shootSpeed = 5; // Sets the projectile's speed.
	}

	/**
	 * Example: Modifying the Wooden Bow using ItemID.
	 */
	if (Type == ItemID.WoodenBow) {
		self.damage *= 3; // Triples the damage of the Wooden Bow.
		self.shootSpeed = 12; // How fast the projectile will be.
	}
});

/**
 * Common mistake: Using the generic hook without specifying the method signature.
 * This could lead to errors due to ambiguity caused by overloaded methods.
 *
 * Example of incorrect usage:
 *
 * Item.SetDefaults.hook((original, item, Type, noMatCheck, variant) => {
 *     // This may not work correctly because the specific SetDefaults method is not identified.
 *     original(item, Type, noMatCheck, variant);
 * });
 */
