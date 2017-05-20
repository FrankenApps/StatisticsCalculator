var current_id = 2;

$(document).ready(function() {
  $('#results').slideUp('fast', function() {
  });
  refreshListener();

  //detect focus-change and test all textboxes.. I hope it wont take too long with many boxes..
  $(document).focusout(function(event) {
    for (var i = 1; i < current_id; i++) {
      if (isNaN($('#_'+String(i)).val())) {
        $('#_'+String(i)).css('border', '1px dotted red');
      } else{
          if($('#_'+String(i)).val() === ''){
            $('#_'+String(i)).css('border', '1px dotted red');
          } else {
              $('#_'+String(i)).css('border', '1px dotted green');
          }
      }
    }
  });

  $('#calc').on('click', function(event) {
    $('#results').slideDown('slow', function() {
    });
    var sum = 0;
    //mean
    for (var i = 1; i < current_id; i++) {
      sum += parseFloat($('#_'+String(i)).val());
    }
    $('#meanValue').html('Mean Value: ' + sum/(current_id-1));
  });
  //standard deviation

});

function refreshListener(){
  $('#_'+String(current_id-1)).on('keypress', function(event) {
    if(event.keyCode === 13){
      var r = $(`<li style="display: inline; margin-bottom: 34px">
                  <input type="text" class="data_handler" id="_${current_id}" />
                  </li>`);
      $("#data-input").append(r);
      $('#_'+String(current_id)).focus();
      current_id++;
      refreshListener();
    }
  });
}
