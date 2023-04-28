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
    $('div.amenities h4').text(amenitiesText);
  });

  const url = 'http://0.0.0.0:5000/api/v1/status/';
  $.get(url, function (data, response) {
    if(response === "success" && data.status === "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: {},
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const place of data) {
        const article = $('<article>', {
          class: 'place',
          html: `
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          `
        });
        $('section.places').append(article);
      }
    }
  });
});
