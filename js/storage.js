class Storage {
    constructor() {
        Storage.loaded = function () {};
        Storage.db = new Dexie("Storage");

        Storage.db.version(1.1).stores({
            forms: `
            ++id,
            name,
            text,
            isEnabled`,

            infusions: `
            ++id,
            name,
            text,
            attunement,
            enabled,
            isFix,
            isCustom`,

            feats: `
            ++id,
            name,
            text,
            uses,
            regain,
            isHidden`,
        });

        Storage.db.feats.mapToClass(Feat);
        Storage.db.forms.mapToClass(Form);
        Storage.db.infusions.mapToClass(Infusion);

        let forms = [
            new Form("Battle", "+1D4 to Weapon Attacks.<br>Reduce any damage taken by 2.", true),
            new Form("Scout", "+1D4 to all Perception and Investigation checks.<br>Movementspeed +10ft.", false),
            new Form(
                "Worker",
                "+1D4 to all Tool/Strength Checks and Strength Saving Throws.<br>Count as large creature when pulling, pushing or carrying.",
                false,
            ),
        ];

        let infusions = [
            new Infusion(
                "Armor of Resistance",
                "You have resistance to one type (Acid, Cold, Fire, Force, Lightning, Necrotic, Poison, Psychic, Radiant, Thunder) of damage while you wear this armor.",
                true,
            ),
            new Infusion(
                "Bag of Holding",
                "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.<br><br>" +
                    "If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.<br><br>" +
                    "Placing a bag of holding inside an extradimensional space created by a Heward's Handy Haversack, Portable Hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
                false,
            ),
            new Infusion(
                "Belt of Hill Giant Strength",
                "While wearing this belt, your Strength score changes to 21. If your Strength is already equal to or greater than the belt's score, the item has no effect on you.",
                true,
                true,
            ),
            new Infusion(
                "Boots of Speed",
                "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect." +
                    "<br><br>When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest.",
                true,
            ),
            new Infusion(
                "Cloak of the Bat",
                "While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In an area of dim light or darkness, you can grip the edges of the cloak with both hands and use it to fly at a speed of 40 feet. If you ever fail to grip the cloak's edges while flying in this way, or if you are no longer in dim light or darkness, you lose this flying speed.<br>" +
                    "While wearing the cloak in an area of dim light or darkness, you can use your action to cast Polymorph on yourself, transforming into a bat. While you are in the form of the bat, you retain your Intelligence, Wisdom, and Charisma scores. The cloak can't be used this way again until the next dawn.",
                true,
            ),
            new Infusion(
                "Enhanced Defense",
                "A creature gains a +2 bonus to Armor Class while wearing (armor) or wielding (shield) the infused item.",
                false,
                true,
            ),
            new Infusion(
                "Mind Sharpener",
                "The infused item can send a jolt to the wearer to refocus their mind. The item has 4 charges. When the wearer fails a Constitution saving throw to maintain concentration on a spell, the wearer can use its reaction to expend 1 of the item's charges to succeed instead. The item regains 1d4 expended charges daily at dawn.",
                false,
            ),
            new Infusion(
                "Radiant Weapon",
                "This magic weapon grants a +1 bonus to attack and damage rolls made with it. While holding it, the wielder can take a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet. The wielder can extinguish the light as a bonus action.<br><br>" +
                    "The weapon has 4 charges. As a reaction immediately after being hit by an attack, the wielder can expend 1 charge and cause the attacker to be blinded until the end of the attacker's next turn, unless the attacker succeeds on a Constitution saving throw against your spell save DC. The weapon regains 1d4 expended charges daily at dawn.",
                true,
            ),
            new Infusion("Ring of Protection", "You gain a +1 bonus to AC and saving throws while wearing this ring.", true, true),
            new Infusion(
                "Slippers of Spider Climbing",
                "While you wear these light shoes, you can move up, down , and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil.",
                true,
            ),
        ];

        let feats = [
            new Feat(
                "Observant",
                "If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.",
                0,
            ),
            new Feat(
                "Strike of the Hill Giant",
                'Once per turn, when I hit with a <a href="#" data-bs-toggle="tooltip" data-bs-title="melee weapon attack">MWA</a> or thrown weapon, the target takes +1d6 damage.<br> It must then make a Str save DC 18 (8 + PB + Str/Con) or be knocked prone.<br> I can do this ' +
                    proficencyBonus +
                    " times per long rest.",
                proficencyBonus,
            ),
            new Feat(
                "Thunderstrike",
                'When hitting with a <a href="#" data-bs-toggle="tooltip" data-bs-title="melee weapon attack">MWA</a>, can be used to create the effect of a Level 3 <a href="https://dnd5e.wikidot.com/spell:thunderwave" target="_blank">Thunderwave</a> (Con-Save within 15 ft. cube, 4d8 Thunder damage, push 20ft away, on save half damage no push).',
                4,
                "Dawn",
            ),
            new Feat(
                "War Caster",
                "Advantage on Concentration Checks.<br>Somatic components of spells with weapons or a shield in hands.<br>Opportunity attack use your reaction to cast a spell off 1 action at the creature.",
                0,
                "",
                true,
            ),
            new Feat(
                "Arcane Jolt",
                "When you hit a target with a magic weapon attack or your Arcane Limb, you can channel magical energy through the strike to create one of the following two effects: The target takes an extra 4d6 force damage OR one creature or object you can see within 30 feet of the target restores 4d6 hit points. You can use this feature a number of times equal to your Intelligence modifier (minimum of once), but you can do so no more than once on a turn. You regain all expended uses when you finish a long rest.",
                intelligenceModifier,
            ),
            new Feat(
                "Arcane Limb Restore",
                "You can use your action to regain 2D8+" +
                    proficencyBonus +
                    " temporary HP, thus healing the Arcane Limb in the process. This healing can be used up to three times per long rest.",
                3,
            ),
            new Feat(
                "Boots of Speed",
                "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect.<br> When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest.",
                10 * 10,
            ),
            new Feat(
                "Cloak of the Bat (Polymorph)",
                "While wearing the cloak in an area of dim light or darkness, you can use your action to cast Polymorph on yourself, transforming into a bat. While you are in the form of the bat, you retain your Intelligence, Wisdom, and Charisma scores. The cloak can't be used this way again until the next dawn.",
                1,
                "Dawn",
            ),
            new Feat(
                "Flash of Power",
                "When you or another creature of darkness you can see within 30 feet of you makes an ability check or a saving throw, you can use your Reaction to add your Intelligence modifier to the roll. You can use this feature a number of times equal to your Intelligence modifier (minimum of once). You regain all expended uses when you finish a long rest.",
                intelligenceModifier,
            ),
            new Feat(
                "Juggernaut Rune",
                "you can, as a Bonus Action, empower the flow of arcane energy coursing through your body of magical metal. Your whole form shivers and stretches, until you are about 12 feet tall (size category large). While you are this size, you gain advantage on all Strength Checks and Strength Saving Throws, your melee range increases to 10 feet, and all your melee attacks deal an additional 1D6 damage. The Juggernaut Rune is active for one minute or until you choose to deactivate it as a Bonus Action. While it is active, your size cannot increase further. You can use this feature a number of times equal to your Proficiency Bonus and regain all uses when you finish a Long Rest.",
                proficencyBonus,
            ),
            new Feat(
                "Mind Sharpener",
                "The infused item can send a jolt to the wearer to refocus their mind. The item has 4 charges. When the wearer fails a Constitution saving throw to maintain concentration on a spell, the wearer can use its reaction to expend 1 of the item's charges to succeed instead. The item regains 1d4 expended charges daily at dawn.",
                4,
                "Dawn",
            ),
            new Feat(
                "Radiant Weapon",
                "This magic weapon grants a +1 bonus to attack and damage rolls made with it. While holding it, the wielder can take a bonus action to cause it to shed bright light in a 30-foot radius and dim light for an additional 30 feet. The wielder can extinguish the light as a bonus action. <br> The weapon has 4 charges. As a reaction immediately after being hit by an attack, the wielder can expend 1 charge and cause the attacker to be blinded until the end of the attacker's next turn, unless the attacker succeeds on a Constitution saving throw against your spell save DC. The weapon regains 1d4 expended charges daily at dawn.",
                4,
                "Dawn",
            ),
        ];

        let infusionFeatMappings = {
            "Boots of Speed": ["Boots of Speed"],
            "Cloak of the Bat": ["Cloak of the Bat (Polymorph)"],
            "Mind Sharpener": ["Mind Sharpener"],
            "Radiant Weapon": ["Radiant Weapon"],
        };

        let promises = [];

        forms.forEach(function (form) {
            promises.push(
                Storage.db.forms
                    .where("name")
                    .equals(form.name)
                    .count((count) => {
                        if (count === 0) {
                            return Storage.db.forms.add(form);
                        }
                    }),
            );
        });

        feats.forEach(function (feat) {
            promises.push(
                Storage.db.feats
                    .where("name")
                    .equals(feat.name)
                    .count((count) => {
                        if (count === 0) {
                            console.log("adding " + feat.name);
                            return Storage.db.feats.add(feat);
                        }
                    }),
            );
        });

        Promise.all(promises).then((_) => {
            let innerPromises = [];
            infusions.forEach(function (infusion) {
                innerPromises.push(
                    Storage.db.infusions
                        .where("name")
                        .equals(infusion.name)
                        .count((count) => {
                            if (count === 0) {
                                return Storage.db.infusions.add(infusion).then(async (infusionId) => {
                                    let featMappings = infusionFeatMappings[infusion.name];
                                    console.log(infusion.name + " got infusionid " + infusionId + " and feats " + featMappings);
                                    if (featMappings === undefined || featMappings.length === 0) {
                                        return;
                                    }

                                    for (let i in featMappings) {
                                        let feat = featMappings[i];
                                        console.log("adding feat to enabled feats: " + feat);
                                        let dbFeat = (await Storage.db.feats.where("name").equals(feat).toArray())[0];
                                        console.log(infusion.name + " got feat " + feat + " from db: " + dbFeat);
                                        infusion.enablingFeats.push(dbFeat.id);
                                    }

                                    console.log("Updating infusion " + infusion.name + " with enabling feats " + infusion.enablingFeats);
                                    await Storage.db.infusions.update(infusionId, { enablingFeats: infusion.enablingFeats });
                                });
                            }
                        }),
                );
            });

            Promise.all(innerPromises).then(() => {
                console.log("storage loaded!");
                Storage.loaded();
            });
        });
    }
}

Storage.instance = new Storage();
