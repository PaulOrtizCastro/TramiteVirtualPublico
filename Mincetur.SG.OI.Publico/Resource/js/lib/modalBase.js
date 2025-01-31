$(document).ready(function ()
{
    $('body').on("click", ".modalBase", function ()
    {
        var url = $(this).attr('data-url');
        //console.log(url);
        jQuery("#contenedor").html('');
        jQuery("#contenedor").load(url, function (responseText, textStatus, request)
        {
            $.validator.unobtrusive.parse('#contenedor');
            if (request.status != 200) return;
            $('.contenedor').modal('show');
            $(".modal-content").draggable({
                handle: ".modal-header", cursor: "move"
            })
        });
    });
});