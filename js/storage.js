class Storage {
    constructor() {
        Storage.forms = [
            new Form("Battle", "+1D4 to Weapon Attacks.<br>Reduce any damage taken by 2.", true),
            new Form("Scout", "+1D4 to all Perception and Investigation checks.<br>Movementspeed +10ft.", false),
            new Form("Worker", "+1D4 to all Tool/Strength Checks and Strength Saving Throws.<br>Count as large creature when pulling, pushing or carrying.", false)
        ];
        Storage.infusions = [
            new Infusion("Armor of Resistance",
                "You have resistance to one type (Acid, Cold, Fire, Force, Lightning, Necrotic, Poison, Psychic, Radiant, Thunder) of damage while you wear this armor.",
                true),
            new Infusion("Bag of Holding",
                "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.<br><br>" +
                "If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.<br><br>" +
                "Placing a bag of holding inside an extradimensional space created by a Heward's Handy Haversack, Portable Hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
                false),
            new Infusion("Belt of Hill Giant Strength",
                "While wearing this belt, your Strength score changes to 21. If your Strength is already equal to or greater than the belt's score, the item has no effect on you.",
                true,
                true),
            new Infusion("Boots of Speed",
                "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect." +
                "<br><br>When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest.",
                true),
            new Infusion("Cloak of the Bat",
                "While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In an area of dim light or darkness, you can grip the edges of the cloak with both hands and use it to fly at a speed of 40 feet. If you ever fail to grip the cloak's edges while flying in this way, or if you are no longer in dim light or darkness, you lose this flying speed.<br>" +
                "While wearing the cloak in an area of dim light or darkness, you can use your action to cast Polymorph on yourself, transforming into a bat. While you are in the form of the bat, you retain your Intelligence, Wisdom, and Charisma scores. The cloak can't be used this way again until the next dawn.",
                true),
            new Infusion("Enhanced Defense",
                "A creature gains a +2 bonus to Armor Class while wearing (armor) or wielding (shield) the infused item.",
                false,
                true),
            new Infusion("Mind Sharpener",
                "The infused item can send a jolt to the wearer to refocus their mind. The item has 4 charges. When the wearer fails a Constitution saving throw to maintain concentration on a spell, the wearer can use its reaction to expend 1 of the item's charges to succeed instead. The item regains 1d4 expended charges daily at dawn.",
                false),
            new Infusion("Radiant Weapon",
                "This magic weapon grants a +1 bonus to attack and damage rolls made with it. While holding it, the wielder can take a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet. The wielder can extinguish the light as a bonus action.<br><br>" +
                "The weapon has 4 charges. As a reaction immediately after being hit by an attack, the wielder can expend 1 charge and cause the attacker to be blinded until the end of the attacker's next turn, unless the attacker succeeds on a Constitution saving throw against your spell save DC. The weapon regains 1d4 expended charges daily at dawn.",
                true),
            new Infusion(
                "Ring of Protection",
                "You gain a +1 bonus to AC and saving throws while wearing this ring.",
                true,
                true),
            new Infusion("Slippers of Spider Climbing",
                "While you wear these light shoes, you can move up, down , and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil.",
                true),
        ];

        let stored_custom_infusions = JSON.parse(localStorage.getItem("customInfusions"));
        let custom_infusions = [];
        if (stored_custom_infusions != null) {
            $.each(stored_custom_infusions, function (index) {
                let infusion = stored_custom_infusions[index];
                custom_infusions.push(new Infusion(infusion.name, infusion.text, infusion.attunement, false, true));
            });
            Storage.infusions = custom_infusions.concat(Storage.infusions);
        }

        console.log("storage loaded!");
    }
}

Storage.instance = new Storage();