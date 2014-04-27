$(function() {

	var onComplete = function() {
		StoryOutliner.restoreContext();
		
		$('.outline-summary').
			click(function() {
				$(this).attr('contenteditable', 'true');
			}).
			text(StoryOutliner.outline.summary);
		
		$('.new-character').click(function() {
			StoryOutliner.editCharacter(-1);
		});
		
		$('.char-stats').text(StoryOutliner.outline.characters.length);
		$('.snippet-stats').text(StoryOutliner.outline.snippets.length);
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
	
	$('.maincontainer .loaded-visible').load('pages/dash.html', {}, onComplete);
});