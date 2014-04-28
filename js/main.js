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
		}
	};

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
	
	$('.maincontainer .loaded-visible').load('pages/dash.html', onComplete);
});