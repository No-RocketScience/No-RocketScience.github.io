class Form {
    constructor(name, text, enabled) {
        this.name = name;
        this.text = text;
        this.enabled = enabled;
    }

    toString() {
        return this.name;
    }

    htmlId() {
        return "form-" + this.name.toLowerCase();
    }

    generateButton() {
        let button = $("<input>", {
            type: "radio",
            class: "btn-check",
            name: "btnradio",
            id: this.htmlId(),
            autocomplete: "off"
        });

        button.prop("checked", this.enabled);

        let id = this.id;
        button.on("click", function () {
            Storage.db.forms.toCollection().modify(form => {
                let state = form.id == id;
                form.enabled = state;
                $("#form-" + form.name.toLowerCase()).prop("checked", state);
                $("#info-form-" + form.name.toLowerCase()).prop("hidden", !state);
            });
        });

        return button;
    }

    generateLabel() {
        let label = $("<label>", {
            class: "btn btn-outline-secondary rounded-0",
            for: this.htmlId()
        }).html(this.name);
        return label;
    }

    generateText() {
        let span = $("<span>", {
            id: "info-" + this.htmlId(),
            hidden: !this.enabled
        }).html(this.text);
        return span;
    }
}