$(document).on('click', '.add_slot', function() {
    var day = $(this).attr('data-for');
    var div = $("div[data-name='" + day +"']");
    var html = '<div class="row my-2"><div class="col-md-3"><input type="text" class="form-control timepicker" name="'+ day +'_start[]" data-start="' + day +'" placeholder="From:" /></div><div class="col-md-3"><input type="text" class="form-control timepicker" name="'+ day +'_end[]" data-end="'+ day +'" placeholder="To:" /></div><a href="javascript:void(0);" class="btn btn-danger delete_slot">Remove</a></div>';
    div.append(html);
});

$(document).on('click', '.delete_slot', function() {
    $(this).parent('div').remove();
    do_value();
});

$(document).on("focus", ".timepicker", function() {
    $(this).timepicker();
});

$(document).on('change', ".timepicker", function() {
    do_value();
});

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var main_div = $("#time_slot_div");
var i;

for(i=0; i<days.length; i++)
{
    var main = '<div class="row slot_parent"><div class="col-md-2"><input type="text" class="form-control" name="week[]" readonly value="'+ days[i] +'"></div><div class="col-md-8"><div class="time_slot" data-name="'+ days[i] +'"><div class="row"><div class="col-md-3"><input type="text" class="form-control timepicker" name="'+ days[i] +'_start[]" data-start="' + days[i] +'" placeholder="From:" /></div><div class="col-md-3"><input type="text" class="form-control timepicker" name="'+ days[i] +'_end[]" data-end="'+ days[i] +'" placeholder="To:" /></div><a href="javascript:void(0);" class="btn btn-primary add_slot" data-for="'+ days[i] +'">Add</a></div></div></div></div>';
    main_div.append(main);
}
main_div.append('<a href="javascript:void(0);" id="submit_query" class="btn btn-primary">Submit</a>');

$("#submit_query").on('click', function() {
    do_value();
});

function do_value()
{
    var final = [];
    var j;
    for(i=0; i<days.length; i++)
    {
        var value = [];
        var j;
        var starts = $("input[data-start='"+ days[i] +"']");
        var ends = $("input[data-end='"+ days[i] +"']");
        var started = document.getElementsByName(days[i] + '_start[]');
        var ended = document.getElementsByName(days[i] + '_end[]');
        for(j=0; j<started.length; j++)
        {
            value.push({
                start: started[j].value,
                end: ended[j].value,
            });
        }

        final.push({
            day: days[i],
            slots: value
        })
    }

    var final_value = JSON.stringify(final);
    $("#time_slots_value").text(final_value);
}