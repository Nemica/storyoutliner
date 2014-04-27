var UI = {
	// Makes buttons
	button: function(opts) {
		if(!opts || !opts.text) {
			throw new Error("UI.button requires button text!");
		}
		var $button = $('<button/>').
			text(opts.text);
		if(opts.clickHandler) $button.click(opts.clickHandler);
		if(opts.id) $button.attr('id', opts.id);
		
		return $button;
	},

	// Standard OK/cancel dialog box
	dialog: function(opts) {
		var me = this;
		opts = opts || {};
		
		// Set default values
		$.extend(true, opts, {
			fitSize: true,
			closeable: true,
			draggable: true, // only for title bar
			buttons: [{
				text: 'OK'
			}],
			buttonAlign: 'right'
		});
		
		var $mask = $('<div/>').
			addClass('dialog-mask');
		
		var $box = $('<div/>').
			addClass('dialog').
			appendTo($mask);
			
		// Debug?
		$box.close = function() {
			$mask.remove();
		}
		
		var $innerBox = $('<div/>').
			addClass('dialog-content').
			appendTo($box);
		
		// Add title bar
		if(opts.title || opts.closeable) {
			var $titleBar = $('<div/>').
				addClass('title-bar').
				prependTo($box);
			if(opts.title) {
				$titleBar.text(opts.title);
			} else {
				$titleBar.html('&nbsp;');
			}
			
			if(opts.closeable) {
				$xButton = $('<div/>').
					addClass('button').
					addClass('close').
					click($box.close).
					appendTo($titleBar);
			}
		}
		
		// Content creation
		if(opts.content) {
			if(typeof opts.content == "string") { // Content as string: Just add content.
				$innerBox.text(opts.content);
			} else { // Content as object: Generate elements
				opts.content.forEach(function(el) {
					console.log("Add " + el.type + " (#" + el.id + ") type element.");
					var $el = $('<div/>').
						addClass('dialog-element');
					
					// Only generate label if it's set
					if(el.label) {
						var $elLabel = $('<label/>').
							addClass('dialog-label').
							text(el.label + ":").
							prependTo($el);
					}
					
					var $mainElement;
					
					switch(el.type) {
						case 'text':
							$mainElement = $('<input/>').
								attr('type', 'text');
							break;
						case 'multitext':
							$mainElement = $('<textarea/>');
					}
					
					if(el.id) $mainElement.attr('id', el.id);
					
					$mainElement.appendTo($el);
					$el.appendTo($innerBox);
				});
			}
		}
		
		// Fill with data
		if(opts.data) {
			Object.keys(opts.data).forEach(function(property) {
				var $el = $box.find('#' + property);
				if($el.length) {
					if($el.prop('tagName') == 'INPUT') {
						$el.val(opts.data[property]);
					} else {
						$el.text(opts.data[property]);
					}
				}
			});
		}
		
		// Add bottom bar
		var $bottomBar = $('<div/>').
			addClass('bottom-bar').
			addClass(opts.buttonAlign).
			appendTo($box);

		opts.buttons.forEach(function(btn) {
			var $btn = UI.button({
				text: btn.text || 'OK',
				clickHandler: btn.clickHandler || $box.close
			});
			$btn.appendTo($bottomBar);
		});
		
		// CSS details
		var optsCss = {};
		
		$mask.appendTo($('body'));

		// Needs actual width
		if(!opts.fitSize) {
			optsCss.width = opts.width || 480;
			optsCss.height = opts.height || 320;
		} else {
			optsCss.width = $box.width();
			optsCss.height = $box.height();
		}

		optsCss.left = ($(window).width() - optsCss.width) / 2;
		optsCss.top = ($(window).height() - optsCss.height) / 2;
		$box.css(optsCss);
		
		return $box;
	}
}