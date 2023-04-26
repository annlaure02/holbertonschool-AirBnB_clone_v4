$(function () {
  let new_list = [];
  $('input[type="checkbox"]').change(function() {
    if($(this).prop('checked')) {
      new_list.push($(this).attr('data-id'));
    } else {
      new_list = new_list.filter(id => id !== $(this).attr('data-id'));
    }

    let amenitiesText = '';
    for (let id of new_list) {
      const name = $('input[data-id="'+id+'"]').attr('data-name');
      amenitiesText += name + ', ';
    }
    amenitiesText = amenitiesText.slice(0, -2);
    $('.amenities h4').text(amenitiesText);
  });
});

$(function (){
  const url = 'http://0.0.0.0:5000/api/v1/status/';
  $.get(url, function (data, status) {
    if(status === "success" && data.status === "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available')
    }
  })
});
