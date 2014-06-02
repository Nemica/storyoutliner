$(function() {

	var onComplete = function() {
		if(StoryOutliner.restoreContext()) {
		
			// Dashboard page

			$('.char-stats').text(StoryOutliner.outline.characters.length);
			$('.snippet-stats').text(StoryOutliner.outline.snippets.length);

			$('.outline-summary').
				click(function() {
					$(this).attr('contenteditable', 'true');
				}).
				text(StoryOutliner.outline.summary);
			
			// Character page

			$('.new-character').click(function() {
				StoryOutliner.editCharacter(-1);
			});

			// Config page

			$('.new-character-role').click(function() {
				StoryOutliner.editCharacterRole(-1);
			});
		}
	};

	var loadPage = function(name) {
		// Set current page
		localStorage.setItem('currentPage', name);
		$('.maincontainer .loaded-visible').load('pages/' + name + '.html', onComplete);
	};

	$('#dashboard').click(function() {
		loadPage('dash');
	});

	// Click handlers for the topbar
	$('#new-outline').click(function() {
		UI.dialog({
			title:'New Outline',
			content: [{
				label: 'Name',
				type: 'text',
				id: 'new-outline-name'
			}],
			buttons: [{
				text: 'OK',
				clickHandler: function(e) {
					var name = $('#new-outline-name').val();
					console.log(name);
					if(name) {
						StoryOutliner.newOutline({
							name: name
						});
						$('.dialog-mask').remove();
					}
				}
			}, {
				text: 'Cancel'
			}]
		});
	});

	$('#load-outline').click(function() {
		UI.dialog({
			title: 'Load Outline',
			content: [{
				label: 'Outline data',
				type: 'multitext',
				id: 'outline-data'
			}],
			buttons: [{
				text: 'OK',
				clickHandler: function(e) {
					var data = $('#outline-data').val();
					try {
						data = JSON.parse(data);
					} catch(e) {
						console.error(e.message);
						data = null;
					}
					if(data) {
						StoryOutliner.outline = data;
						StoryOutliner.saveToStorage();
						StoryOutliner.restoreContext();
					}
					UI.closeDialog();
				}
			}, {
				text: 'Cancel'
			}]
		});
	});

	$('#save-outline').click(function() {
		UI.dialog({
			title: 'Save Outline',
			content: [{
				type: 'label',
				data: 'Eventually, it will be possible to save<br/>outline data in a file. For now, you need<br/>to copy the JSON and save it manually.'
			}, {
				label: 'Outline data',
				type: 'multitext',
				id: 'outline-data'
			}],
			data: {
				'outline-data': JSON.stringify(StoryOutliner.outline)
			},
			buttons: [{
				text: 'OK'
			}]
		});
	});

	$('#characters').click(function() {
		loadPage('characters');
	});
	
	$('#config').click(function() {
		loadPage('config');
	});
	
	// Load page
	loadPage(localStorage.getItem('currentPage') || 'dash');
});