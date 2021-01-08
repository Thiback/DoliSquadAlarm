
$(document).ready(function(){
    $("#good_creds").click(function() {
        $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: "pbs@gmail.com",
                password: "kerui"
            }),
            success: function(response) {
                console.log("logged in");
                console.log(response);
            },
            error: function(xhr) {
                console.log("error");
                console.log(xhr);
            }
        });
    });
    $("bad_pw").click(function()
    {
        $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: "pbs@gmail.com",
                password: "toto",
            }),
            success: function (response) {
                console.log("logged in");
                console.log(response);
            },
            error : function(xhr) {
                console.log("error");
                console.log(xhr);
            }
        });
    });
    $("bad_email").click(function()
    {
        $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: "toto@gmail.com",
                password: "kerui",
            }),
            success: function (response) {
                console.log("logged in");
                console.log(response);
            },
            error : function(xhr) {
                console.log("error");
                console.log(xhr);
            }
        });
    });
});