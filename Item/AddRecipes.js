const Item = new NativeClass("Terraria", "Item");
const Recipe = new NativeClass("Terraria", "Recipe");

const SetDefaults = Item["void SetDefaults(int Type)"];
const SetupRecipes = Recipe["void SetupRecipes()"];
const AddRecipe = Recipe["void AddRecipe()"];

/**
 * Hook to set up custom recipes in the game.
 * This code adds a new recipe for crafting the Terraprisma.
 */
SetupRecipes.hook((original) => {
    /**
     * Custom recipe setup for the Terraprisma.
     * 
     * The Terraprisma (Item ID: 5005) will be crafted using the specified ingredients.
     */

    // Define the crafted item (Terraprisma).
    SetDefaults(Recipe.currentRecipe.createItem, 5005);
    
    // Set the amount of the crafted item (1 Terraprisma).
    Recipe.currentRecipe.createItem.stack = 1;

    /**
     * Adding required ingredients for the recipe.
     * 
     * Required items are stored in the `requiredItem[]` array, where:
     * - requiredItem[0] is the first ingredient.
     * - requiredItem[1] is the second ingredient.
     * - If more ingredients are added, continue incrementing the index.
     */

    // First ingredient: Dirt Block (ID: 2) - 10 units.
    SetDefaults(Recipe.currentRecipe.requiredItem[0], 2);
    Recipe.currentRecipe.requiredItem[0].stack = 10;

    // Second ingredient: Mushroom (ID: 5) - 1 unit.
    SetDefaults(Recipe.currentRecipe.requiredItem[1], 5);
    Recipe.currentRecipe.requiredItem[1].stack = 1;

    /**
     * Setting the required crafting station.
     * 
     * This recipe requires a Workbench (Tile ID: 18) to be crafted.
     */
    Recipe.currentRecipe.requiredTile[0] = 18;

    // Add the new recipe to the game.
    AddRecipe();

    // Call the original function to ensure other recipes are registered correctly.
    original();
});