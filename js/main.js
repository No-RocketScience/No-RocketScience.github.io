$(function () {
    var cookies = Cookies.get();
    $.each(cookies, function (cookie) {
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
    });
    $("input.btn-check").on("click", function () {
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
});