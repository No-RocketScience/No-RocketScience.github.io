Storage.loaded = async function () {
    let promises = [];
    promises.push(addFeats());
    promises.push(addForms());
    initializeSpellInfusedItem();
    promises.push(addInfusions());

    await Promise.all(promises);

    Infusion.updateAttunedItems();
    Infusion.updateInfusedItems();

    initializeTooltips();
};

function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
    $(".hide-later").hide();
}

function addFeats() {
    return Storage.db.feats.toArray((feats) => {
        feats
            .sort((a, b) => {
                if ((a.uses > 0 && b.uses > 0) || (a === 0 && b === 0)) {
                    return a.name.localeCompare(b.name);
                }

                return a.uses > 0 ? -1 : 1;
            })
            .forEach((feat, index) => $("#feats").append(feat.toHtml(feats.length - 1 === index)));
    });
}

function addForms() {
    return Storage.db.forms.each((form) => {
        $("#forms").append(form.generateButton());
        $("#forms").append(form.generateLabel());
        $("#forms-info").append(form.generateText());
    });
}

function initializeSpellInfusedItem() {
    let options = {
        "1st Level": [
            "Bane",
            "Cause Fear",
            "Comprehend Languages",
            "Earth Tremor",
            "Faerie Fire",
            "Fog Cloud",
            "Longstrider",
            "Tasha's Caustic Brew",
            "Tasha's Hideous Laughter",
        ],
        "2nd Level": [
            "Arcane Lock",
            "Blindness/Deafness",
            "Borrowed Knowledge",
            "Darkness",
            "Earthbind",
            "Enlarge/Reduce",
            "Heat Metal",
            "Hold Person",
            "Silence",
            "Mental Barrier",
            "Mind Spike",
            "Tasha's Mind Whip",
        ],
    };

    let selectedSpell = localStorage.getItem("spell-infused-item");

    for (let level of Object.keys(options)) {
        let optionsGroup = $("<optgroup>", { label: level });
        options[level].forEach((element) => {
            let option = $("<option>", { value: element });
            option.html(element);
            if (element === selectedSpell) {
                option.prop("selected", true);
            }
            optionsGroup.append(option);
        });

        $("#select-spell-infused-item").append(optionsGroup);
    }

    $("#select-spell-infused-item").on("change", function () {
        localStorage.setItem("spell-infused-item", $("#select-spell-infused-item option:selected").text());
    });

    $("#spell-infused-item-reset").on("click", function () {
        $("#spell-infused-item-used").text(0);
        localStorage.setItem("spell-infused-item-used", 0);
    });

    $("#spell-infused-item-use").on("click", function () {
        let used = (Number($("#spell-infused-item-used").text()) + 1).clamp(0, 10);
        localStorage.setItem("spell-infused-item-used", used);
        $("#spell-infused-item-used").text(used);
    });

    let used = localStorage.getItem("spell-infused-item-used");
    $("#spell-infused-item-used").text(used);
}

function addInfusions() {
    return Storage.db.infusions
        .each((infusion) => {
            $("#container").append(infusion.generateHtml(false));
        })
        .then(function () {
            addInfusionAdder();
        });
}

function addInfusion() {
    let name = $("#new-infusion-name").val();
    let text = $("#new-infusion-text").val();
    let attunement = $("#new-infusion-attunement").prop("checked");
    let infusion = new Infusion(name, text, attunement, false, true);
    Storage.db.infusions.add(infusion);
    $("#container .infusion").first().before(infusion.generateHtml(false));
    $("#new-infusion-name").val("");
    $("#new-infusion-text").val("");
}

function addInfusionAdder() {
    let row = $("<div>", {
        class: "row bg-dark-subtle g-0 border border-3 border-black align-middle",
    });

    let input_group_name = $("<div>", { class: "input-group rounded-0" });
    let infusion_name_span = $("<span>", { class: "input-group-text rounded-0" }).html("Name");
    let infusion_name = $("<input>", { id: "new-infusion-name", class: "form-control rounded-0", type: "text" });
    let infusion_attunement = $("<input>", { id: "new-infusion-attunement", class: "btn-check", type: "checkbox", autocomplete: "off" });
    let infusion_attunement_label = $("<label>", { class: "btn btn-outline-secondary col-3 rounded-0", for: "new-infusion-attunement" }).html(
        "Attunement",
    );
    input_group_name.append(infusion_name_span);
    input_group_name.append(infusion_name);
    input_group_name.append(infusion_attunement);
    input_group_name.append(infusion_attunement_label);

    let input_group_textarea = $("<div>", { class: "input-group" });
    let infusion_text = $("<textarea>", { class: "form-control rounded-0", id: "new-infusion-text" });
    let infusion_textarea_span = $("<span>", { class: "input-group-text rounded-0" }).html("Text");
    input_group_textarea.append(infusion_textarea_span);
    input_group_textarea.append(infusion_text);

    let add_button = $("<button>", { type: "button", class: "col btn btn-secondary rounded-0" }).html("Add");
    add_button.prop("checked", true);
    add_button.on("click", addInfusion);
    row.append(input_group_name);
    row.append(input_group_textarea);
    row.append(add_button);
    $("#container").append(row);
}

function applyData() {
    var infusionData = {};
    $.each(Storage.infusions, function (index) {
        let infusion = Storage.infusions[index];
        let value = infusion.isFix ? true : localStorage.getItem("infusion-" + infusion.index) === "true";
        infusionData["infusion-" + infusion.index] = value;
    });

    $.each(infusionData, function (infusion) {
        if (infusion.startsWith("infusion") || infusion.startsWith("form")) {
            applyInfusionAndFormData(infusionData, infusion);
        }
    });
}

function applyInfusionAndFormData(infusions, infusion) {
    $("#" + infusion).prop("checked", infusions[infusion]);
    setFormOrInfusion(infusion, infusions[infusion]);
}

function setFormOrInfusion(id, value) {
    localStorage.setItem(id, value);
    if (id.indexOf("infusion") != -1) {
        let attunedItems = Storage.infusions.filter((inf, _i, _a) => {
            return inf.attunement && $("#infusion-" + inf.index).prop("checked");
        }).length;
        $("#current-attuned-items").text(attunedItems);

        let infusedItems = Storage.infusions.filter((inf, _i, _a) => {
            return !inf.isCustom && $("#infusion-" + inf.index).prop("checked");
        }).length;
        $("#current-infused-items").text(infusedItems);
    }
}
