$(document).ready(function() {

    $(".card-body img").addClass("rounded mx-auto img-fluid");

    $( ".form_submitPassword" ).submit(function( event ) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        var thisForm = $(this);
        var solutionId = parseInt($(this).find('input[name="password"]').attr("data-solution-id"));
        var password = $(this).find('input[name="password"]').val();

        var uri = "/api/user/me/submitPassword";
        console.log(uri);
        $.post({
            url: uri,
        }, {'solutionId': solutionId+1, 'password': password})
        .done(function(data) {
            console.log(data)
            if (data == true) {
                //Update Glyph
                thisForm.parents(".row").find('.checkmark-glyph')
                .removeClass("fa-times-circle").removeClass("error")
                .removeClass("fa-circle").removeClass("neutral")
                .addClass("fa-check-circle").addClass("success");
        
                //Disable inputs
                thisForm.find('button[type="submit"]').prop('disabled', "true");
                thisForm.find('input[name="password"]').prop('disabled', "true")
                    .val("").prop('placeholder', "Unlocked!");
            } else {
                //Update Glyph)
                thisForm.parents(".row").find('.checkmark-glyph')
                .removeClass("fa-check-circle").removeClass("success")
                .removeClass("fa-circle").removeClass("neutral")
                .addClass("fa-times-circle").addClass("error");
            }
            // $( "#command-output" ).text(JSON.stringify(data));
        });
        
    });

});