class Feat {
    constructor(name, text, uses, regain = "LR", isHidden = false) {
        this.name = name;
        this.text = text;
        this.uses = uses;
        this.regain = regain;
        this.isHidden = isHidden;
        if (this.currentUses === undefined) this.currentUses = uses;
    }

    toHtml(isLast = false) {
        let containerClass = "row gx-0";
        if (this.isHidden) {
            containerClass += " d-none";
        }

        let topLevelClassExtension = isLast ? "" : " border-bottom-0";

        let container = $("<div>", { class: containerClass });

        let nameOuterDiv = $("<div>", { class: "col border border-black border-2 border-end-0" + topLevelClassExtension });
        let nameInnerDiv = $("<div>", { class: "position-relative top-50 start-50 translate-middle" }).html(this.name);
        nameOuterDiv.append(nameInnerDiv);
        container.append(nameOuterDiv);

        if (this.uses > 0) {
            let usesOuterDiv = $("<div>", { class: "col-1 border border-black border-2 border-end-0" + topLevelClassExtension });
            let usesInnerDiv = $("<div>", { class: "position-relative top-50 start-50 translate-middle" });
            let usesSpan = $("<span>").html(this.currentUses);
            usesInnerDiv.append(usesSpan);
            usesOuterDiv.append(usesInnerDiv);
            container.append(usesOuterDiv);

            let useDiv = $("<div>", { class: "col-2 border border-black border-2 border-end-0" + topLevelClassExtension });
            let useButton = $("<button>", { class: "btn btn-secondary rounded-0 w-100 h-100", type: "button" });
            let useButtonText = $("<span>", { class: "mx-auto" }).html("Use");
            useButton.append(useButtonText);
            useDiv.append(useButton);
            container.append(useDiv);

            let that = this;
            useButton.on("click", function () {
                that.currentUses = (Number(usesSpan.text()) - 1).clamp(0, that.uses);
                usesSpan.text(that.currentUses);
                Storage.db.feats.update(that.id, { currentUses: that.currentUses });
            });

            let restoreDiv = $("<div>", { class: "col-2 border border-black border-2 border-end-0" + topLevelClassExtension });
            let restoreButton = $("<button>", { class: "btn btn-secondary rounded-0 w-100 h-100", type: "button" });
            let restoreButtonText = $("<span>", { class: "mx-auto" }).html(this.regain);
            restoreButton.append(restoreButtonText);
            restoreDiv.append(restoreButton);
            container.append(restoreDiv);

            restoreButton.on("click", function () {
                that.currentUses = that.uses;
                usesSpan.text(that.uses);
                Storage.db.feats.update(that.id, { currentUses: that.currentUses });
            });
        }

        let divider = $("<div>", { class: "w-100" });
        container.append(divider);

        let descriptionClassExtension = isLast ? " border-top-0" : " border-bottom-0";
        let descriptionContainer = $("<div>", { class: "col-12 border border-black border-2 hide-later" + descriptionClassExtension });
        let description = $("<div>", { class: "p-2" }).html(this.text);

        descriptionContainer.append(description);
        container.append(descriptionContainer);
        nameOuterDiv.on("click", function () {
            descriptionContainer.toggle();
        });
        return container;
    }
}
