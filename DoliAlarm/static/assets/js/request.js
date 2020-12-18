function requestToggleAlarm() {
    var csrf = $('input[name=csrfmiddlewaretoken]').val()
    var formData = new FormData();

    formData.append('csrfmiddlewaretoken', csrf)

    $.ajax({
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        url: ""
    }).done(function (data) {
        if (data["status"] == 'ok') {
            alert("OK");
            return;
        }
        else {
            console.log(data)
            alert("Error: " + data["message"]);
            return;
        }
    }).fail(function (data) {
        alert("Error, request failed");
        return;
    })
    return;
}

function requestRegister() {
    var csrf = $('input[name=csrfmiddlewaretoken]').val()
    var LastName = $("#LastName").val();
    var FirstName = $("#FirstName").val();
    var Email = $("#Email").val();
    var Password = $("#Password").val();
    var formData = new FormData();

    formData.append('csrfmiddlewaretoken', csrf)
    formData.append('LastName', LastName)
    formData.append('FirstName', FirstName)
    formData.append('Email', Email)
    formData.append('Password', Password)

    $.ajax({
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        url: ""
    }).done(function (data) {
        if (data["status"] == 'ok') {
            alert("Account created !");
            window.location.replace('/login');
            return;
        }
        else {
            console.log(data)
            alert("Error: " + data["message"]);
            return;
        }
    }).fail(function (data) {
        alert("Error, request failed");
        return;
    })
    return;
}