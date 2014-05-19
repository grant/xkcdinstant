$(function () {

  var wall;
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
      var imgTag = "<div class='brick'><img src='"+imgSrc+"' width='100%'></div>";
      $container.append(imgTag);
    }

    $container.freetile();
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
