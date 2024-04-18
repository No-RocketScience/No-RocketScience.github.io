$(function () {
    addInfusions();
    applyCookieData();
    addButtonChangeHandlers();
});

function addInfusions() {
    for (let i = 0; i < infusions.length; i++) {
        let infusion = infusions[i];
        infusion.index = CryptoJS.MD5(infusion.name).toString();
        $("#container").append(infusion.generateHtml(false));
    }

    addInfusionAdder();
}

function addInfusion() {
    let name = $("#new-infusion-name").val();
    let text = $("#new-infusion-text").val();
    let attunement = $("#new-infusion-attunement").prop("checked");
    let infusion = new Infusion(name, text, attunement);
    custom_infusions.push(infusion);
    localStorage.setItem("customInfusions", JSON.stringify(custom_infusions));
    $("#container .infusion").first().before(infusion.generateHtml(false));
    $("#new-infusion-name").val("");
    $("#new-infusion-text").val("");
}

function addInfusionAdder() {
    let row = $("<div>", {
        class: "row bg-dark-subtle g-0 border border-3 border-black align-middle"
    });

    let input_group_name = $("<div>", { class: "input-group rounded-0" });
    let infusion_name_span = $("<span>", { class: "input-group-text rounded-0" }).html("Name");
    let infusion_name = $("<input>", { id: "new-infusion-name", class: "form-control rounded-0", type: "text" });
    let infusion_attunement = $("<input>", { id: "new-infusion-attunement", class: "btn-check", type: "checkbox", autocomplete: "off" });
    let infusion_attunement_label = $("<label>", { class: "btn btn-outline-secondary col-3 rounded-0", for: "new-infusion-attunement" }).html("Attunement");
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
    add_button.prop("checked", true)
    add_button.on("click", addInfusion);
    row.append(input_group_name);
    row.append(input_group_textarea);
    row.append(add_button);
    $("#container").append(row);
}

function applyCookieData() {
    var cookies = Cookies.get();
    $.each(cookies, function (cookie) {
        if ((cookie.startsWith("infusion") || cookie.startsWith("form"))) {
            applyInfusionAndFormData(cookies, cookie);
        }
    });
}

function applyInfusionAndFormData(cookies, cookie) {
    $("#" + cookie).prop("checked", cookies[cookie] === "true");
    Cookies.set(cookie, cookies[cookie], { sameSite: 'strict', expires: 365 });
    if (cookie.indexOf("form") != -1 && cookies[cookie] === "true") {
        let index = cookie.substr(-1);
        $("#info-form-" + index).prop("hidden", false);
        if (index != 1) {
            $("#info-form-1").prop("hidden", true);
        }
        if (index != 2) {
            $("#info-form-2").prop("hidden", true);
        }
        if (index != 3) {
            $("#info-form-3").prop("hidden", true);
        }
    }
}

function addButtonChangeHandlers() {
    $(".infusion input.btn-check, .forms input.btn-check").on("click", function () {
        Cookies.set(this.id, this.checked, { sameSite: 'strict', expires: 365 });
        if (this.id.indexOf("form") != -1) {
            let index = this.id.substr(-1);
            $("#info-form-" + index).prop("hidden", false);
            if (index != 1) {
                Cookies.set("form1", false, { sameSite: 'strict' });
                $("#info-form-1").prop("hidden", true);
            }
            if (index != 2) {
                Cookies.set("form2", false, { sameSite: 'strict' });
                $("#info-form-2").prop("hidden", true);
            }
            if (index != 3) {
                Cookies.set("form3", false, { sameSite: 'strict' });
                $("#info-form-3").prop("hidden", true);
            }
        }
    });
}