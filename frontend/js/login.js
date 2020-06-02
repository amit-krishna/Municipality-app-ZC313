$("#login").click(() => {
    activity.start();
    if (loginDetails.isthere()) {
        if (loginDetails.checkEmail() != "isNotValid") {
            // TODO AJAX Call to backend
            var formData = new Object();
            formData["email"] = $("#email").val();
            formData["password"] = $("#password").val();

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/login/init",
                data: JSON.stringify(formData),
                contentType: "application/json",
                dataType: "json",
                success: (oUser) => {
                    if(oUser == "" || oUser == null || oUser == "null")
                        messageBox.show("Error! Invalid Credentials");
                    else{
                        cookie.set("SSID", oUser.token, 7);
                        // messageBox.show("Error while Registering!");
                    }
                },
                error: (oError) => {
                    debugger;
                    messageBox.show("Error while Registering!");
                },
            });
        } else {
            messageBox.show("Email is Invalid");
        }
    } else {
        messageBox.show("Fields are empty");
    }
});

loginDetails = () => {};
loginDetails.isthere = () => {
    if ($("#email").val().trim() == "" || $("#password").val().trim() == "")
        return false;
    return true;
};
loginDetails.checkEmail = () => {
    if (isEmail($("#email").val().trim())) return $("#email").val().trim();
    return "isNotValid";
};