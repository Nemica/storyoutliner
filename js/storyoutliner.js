var StoryOutliner = {

	outline: {},
	
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
		if((StoryOutliner.outline = localStorage.getItem('outline'))) {
			StoryOutliner.outline = JSON.parse(StoryOutliner.outline);

			// Generate arrays if not existing
			StoryOutliner.outline.characters = StoryOutliner.outline.characters || [];
			StoryOutliner.outline.snippets = StoryOutliner.outline.snippets || [];
			console.log("Story outline for " + StoryOutliner.outline.name + " loaded.");
			$('.outline-name').text(StoryOutliner.outline.name);
			
			StoryOutliner.showCharacterList();
			
			$('body').removeClass('not-loaded').addClass('loaded');
		} else {
			console.log("No story outline loaded.");
		}
	},
	
	editCharacter: function(index) {
		var ch;
		if(index == -1) {
			index = StoryOutliner.outline.characters.length;
			StoryOutliner.outline.characters.push({});
		}
		ch = StoryOutliner.outline.characters[index];
		
		UI.dialog({
			title: typeof ch.name == "undefined" ? "New character" : "Edit character: " + ch.name,
			content: [{
				type: 'text',
				label: 'Name',
				id: 'character-edit-name'
			}, {
				type: 'multitext',
				label: 'Notes',
				id: 'character-edit-notes'
			}, {
				type: 'select',
				label: 'Role',
				id: 'character-edit-role',
				data: [{
					text: 'Protagonist',
					value: 0
				}, {
					text: 'Antagonist',
					value: 1
				}]
			}],
			data: {
				'character-edit-name': ch.name,
				'character-edit-notes': ch.notes,
				'character-edit-role': ch.role
			},
			buttons: [{
				text: 'OK',
				clickHandler: function() {
					StoryOutliner.outline.characters[index] = {
						name: $('#character-edit-name').val(),
						notes: $('#character-edit-notes').val()
					};
					StoryOutliner.showCharacterList();
					StoryOutliner.saveToStorage();
					UI.closeDialog();
				}
			}, {
				text: 'Cancel'				
			}]
		});
	},
	
	deleteCharacter: function(index) {
		ch = StoryOutliner.outline.characters[index];
		
		UI.dialog({
			title: typeof ch.name == "undefined" ? "Delete character" : "Delete character: " + ch.name,
			content: "Are you sure you want to delete " + (typeof ch.name == "undefined" ? "this character character" : ch.name) + "?",
			buttons: [{
				text: 'Yes',
				clickHandler: function() {
					StoryOutliner.outline.characters.splice(index, 1);
					StoryOutliner.saveToStorage();
					StoryOutliner.showCharacterList();
					UI.closeDialog();
				}
			}, {
				text: 'No'
			}]
		});
	},
	
	showCharacterList: function() {
		var $charlist = $('.outline-characters .container');
		$charlist.text('');
		
		StoryOutliner.outline.characters.forEach(function(ch, i) {
			var $charBlurb = $('<div/>').
				addClass('outline-characters-element').
				appendTo($charlist);

			var $xButton = $('<div/>').
				addClass('button').
				addClass('close').
				attr('title', 'Delete').
				click(function() {
					StoryOutliner.deleteCharacter(i);
				}).
				appendTo($charBlurb);
				
			var $editButton = $('<div/>').
				addClass('button').
				addClass('button-pos-2').
				addClass('edit').
				attr('title', 'Edit').
				click(function() {
					StoryOutliner.editCharacter(i);
				}).
				appendTo($charBlurb);
				
			var $charName = $('<h3/>').
				text(ch.name).
				appendTo($charBlurb);
				
			var $charNotes = $('<p/>').
				text(ch.notes).
				appendTo($charBlurb);
		});
	},
	
	saveToStorage: function() {
		localStorage.setItem('outline', JSON.stringify(StoryOutliner.outline));
	}
};
