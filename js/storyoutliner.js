var StoryOutliner = {
	newOutline: function(opts) {
		localStorage.setItem('outline', JSON.stringify({
			name: opts.name || '',
			characters: [],
			snippets: []
		}));
		StoryOutliner.dirty = true;
		StoryOutliner.restoreContext();
	},
	
	loadFile: function() {

	},
	
	restoreContext: function() {
		if((outline = localStorage.getItem('outline'))) {
			outline = JSON.parse(outline);
			console.log("Story outline for " + outline.name + " loaded.");
			$('.outline-name').text(outline.name);
			
			StoryOutliner.showCharacterList();
			
			$('body').removeClass('not-loaded').addClass('loaded');
		} else {
			console.log("No story outline loaded.");
		}
	},
	
	editCharacter: function(index) {
		var ch;
		if(index == -1) {
			index = outline.characters.length;
			outline.characters.push({});
		}
		ch = outline.characters[index];
		
		var dialog = UI.dialog({
			title: typeof ch.name == "undefined" ? "New character" : "Edit character: " + ch.name,
			content: [{
				type: 'text',
				label: 'Name',
				id: 'character-edit-name'
			}, {
				type: 'multitext',
				label: 'Notes',
				id: 'character-edit-notes'
			}],
			data: {
				'character-edit-name': ch.name,
				'character-edit-notes': ch.notes
			},
			buttons: [{
				text: 'OK',
				clickHandler: function() {
					outline.characters[index] = {
						name: $('#character-edit-name').val(),
						notes: $('#character-edit-notes').val()
					};
					StoryOutliner.showCharacterList();
					StoryOutliner.saveToStorage();
					$('.dialog-mask').remove();
				}
			}, {
				text: 'Cancel'				
			}]
		});
	},
	
	showCharacterList: function() {
		var $charlist = $('.outline-characters div');
		$charlist.text('');
		
		outline.characters.forEach(function(ch, i) {
			var $charBlurb = $('<div/>').
				addClass('outline-characters-element').
				addClass('clickable').
				click(function() {
					StoryOutliner.editCharacter(i);
				}).
				appendTo($charlist);
			
			var $charName = $('<h3/>').
				text(ch.name).
				appendTo($charBlurb);
				
			var $charNotes = $('<p/>').
				text(ch.notes).
				appendTo($charBlurb);
		});
	},
	
	saveToStorage: function() {
		localStorage.setItem('outline', JSON.stringify(outline));
	}
};
