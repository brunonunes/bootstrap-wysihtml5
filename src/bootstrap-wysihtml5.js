!function($, wysi) {
	"use strict"
	
	var templates = {
		"font-styles": "<li class='dropdown'>" +
							"<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>" +
								"<i class='icon-font'></i>&nbsp;<span class='current-font'>Normal text</span>&nbsp;<b class='caret'></b>" +
							"</a>" +
						    "<ul class='dropdown-menu'>" +
						      	"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div'>Normal text</a></li>" +
					            "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1'>Heading 1</a></li>" +
					            "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2'>Heading 2</a></li>" +
						    "</ul>" +
						"</li>",
		"emphasis":     "<li>" +
							"<div class='btn-group'>" +		
							    "<a class='btn' data-wysihtml5-command='bold' title='CTRL+B'>Bold</a>" +
							    "<a class='btn' data-wysihtml5-command='italic' title='CTRL+I'>Italic</a>" +
							"</div>" +
						"</li>",
		"lists": 		"<li>" +
							"<div class='btn-group'>" +
						    	"<a class='btn' data-wysihtml5-command='insertUnorderedList'><i class='icon-list'></i></a>" +
							    "<a class='btn' data-wysihtml5-command='insertOrderedList'><i class='icon-th-list'></i></a>" +		
							"</div>" +
						"</li>"
	};
	
	var defaultOptions = {
		"font-styles": true,
		"emphasis": true,
		"lists": true
	};

	var Wysihtml5 = function(el, options) {
		this.el = el;
		this.toolbar = this.createToolbar(el, options || defaultOptions);
		this.editor =  new wysi.Editor(this.el.attr('id'), {
    		toolbar: this.toolbar.attr('id')
  		});
	};

	Wysihtml5.prototype = {
		constructor: Wysihtml5,
		
		createToolbar: function(el, options) {
			var toolbar = $("<ul id='" + el.attr('id') + "-wysihtml5-toolbar' class='wysihtml5-toolbar' style='display:none'></ul>").button();

			for(var key in defaultOptions) {
				var value;
				
				if(options[key] != undefined) {
					if(options[key] == true) {
						value = true;
					}
				} else {
					value = defaultOptions[key];
				}
				
				if(value == true) {
					toolbar.append(templates[key]);
				}
			}
			
			var self = this;
			
			toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function(e) {
				var el = $(e.srcElement);
				self.toolbar.find('.current-font').text(el.html())
			});
			
			this.el.before(toolbar);
			
			return toolbar;
		}
	};

	$.fn.wysihtml5 = function (options) {
		return this.each(function () {
			var $this = $(this);
	      	$this.data('wysihtml5', new Wysihtml5($this, options));	
	    })
  	};

  	$.fn.wysihtml5.Constructor = Wysihtml5;

}(window.jQuery, window.wysihtml5);