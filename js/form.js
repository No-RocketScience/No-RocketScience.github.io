class Form {
    constructor(name, text, enabled) {
        this.name = name;
        this.text = text;
        this.enabled = enabled;
    }

    id() {
        return "form-" + this.name.toLowerCase();
    }

    generateButton() {
        this.button = $("<input>", {
            type: "radio",
            class: "btn-check",
            name: "btnradio",
            id: this.id(),
            autocomplete: "off"
        });

        this.button.prop("checked", this.enabled);

        this.button.on("click", function () {
            for (let i = 0; i < Storage.forms.length; i++) {
                let form = Storage.forms[i];
                form.setState(form.id() === this.id);
            }
        });
        return this.button;
    }

    generateLabel() {
        this.label = $("<label>", {
            class: "btn btn-outline-secondary rounded-0",
            for: this.id()
        }).html(this.name);
        return this.label;
    }

    generateText() {
        this.text = $("<span>", {
            id: "info-" + this.id(),
            hidden: !this.enabled
        }).html(this.text);
        return this.text;
    }

    setState(state) {
        this.enabled = state;
        this.button.prop("checked", state);
        this.text.prop("hidden", !state);
    }

    enable() {
        this.setState(true);
    }

    disable() {
        this.setState(false);
    }
}