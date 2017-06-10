var current_id = 2;
var language = 'en';

$(document).ready(function() {
  $('#results').slideUp('fast', function() {
  });
  refreshListener();

  // load selected language
  if(localStorage.getItem("lang") != null){
    if(localStorage.getItem("lang") == "de"){
      lang_de();
    }
    else if (localStorage.getItem("lang") == "en") {
      lang_en();
    }
  }

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

  //languages
  $('#lang_de').on('click', function(event) {
    lang_de();
    localStorage.setItem("lang", "de");
  });

  $('#lang_en').on('click', function(event) {
    lang_en();
    localStorage.setItem("lang", "en");
  });

  $('#delete').on('click', function(event) {
    location.reload();
  });

  $('#deleteL').on('click', function(event) {
    current_id=current_id-1;
    $('#_'+String(current_id)).remove();
  });

  $('#calc').on('click', function(event) {
    $('#results').slideDown('slow', function() {
    });
    var sum = 0;
    //mean
    for (var i = 1; i < current_id; i++) {
      sum += parseFloat($('#_'+String(i)).val());
    }
    var meanValue = sum/(current_id-1);
    var name1 = 'Mean Value:';
    var name2 = 'Variance:';
    var name3 = 'Standard Deviation:';
    var name4 = 'Error of Mean:'
    if (language == 'de') {
      name1 = 'Mittelwert:';
      name2 = 'Varianz:';
      name3 = 'Standard Abweichung:';
      name4 = 'Fehler des Mittelwerts:'
    }
    $('#meanValue').html(`${name1} \\(\\overline{x} = \\frac{1}{n} \\ \\sum_{i=1}^n x_i = \\frac{1}{${current_id-1}} \\cdot ${sum} = ${meanValue} \\) `);

    //standard deviation
    var sumMean = 0;
    for (var i = 1; i < current_id; i++) {
      sumMean += Math.pow(parseFloat($('#_'+String(i)).val())-meanValue,2);
    }
   var sigma_squared = 1/(current_id-2)*sumMean;
   $('#variance').html(`${name2} \\( \\sigma^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\overline{x})^2 = \\frac{1}{${current_id-2}} \\cdot ${sumMean} = ${sigma_squared}\\)`);
   var standardDeviation = Math.sqrt(sigma_squared);
  $('#standardDeviation').html(`${name3} \\(\\sigma = \\sqrt{\\sigma^2} = \\sqrt{${sigma_squared}} = ${standardDeviation}\\) `);

  //error of meanValue
  var s = standardDeviation/Math.sqrt(current_id-1);
  $('#sM').html(`${name4} \\(s_{\\overline{x}} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{${standardDeviation}}{\\sqrt{${current_id-1}}} = \\frac{${standardDeviation}}{${Math.sqrt(current_id-1)}} = ${s}\\) `);


  //reload MathJax = force new Typesetting
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });

});

function refreshListener(){
  $('#_'+String(current_id-1)).on('keypress', function(event) {
    if(event.keyCode === 13){
      var r = $(`<li style="display:inline" class="form-inline">
        <div class="col-sm-2" style="display:inline">
          <input type="text" class="data_handler form-control" id="_${current_id}" />
        </div>
      </li>`);
      $("#data-input").append(r);
      $('#_'+String(current_id)).focus();
      current_id++;
      refreshListener();
    }
  });
}

function lang_de(){
  language='de';
  $('h1').html('Statistik - Rechner');
  $('h3').html('Daten eingeben:').attr('title', 'Nach jedem eingegebenen Wert "Enter" drücken um eine neue Zelle zu erzeugen.');
  $('#calc').html('Berechnen');
  $('#delete').html('Alle Löschen');
  $('#deleteL').html('Letzte Zelle Löschen')

  var sum = 0;
  //mean
  for (var i = 1; i < current_id; i++) {
    sum += parseFloat($('#_'+String(i)).val());
  }
  var meanValue = sum/(current_id-1);
  $('#meanValue').html(`Mittelwert: \\(\\overline{x} = \\frac{1}{n} \\ \\sum_{i=1}^n x_i = \\frac{1}{${current_id-1}} \\cdot ${sum} = ${meanValue} \\) `);

  //standard deviation
  var sumMean = 0;
  for (var i = 1; i < current_id; i++) {
    sumMean += Math.pow(parseFloat($('#_'+String(i)).val())-meanValue,2);
  }
  var sigma_squared = 1/(current_id-2)*sumMean;
  $('#variance').html(`Varianz: \\( \\sigma^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\overline{x})^2 = \\frac{1}{${current_id-2}} \\cdot ${sumMean} = ${sigma_squared}\\)`);
  var standardDeviation = Math.sqrt(sigma_squared);
  $('#standardDeviation').html(`Standard Abweichung: \\(\\sigma = \\sqrt{\\sigma^2} = \\sqrt{${sigma_squared}} = ${standardDeviation}\\) `);

  //error of meanValue
  var s = standardDeviation/Math.sqrt(current_id-1);
  $('#sM').html(`Fehler des Mittelwerts: \\(s_{\\overline{x}} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{${standardDeviation}}{\\sqrt{${current_id-1}}} = \\frac{${standardDeviation}}{${Math.sqrt(current_id-1)}} = ${s}\\) `);


  //reload MathJax = force new Typesetting
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

}

function lang_en(){
  language='en';
  $('h1').html('Statistics - Calculator');
  $('h3').html('Enter your data:').attr('title', 'Press enter after every value, in order to create a new cell.');
  $('#calc').html('Calculate');
  $('#delete').html('Delete All');
  $('#deleteL').html('Delete Last')

  var sum = 0;
  //mean
  for (var i = 1; i < current_id; i++) {
    sum += parseFloat($('#_'+String(i)).val());
  }
  var meanValue = sum/(current_id-1);
  $('#meanValue').html(`Mean Value: \\(\\overline{x} = \\frac{1}{n} \\ \\sum_{i=1}^n x_i = \\frac{1}{${current_id-1}} \\cdot ${sum} = ${meanValue} \\) `);

  //standard deviation
  var sumMean = 0;
  for (var i = 1; i < current_id; i++) {
    sumMean += Math.pow(parseFloat($('#_'+String(i)).val())-meanValue,2);
  }
  var sigma_squared = 1/(current_id-2)*sumMean;
  $('#variance').html(`Variance: \\( \\sigma^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\overline{x})^2 = \\frac{1}{${current_id-2}} \\cdot ${sumMean} = ${sigma_squared}\\)`);
  var standardDeviation = Math.sqrt(sigma_squared);
  $('#standardDeviation').html(`Standard Deviation: \\(\\sigma = \\sqrt{\\sigma^2} = \\sqrt{${sigma_squared}} = ${standardDeviation}\\) `);

  //error of meanValue
  var s = standardDeviation/Math.sqrt(current_id-1);
  $('#sM').html(`Error of Mean: \\(s_{\\overline{x}} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{${standardDeviation}}{\\sqrt{${current_id-1}}} = \\frac{${standardDeviation}}{${Math.sqrt(current_id-1)}} = ${s}\\) `);


  //reload MathJax = force new Typesetting
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

}
