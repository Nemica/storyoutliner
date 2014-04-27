var outline;

$(function() {
	StoryOutliner.restoreContext();
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
	
	$('.new-character').click(function() {
		StoryOutliner.editCharacter(-1);
	});
});