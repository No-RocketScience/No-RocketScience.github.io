class Infusion {
    constructor(name, text, attunement, isFix = false, isCustom = false) {
        this.name = name;
        this.text = text;
        this.attunement = attunement;
        this.isFix = isFix;
        this.index = 0;
        this.isCustom = isCustom;
    }

    generateHtml(isLast) {
        let row = $("<div>", {
            class: "row bg-dark-subtle g-0 infusion"
        });
        let left_col = $("<div>", {
            class: "col border border-3 border-black align-middle" + (isLast ? "" : " border-bottom-0")
        });
        let name_div = $("<div>", {
            class: "position-relative top-50 start-50 translate-middle"
        }).html(this.name);
        if (this.attunement) {
            name_div.prepend("<span class=\"badge text-bg-secondary\">A</span>");
        }

        left_col.append(name_div);
        row.append(left_col);

        let right_col = $("<div>", {
            class: "col-3 border border-start-0 border-3 border-black" + (isLast ? "" : " border-bottom-0")
        });
        let btn_group = $("<div>", {
            class: "btn-group w-100",
            role: "group",
            "aria-label": "Basic checkbox toggle button group"
        });
        let btn = $("<input>", {
            type: "checkbox",
            class: "btn-check",
            id: "infusion-" + this.index,
            autocomplete: "off"
        });
        if (this.isFix) {
            btn.prop("checked", true);
            btn.prop("disabled", true);
        }
        btn_group.append(btn);

        let label = $("<label>", {
            class: "btn btn-outline-secondary rounded-0",
            for: "infusion-" + this.index
        }).html("Used");
        btn_group.append(label);
        right_col.append(btn_group);
        row.append(right_col);

        let divider = $("<div>", { class: "w-100" });
        row.append(divider);
        let text_col = $("<p>", { class: "col border border-3 border-black text-start mb-0 " + (isLast ? "border-top-0" : "border-bottom-0") }).html(this.text);
        text_col.hide();
        row.append(text_col);

        left_col.on("click", function () {
            text_col.toggle();
        });

        if (this.isHidden) {
            row.hide();
        }

        return row;
    }

    toString() {
        return JSON.stringify(this);
    }
}