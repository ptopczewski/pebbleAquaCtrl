var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var loadScreen = new UI.Card({
  title: 'AquaCtrl',
  icon: 'images/menu_icon.png',
  subtitle: 'Laden...',
  body: 'Bitte warten'
});

loadScreen.show();

ajax({url: "http://192.168.178.33/api.php", type: 'json'},
  function(json) {
		var overView = new UI.Card({
			title: 'AquaCtrl',
			icon: 'images/menu_icon.png',
			subtitle: json.temp,
			body: 'Fütterung: '+json.last_feeding	
		});
		
		overView.on('click', 'select', function(e) {
			ajax({url: "http://192.168.178.33/api.php", type: 'json'},
				function(refresh) {
					overView.subtitle(refresh.temp);
					overView.body('Fütterung: '+refresh.last_feeding);
					Vibe.vibrate('short');
				},
				function(error) {
					console.log('Ajax failed: ' + error);
				});
		});
		
		overView.on('click', 'down', function(e) {
			var feed = new UI.Card();
			feed.title('Gefüttert?');
			feed.action({
				up: 'images/menu_icon.png',
				down: 'images/menu_icon.png'
			});
			feed.show();
		});
		
		overView.show();
		loadScreen.hide();
		
  },
  function(error) {
    console.log('Ajax failed: ' + error);
  }
);

/*
main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/