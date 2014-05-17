$(function () {

  var $container = $('#container');
  var xkcdData;
  var currentQuery = '';

  // Get the xkcd data
  function getData () {
    $.getJSON('../data/all.json', function (data) {
      xkcdData = data;
      search($search.val());
    });
  }

  // Search algorithm
  // Assumes that the xkcd data is loaded
  function search (query) {
    // results is an array of ids that match
    var results = [];

    if (query !== currentQuery) {
      // actually do a search
      var keys = Object.keys(xkcdData);
      for (var i = 0; i < keys.length; ++i) {
        var id = keys[i];
        var comic = xkcdData[id];

        var title = comic.title;
        var transcript = comic.transcript;

        if (title.indexOf(query) !== -1 || transcript.indexOf(query) !== -1) {
          results.push(id);
        }
      }

      // Do something with the results
      display(results);

      query = currentQuery;
    }
  }

  // Displays the comics from the results
  // The param is a list of comic ids to display
  function display (ids) {
    // Get the data
    ids = ids.splice(0, 10);
    var data = [];
    for (var i in ids) {
      var id = ids[i];
      data.push(xkcdData[id]);
    }

    // Display the comics
    $container.html('');
    for (var i in data) {
      var imgSrc = data[i].img;
      var imgTag = "<img src='"+imgSrc+"'/>";
      $container.append(imgTag);
    }
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

  // UI logic
  $search = $('.search');
  $(window).on('keydown', function (e) {
    $search.focus();
  }).on('keyup', function (e) {
    if (xkcdData) {
      search($search.val());
    }
  });

  // Runner
  getData();
});