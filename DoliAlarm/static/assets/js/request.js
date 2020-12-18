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