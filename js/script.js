$(function () {

  var xkcdData;

  // Get the xkcd data
  function getData () {
    $.getJSON('/data/all.json', function (data) {
      xkcdData = data;
    });
  }

  // Setup the images
  function setupImages () {
    var temp = "<div class='brick' style='width:{width}px;'><img src='i/photo/{index}.jpg' width='100%'></div>";
    var w = 1, h = 1, html = '', limitItem = 49;
    for (var i = 0; i < limitItem; ++i) {
      w = 1 + 3 * Math.random() << 0;
      html += temp.replace(/\{width\}/g, w*150).replace("{index}", i + 1);
    }
    $("#container").html(html);

    var wall = new freewall("#container");
    wall.reset({
      selector: '.brick',
      animate: true,
      cellW: 150,
      cellH: 'auto',
      onResize: function() {
        wall.fitWidth();
      }
    });

    var images = wall.container.find('.brick');
    images.find('img').load(function() {
      wall.fitWidth();
    });
  }
});