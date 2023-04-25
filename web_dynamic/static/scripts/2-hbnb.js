$(document).ready(function () {
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