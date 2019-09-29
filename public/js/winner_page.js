$(document).ready(function() {

    var timeoutId = 0;

    $('#prizeImage').on('mousedown', function() {
        timeoutId = setTimeout(showClaimUi, 100);
    }).on('mouseup mouseleave', function() {
        clearTimeout(timeoutId);
    });

    function showClaimUi() {
        $('#claimPrizeCollapse').collapse('show')
    }

    $( "#btnClaimPrize" ).click(function(event) {
        $.ajax({
            url: "/api/user/me/claimPrize",
            method: 'POST'
        }).done(function(data) {
            location.reload();
        });
    });
});