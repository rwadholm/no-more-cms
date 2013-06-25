/* All scripts were compressed with http://jscompress.com/

 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <elfz@laacz.lv>
    http://jsbeautifier.org/


  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    max_char (default 70)            -  maximum amount of characters per line,
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.
    unformatted (default ['a'])      - list of tags, that shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"

    e.g.

    style_html(html_source, {
      'indent_size': 2,
      'indent_char': ' ',
      'max_char': 78,
      'brace_style': 'expand',
      'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u']
    });
*/
function style_html(a,b){function h(){this.pos=0;this.token="";this.current_mode="CONTENT";this.tags={parent:"parent1",parentcount:1,parent1:""};this.tag_type="";this.token_text=this.last_token=this.last_text=this.token_type="";this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),extra_liners:"head,body,/html".split(","),in_array:function(a,b){for(var c=0;c<b.length;c++){if(a===b[c]){return true}}return false}};this.get_content=function(){var a="";var b=[];var c=false;while(this.input.charAt(this.pos)!=="<"){if(this.pos>=this.input.length){return b.length?b.join(""):["","TK_EOF"]}a=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(a,this.Utils.whitespace)){if(b.length){c=true}this.line_char_count--;continue}else if(c){if(this.line_char_count>=this.max_char){b.push("\n");for(var d=0;d<this.indent_level;d++){b.push(this.indent_string)}this.line_char_count=0}else{b.push(" ");this.line_char_count++}c=false}b.push(a)}return b.length?b.join(""):""};this.get_contents_to=function(a){if(this.pos==this.input.length){return["","TK_EOF"]}var b="";var c="";var d=new RegExp("</"+a+"\\s*>","igm");d.lastIndex=this.pos;var e=d.exec(this.input);var f=e?e.index:this.input.length;if(this.pos<f){c=this.input.substring(this.pos,f);this.pos=f}return c};this.record_tag=function(a){if(this.tags[a+"count"]){this.tags[a+"count"]++;this.tags[a+this.tags[a+"count"]]=this.indent_level}else{this.tags[a+"count"]=1;this.tags[a+this.tags[a+"count"]]=this.indent_level}this.tags[a+this.tags[a+"count"]+"parent"]=this.tags.parent;this.tags.parent=a+this.tags[a+"count"]};this.retrieve_tag=function(a){if(this.tags[a+"count"]){var b=this.tags.parent;while(b){if(a+this.tags[a+"count"]===b){break}b=this.tags[b+"parent"]}if(b){this.indent_level=this.tags[a+this.tags[a+"count"]];this.tags.parent=this.tags[b+"parent"]}delete this.tags[a+this.tags[a+"count"]+"parent"];delete this.tags[a+this.tags[a+"count"]];if(this.tags[a+"count"]==1){delete this.tags[a+"count"]}else{this.tags[a+"count"]--}}};this.get_tag=function(){var a="";var b=[];var c=false;do{if(this.pos>=this.input.length){return b.length?b.join(""):["","TK_EOF"]}a=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(a,this.Utils.whitespace)){c=true;this.line_char_count--;continue}if(a==="'"||a==='"'){if(!b[1]||b[1]!=="!"){a+=this.get_unformatted(a);c=true}}if(a==="="){c=false}if(b.length&&b[b.length-1]!=="="&&a!==">"&&c){if(this.line_char_count>=this.max_char){this.print_newline(false,b);this.line_char_count=0}else{b.push(" ");this.line_char_count++}c=false}b.push(a)}while(a!==">");var d=b.join("");var e;if(d.indexOf(" ")!=-1){e=d.indexOf(" ")}else{e=d.indexOf(">")}var f=d.substring(1,e).toLowerCase();if(d.charAt(d.length-2)==="/"||this.Utils.in_array(f,this.Utils.single_token)){this.tag_type="SINGLE"}else if(f==="script"){this.record_tag(f);this.tag_type="SCRIPT"}else if(f==="style"){this.record_tag(f);this.tag_type="STYLE"}else if(this.Utils.in_array(f,unformatted)){var g=this.get_unformatted("</"+f+">",d);b.push(g);this.tag_type="SINGLE"}else if(f.charAt(0)==="!"){if(f.indexOf("[if")!=-1){if(d.indexOf("!IE")!=-1){var g=this.get_unformatted("-->",d);b.push(g)}this.tag_type="START"}else if(f.indexOf("[endif")!=-1){this.tag_type="END";this.unindent()}else if(f.indexOf("[cdata[")!=-1){var g=this.get_unformatted("]]>",d);b.push(g);this.tag_type="SINGLE"}else{var g=this.get_unformatted("-->",d);b.push(g);this.tag_type="SINGLE"}}else{if(f.charAt(0)==="/"){this.retrieve_tag(f.substring(1));this.tag_type="END"}else{this.record_tag(f);this.tag_type="START"}if(this.Utils.in_array(f,this.Utils.extra_liners)){this.print_newline(true,this.output)}}return b.join("")};this.get_unformatted=function(a,b){if(b&&b.indexOf(a)!=-1){return""}var c="";var d="";var e=true;do{if(this.pos>=this.input.length){return d}c=this.input.charAt(this.pos);this.pos++;if(this.Utils.in_array(c,this.Utils.whitespace)){if(!e){this.line_char_count--;continue}if(c==="\n"||c==="\r"){d+="\n";this.line_char_count=0;continue}}d+=c;this.line_char_count++;e=true}while(d.indexOf(a)==-1);return d};this.get_token=function(){var a;if(this.last_token==="TK_TAG_SCRIPT"||this.last_token==="TK_TAG_STYLE"){var b=this.last_token.substr(7);a=this.get_contents_to(b);if(typeof a!=="string"){return a}return[a,"TK_"+b]}if(this.current_mode==="CONTENT"){a=this.get_content();if(typeof a!=="string"){return a}else{return[a,"TK_CONTENT"]}}if(this.current_mode==="TAG"){a=this.get_tag();if(typeof a!=="string"){return a}else{var c="TK_TAG_"+this.tag_type;return[a,c]}}};this.get_full_indent=function(a){a=this.indent_level+a||0;if(a<1)return"";return Array(a+1).join(this.indent_string)};this.printer=function(a,b,c,d,e){this.input=a||"";this.output=[];this.indent_character=b;this.indent_string="";this.indent_size=c;this.brace_style=e;this.indent_level=0;this.max_char=d;this.line_char_count=0;for(var f=0;f<this.indent_size;f++){this.indent_string+=this.indent_character}this.print_newline=function(a,b){this.line_char_count=0;if(!b||!b.length){return}if(!a){while(this.Utils.in_array(b[b.length-1],this.Utils.whitespace)){b.pop()}}b.push("\n");for(var c=0;c<this.indent_level;c++){b.push(this.indent_string)}};this.print_token=function(a){this.output.push(a)};this.indent=function(){this.indent_level++};this.unindent=function(){if(this.indent_level>0){this.indent_level--}}};return this}var c,d,e,f,g;b=b||{};d=b.indent_size||4;e=b.indent_char||" ";g=b.brace_style||"collapse";f=b.max_char==0?Infinity:b.max_char||70;unformatted=b.unformatted||["a"];c=new h;c.printer(a,e,d,f,g);while(true){var i=c.get_token();c.token_text=i[0];c.token_type=i[1];if(c.token_type==="TK_EOF"){break}switch(c.token_type){case"TK_TAG_START":c.print_newline(false,c.output);c.print_token(c.token_text);c.indent();c.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":c.print_newline(false,c.output);c.print_token(c.token_text);c.current_mode="CONTENT";break;case"TK_TAG_END":if(c.last_token==="TK_CONTENT"&&c.last_text===""){var j=c.token_text.match(/\w+/)[0];var k=c.output[c.output.length-1].match(/<\s*(\w+)/);if(k===null||k[1]!==j)c.print_newline(true,c.output)}c.print_token(c.token_text);c.current_mode="CONTENT";break;case"TK_TAG_SINGLE":c.print_newline(false,c.output);c.print_token(c.token_text);c.current_mode="CONTENT";break;case"TK_CONTENT":if(c.token_text!==""){c.print_token(c.token_text)}c.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(c.token_text!==""){c.output.push("\n");var l=c.token_text;if(c.token_type=="TK_SCRIPT"){var m=typeof js_beautify=="function"&&js_beautify}else if(c.token_type=="TK_STYLE"){var m=typeof css_beautify=="function"&&css_beautify}if(b.indent_scripts=="keep"){var n=0}else if(b.indent_scripts=="separate"){var n=-c.indent_level}else{var n=1}var o=c.get_full_indent(n);if(m){l=m(l.replace(/^\s*/,o),b)}else{var p=l.match(/^\s*/)[0];var q=p.match(/[^\n\r]*$/)[0].split(c.indent_string).length-1;var r=c.get_full_indent(n-q);l=l.replace(/^\s*/,o).replace(/\r\n|\r|\n/g,"\n"+r).replace(/\s*$/,"")}if(l){c.print_token(l);c.print_newline(true,c.output)}}c.current_mode="TAG";break}c.last_token=c.token_type;c.last_text=c.token_text}return c.output.join("")};


/*
 * Default text - jQuery plugin for html5 dragging files from desktop to browser
 *
 * Author: Weixi Yen
 *
 * Email: [Firstname][Lastname]@gmail.com
 * 
 * Copyright (c) 2010 Resopollution
 * 
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.github.com/weixiyen/jquery-filedrop
 *
 * Version:  0.1.0
 *
 * Features:
 *      Allows sending of extra parameters with file.
 *      Works with Firefox 3.6+
 *      Future-compliant with HTML5 spec (will work with Webkit browsers and IE9)
 * Usage:
 * 	See README at project homepage
 *
 */
(function($){

	jQuery.event.props.push("dataTransfer");
	var opts = {},
		default_opts = {
			url: '',
			refresh: 1000,
			paramname: 'userfile',
			maxfiles: 10,
			maxfilesize: 2, // MBs
			data: {},
			drop: empty,
			dragEnter: empty,
			dragOver: empty,
			dragLeave: empty,
			docEnter: empty,
			docOver: empty,
			docLeave: empty,
			beforeEach: empty,
			afterAll: function(){
				$('#all_pics').load('thumbnails.php #all_pics_holder');
				//var timeout = setTimeout(function() {$("#all_pics img").trigger("sporty")}, 3000);
			},
			rename: empty,
			error: function(err, file, i){alert(err);},
			uploadStarted: empty,
			uploadFinished: empty,
			progressUpdated: empty,
			speedUpdated: empty
		},
		errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge"],
		doc_leave_timer,
		stop_loop = false,
		files_count = 0,
		files;

	$.fn.filedrop = function(options) {
		opts = $.extend( {}, default_opts, options );
		
		this.bind('drop', drop).bind('dragenter', dragEnter).bind('dragover', dragOver).bind('dragleave', dragLeave);
		$(document).bind('drop', docDrop).bind('dragenter', docEnter).bind('dragover', docOver).bind('dragleave', docLeave);
	};
     
	function drop(e) {
		opts.drop(e);
		files = e.dataTransfer.files;
		if (files === null || files === undefined) {
			opts.error(errors[0]);
			return false;
		}
		
		files_count = files.length;
		upload();
		e.preventDefault();
		return false;
	}
	
	function getBuilder(filename, filedata, boundary) {
		var dashdash = '--',
			crlf = '\r\n',
			builder = '';

		$.each(opts.data, function(i, val) {
	    	if (typeof val === 'function') val = val();
			builder += dashdash;
			builder += boundary;
			builder += crlf;
			builder += 'Content-Disposition: form-data; name="'+i+'"';
			builder += crlf;
			builder += crlf;
			builder += val;
			builder += crlf;
		});
		
		builder += dashdash;
		builder += boundary;
		builder += crlf;
		builder += 'Content-Disposition: form-data; name="'+opts.paramname+'"';
		builder += '; filename="' + filename + '"';
		builder += crlf;
		
		builder += 'Content-Type: application/octet-stream';
		builder += crlf;
		builder += crlf; 
		
		builder += filedata;
		builder += crlf;
        
		builder += dashdash;
		builder += boundary;
		builder += dashdash;
		builder += crlf;
		return builder;
	}

	function progress(e) {
		if (e.lengthComputable) {
			var percentage = Math.round((e.loaded * 100) / e.total);
			if (this.currentProgress != percentage) {
				
				this.currentProgress = percentage;
				opts.progressUpdated(this.index, this.file, this.currentProgress);
				
				var elapsed = new Date().getTime();
				var diffTime = elapsed - this.currentStart;
				if (diffTime >= opts.refresh) {
					var diffData = e.loaded - this.startData;
					var speed = diffData / diffTime; // KB per second
					opts.speedUpdated(this.index, this.file, speed);
					this.startData = e.loaded;
					this.currentStart = elapsed;
				}
			}
		}
	}
    
    
    
	function upload() {
		stop_loop = false;
		if (!files) {
			opts.error(errors[0]);
			return false;
		}
		var filesDone = 0,
			filesRejected = 0;
		
		if (files_count > opts.maxfiles) {
		    opts.error(errors[1]);
		    return false;
		}

		for (var i=0; i<files_count; i++) {
			if (stop_loop) return false;
			try {
				if (beforeEach(files[i]) != false) {
					if (i === files_count) return;
					var reader = new FileReader(),
						max_file_size = 1048576 * opts.maxfilesize;
						
					reader.index = i;
					if (files[i].size > max_file_size) {
						opts.error(errors[2], files[i], i);
						filesRejected++;
						continue;
					}
					
					reader.onloadend = send;
					reader.readAsBinaryString(files[i]);
				} else {
					filesRejected++;
				}
			} catch(err) {
				opts.error(errors[0]);
				return false;
			}
		}
	    
		function send(e) {
			// Sometimes the index is not attached to the
			// event object. Find it by size. Hack for sure.
			if (e.target.index == undefined) {
				e.target.index = getIndexBySize(e.total);
			}
			
			var xhr = new XMLHttpRequest(),
				upload = xhr.upload,
				file = files[e.target.index],
				index = e.target.index,
				start_time = new Date().getTime(),
				boundary = '------multipartformboundary' + (new Date).getTime(),
				builder;
				
			newName = rename(file.name);
			if (typeof newName === "string") {
				builder = getBuilder(newName, e.target.result, boundary);
			} else {
				builder = getBuilder(file.name, e.target.result, boundary);
			}
			
			upload.index = index;
			upload.file = file;
			upload.downloadStartTime = start_time;
			upload.currentStart = start_time;
			upload.currentProgress = 0;
			upload.startData = 0;
			upload.addEventListener("progress", progress, false);
			
			xhr.open("POST", opts.url, true);
			xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' 
			    + boundary);
			    
			xhr.sendAsBinary(builder);  
			
			opts.uploadStarted(index, file, files_count);  
			
			xhr.onload = function() { 
			    if (xhr.responseText) {
				var now = new Date().getTime(),
				    timeDiff = now - start_time,
				    result = opts.uploadFinished(index, file, jQuery.parseJSON(xhr.responseText), timeDiff);
					filesDone++;
					if (filesDone == files_count - filesRejected) {
						afterAll();
					}
			    if (result === false) stop_loop = true;
			    }
			};
		}
	}
    
	function getIndexBySize(size) {
		for (var i=0; i < files_count; i++) {
			if (files[i].size == size) {
				return i;
			}
		}
		
		return undefined;
	}
    
	function rename(name) {
		return opts.rename(name);
	}
	
	function beforeEach(file) {
		return opts.beforeEach(file);
	}
	
	function afterAll() {
		return opts.afterAll();
	}
	
	function dragEnter(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.dragEnter(e);
	}
	
	function dragOver(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.docOver(e);
		opts.dragOver(e);
	}
	 
	function dragLeave(e) {
		clearTimeout(doc_leave_timer);
		opts.dragLeave(e);
		e.stopPropagation();
	}
	 
	function docDrop(e) {
		e.preventDefault();
		opts.docLeave(e);
		return false;
	}
	 
	function docEnter(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.docEnter(e);
		return false;
	}
	 
	function docOver(e) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		opts.docOver(e);
		return false;
	}
	 
	function docLeave(e) {
		doc_leave_timer = setTimeout(function(){
			opts.docLeave(e);
		}, 200);
	}
	 
	function empty(){}
	
	try {
		if (XMLHttpRequest.prototype.sendAsBinary) return;
		XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
		    function byteValue(x) {
		        return x.charCodeAt(0) & 0xff;
		    }
		    var ords = Array.prototype.map.call(datastr, byteValue);
		    var ui8a = new Uint8Array(ords);
		    this.send(ui8a.buffer);
		}
	} catch(e) {}
     
})(jQuery);


/**
 * WYSIWYG - jQuery plugin 0.3
 *
 * Copyright (c) 2008 Juan M Martinez
 * http://plugins.jquery.com/project/jWYSIWYG
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Id: $
 */
(function( $ )
{
    $.fn.document = function()
    {
        var element = this[0];
        if ( element.nodeName.toLowerCase() == 'iframe')
            return element.contentWindow.document;
            /*
            return ( $.browser.msie )
                ? document.frames[element.id].document
                : element.contentWindow.document // contentDocument;
             */
        else
            return $(this);
    };

    $.fn.documentSelection = function()
    {
        var element = this[0];

        if ( element.contentWindow.document.selection )
            return element.contentWindow.document.selection.createRange().text;
        else
            return element.contentWindow.getSelection().toString();
    };

    $.fn.wysiwyg = function( options )
    {
        if ( arguments.length > 0 && arguments[0].constructor == String )
        {
            var action = arguments[0].toString();
            var params = [];

            for ( var i = 1; i < arguments.length; i++ )
                params[i - 1] = arguments[i];

            if ( action in Wysiwyg )
            {
                return this.each(function()
                {
                    $.data(this, 'wysiwyg')
                     .designMode();

                    Wysiwyg[action].apply(this, params);
                });
            }
            else return this;
        }

        var controls = {};

        /**
         * If the user set custom controls, we catch it, and merge with the
         * defaults controls later.
         */
        if ( options && options.controls )
        {
            var controls = options.controls;
            delete options.controls;
        }

        var options = $.extend({
            html : '<'+'?xml version="1.0" encoding="UTF-8"?'+'><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" id="insideWys"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">STYLE_SHEET</head><body id="insideWysiwyg">INITIAL_CONTENT</body></html>',
            css  : {},

            debug        : false,

            autoSave     : true,  // http://code.google.com/p/jwysiwyg/issues/detail?id=11
            rmUnwantedBr : true,  // http://code.google.com/p/jwysiwyg/issues/detail?id=15

            controls : {},
            messages : {}
        }, options);

        $.extend(options.messages, Wysiwyg.MSGS_EN);
        $.extend(options.controls, Wysiwyg.TOOLBAR);

        for ( var control in controls )
        {
            if ( control in options.controls )
                $.extend(options.controls[control], controls[control]);
            else
                options.controls[control] = controls[control];
        }

        // not break the chain
        return this.each(function()
        {
            Wysiwyg(this, options);
        });
    };

    function Wysiwyg( element, options )
    {
        return this instanceof Wysiwyg
            ? this.init(element, options)
            : new Wysiwyg(element, options);
    }

    $.extend(Wysiwyg, {
        insertImage : function( szURL )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szURL && szURL.length > 0 )
                self.editorDoc.execCommand('insertImage', false, szURL);
        },

        createLink : function( szURL )
        {
            var self = $.data(this, 'wysiwyg');

            if ( self.constructor == Wysiwyg && szURL && szURL.length > 0 )
            {
                var selection = $(self.editor).documentSelection();

                if ( selection.length > 0 )
                {
                    self.editorDoc.execCommand('unlink', false, []);
                    self.editorDoc.execCommand('createLink', false, szURL);
                }
                else if ( self.options.messages.nonSelection )
                    alert(self.options.messages.nonSelection);
            }
        },

        clear : function()
        {
            var self = $.data(this, 'wysiwyg');
                self.setContent('');
                self.saveContent();
        },

        MSGS_EN : {
            nonSelection : 'select the text you wish to link'
        },

        TOOLBAR : {
            bold          : { visible : true, tags : ['strong'], css : { fontWeight : 'bold' } },
            italic        : { visible : true, tags : ['em'], css : { fontStyle : 'italic' } },
            strikeThrough : { visible : false, tags : ['s', 'strike'], css : { textDecoration : 'line-through' } },
            underline     : { visible : false, tags : ['u'], css : { textDecoration : 'underline' } },

            removeFormat : {
                visible : true,
                exec    : function()
                {
                    this.editorDoc.execCommand('removeFormat', false, []);
                    this.editorDoc.execCommand('unlink', false, []);
                }
            },

            separator00 : { visible : false, separator : true },

            justifyLeft   : { visible : false, css : { textAlign : 'left' } },
            justifyCenter : { visible : false, tags : ['center'], css : { textAlign : 'center' } },
            justifyRight  : { visible : false, css : { textAlign : 'right' } },
            justifyFull   : { visible : false, css : { textAlign : 'justify' } },

            separator01 : { visible : false, separator : true },

            indent  : { visible : false },
            outdent : { visible : false },

            separator02 : { visible : false, separator : true },

            subscript   : { visible : false, tags : ['sub'] },
            superscript : { visible : false, tags : ['sup'] },

            separator03 : { visible : false, separator : true },

            undo : { visible : false },
            redo : { visible : false },

            separator04 : { visible : false, separator : true },

            insertOrderedList    : { visible : false, tags : ['ol'] },
            insertUnorderedList  : { visible : false, tags : ['ul'] },
            insertHorizontalRule : { visible : false, tags : ['hr'] },

            separator05 : { separator : true },

            createLink : {
                visible : true,
                exec    : function()
                {
                    var selection = $(this.editor).documentSelection();

                    if ( selection.length > 0 )
                    {
                        if ( $.browser.msie )
                            this.editorDoc.execCommand('createLink', true, null);
                        else
                        {
                            var szURL = prompt('URL', 'http://');

                            if ( szURL && szURL.length > 0 )
                            {
                                this.editorDoc.execCommand('unlink', false, []);
                                this.editorDoc.execCommand('createLink', false, szURL);
                            }
                        }
                    }
                    else if ( this.options.messages.nonSelection )
                        alert(this.options.messages.nonSelection);
                },

                tags : ['a']
            },
			destroyLink : {
                visible : true,
                exec    : function()
                {
                    var selection = $(this.editor).documentSelection();

                    if ( selection.length > 0 )
                    {
                        if ( $.browser.msie )
                            this.editorDoc.execCommand('unlink', true, null);
                        else
                        {
                            this.editorDoc.execCommand('unlink', false, []);
                        }
                    }
                    else if ( this.options.messages.nonSelection )
                        alert(this.options.messages.nonSelection);
                },

                tags : ['a']
            },
            /*insertImage : {
                visible : true,
                exec    : function()
                {
                    if ( $.browser.msie )
                        this.editorDoc.execCommand('insertImage', true, null);
                    else
                    {
                        var szURL = prompt('URL', 'http://');

                        if ( szURL && szURL.length > 0 )
                            this.editorDoc.execCommand('insertImage', false, szURL);
                    }
                },

                tags : ['img']
            },*/
			upload: {
				visible: true,
				exec: function() { 
					//alert('Hello World');
					
					$.colorbox({inline:true, href:"#upload", width: '800px', height: '90%', onComplete: function(){ 
					
						$('#all_pics').load('thumbnails.php  #all_pics_holder', function(){
							 
						}); 
					}}); 
				},
				className: 'insertImage'
			},

            separator06 : { separator : true },

            h1mozilla : { visible : true && $.browser.mozilla, className : 'h1', command : 'heading', arguments : ['h1'], tags : ['h1'] },
            h2mozilla : { visible : true && $.browser.mozilla, className : 'h2', command : 'heading', arguments : ['h2'], tags : ['h2'] },
            h3mozilla : { visible : true && $.browser.mozilla, className : 'h3', command : 'heading', arguments : ['h3'], tags : ['h3'] },

            h1 : { visible : true && !( $.browser.mozilla ), className : 'h1', command : 'formatBlock', arguments : ['h1'], tags : ['h1'] },
            h2 : { visible : true && !( $.browser.mozilla ), className : 'h2', command : 'formatBlock', arguments : ['h2'], tags : ['h2'] },
            h3 : { visible : true && !( $.browser.mozilla ), className : 'h3', command : 'formatBlock', arguments : ['h3'], tags : ['h3'] },
			
			p : { visible : true, className : 'p', command : 'formatBlock', arguments : ['p'], tags : ['p'] },

            separator07 : { visible : false, separator : true },

            cut   : { visible : false },
            copy  : { visible : false },
            paste : { visible : false },

            separator08 : { separator : false && !( $.browser.msie ) },

            increaseFontSize : { visible : false && !( $.browser.msie ), tags : ['big'] },
            decreaseFontSize : { visible : false && !( $.browser.msie ), tags : ['small'] },

            separator09 : { separator : true },

            html : {
                visible : true,
                exec    : function()
                {                    
					if ( this.viewHTML )
                    {
                        this.setContent( $('#htmlContent').val() );
												
						$('.wysiwyg iframe').show().focus();			   
					    $('.edit_area button').show();
					   $('.wysiwyg ul.panel li a, .wysiwyg ul.panel li.separator').show();
						$('#htmlContent').remove();
						
						this.saveContent();
                    }
                    else
                    {
						this.saveContent();
						
						iframeContent = $('.wysiwyg iframe').contents().find('body').html();
						htmlContent = style_html(iframeContent);
						iframeWidth = this.element.outerWidth() - 6;
							
                        $('.wysiwyg').after('<textarea id="htmlContent" style="width:'+ iframeWidth +'px; height: '+ this.element.height() +'px;">'+ htmlContent +'</textarea>');
						
                       $('.wysiwyg iframe').hide();					   
					   $('.edit_area button').hide();
					   $('.wysiwyg ul.panel li a, .wysiwyg ul.panel li.separator').hide();
					   $('.wysiwyg ul.panel li a.html').show();
                    }

                    this.viewHTML = !( this.viewHTML );
					
                },
				tooltip: "View source code"
            }
        }
    });

    $.extend(Wysiwyg.prototype,
    {
        original : null,
        options  : {},

        element  : null,
        editor   : null,

        init : function( element, options )
        {
            var self = this;
            this.editor = element;
            this.options = options || {};

            $.data(element, 'wysiwyg', this);

            var newX = element.width || element.clientWidth;
            var newY = element.height || element.clientHeight;

            if ( element.nodeName.toLowerCase() == 'textarea' )
            {
                this.original = element;

                if ( newX == 0 && element.cols )
                    newX = ( element.cols * 8 ) + 21;

                if ( newY == 0 && element.rows )
                    newY = ( element.rows * 16 ) + 16;

                var editor = this.editor = $('<iframe></iframe>').css({
                    minHeight : ( newY - 6 ).toString() + 'px',
                    width     : ( newX - 8 ).toString() + 'px'
                }).attr('id', $(element).attr('id') + 'IFrame');

                if ( $.browser.msie )
                {
                    this.editor
                        .css('height', ( newY ).toString() + 'px');

                    /**
                    var editor = $('<span></span>').css({
                        width     : ( newX - 6 ).toString() + 'px',
                        height    : ( newY - 8 ).toString() + 'px'
                    }).attr('id', $(element).attr('id') + 'IFrame');

                    editor.outerHTML = this.editor.outerHTML;
                     */
                }
            }

            var panel = this.panel = $('<ul></ul>').addClass('panel');

            this.appendControls();
            this.element = $('<div></div>').css({
                width : ( newX > 0 ) ? ( newX ).toString() + 'px' : '100%'
            }).addClass('wysiwyg')
              .append(panel)
              .append( $('<div><!-- --></div>').css({ clear : 'both' }) )
              .append(editor);

            $(element)
            // .css('display', 'none')
            .hide()
            .before(this.element);

            this.viewHTML = false;

            this.initialHeight = newY - 8;
            this.initialContent = $(element).text();
            this.initFrame();

            if ( this.initialContent.length == 0 )
                this.setContent('');

            if ( this.options.autoSave )
                $('form').submit(function() { self.saveContent(); });
        },

        initFrame : function()
        {
            var self = this;
            var style = '';

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=14
             */
            if ( this.options.css && this.options.css.constructor == String )
                style = '<link rel="stylesheet" type="text/css" media="screen" href="' + this.options.css + '" />';

            this.editorDoc = $(this.editor).document();
            this.editorDoc.open();
            this.editorDoc.write(
                this.options.html
                    .replace(/INITIAL_CONTENT/, this.initialContent)
                    .replace(/STYLE_SHEET/, style)
            );
            this.editorDoc.close();
            this.editorDoc.contentEditable = 'true';

            this.editorDoc_designMode = false;

            try {
                this.editorDoc.designMode = 'on';
                this.editorDoc_designMode = true;
            } catch ( e ) {
                // Will fail on Gecko if the editor is placed in an hidden container element
                // The design mode will be set ones the editor is focused

                $(this.editorDoc).focus(function()
                {
                    self.designMode();
                });
            }

            if ( $.browser.msie )
            {
                /**
                 * Remove the horrible border it has on IE.
                 */
                setTimeout(function() { $(self.editorDoc.body).css('border', 'none'); }, 0);
            }

            $(this.editorDoc).click(function( event )
            {
                self.checkTargets( event.target ? event.target : event.srcElement);
            });

            /**
             * @link http://code.google.com/p/jwysiwyg/issues/detail?id=20
             */
            $(this.original).focus(function()
            {
                $(self.editorDoc.body).focus();
            });

            if ( this.options.autoSave )
            {
                /**
                 * @link http://code.google.com/p/jwysiwyg/issues/detail?id=11
                 */
                $(this.editorDoc).keydown(function() { self.saveContent(); })
                                 .mousedown(function() { self.saveContent(); });
            }

            if ( this.options.css )
            {
                setTimeout(function()
                {
                    if ( self.options.css.constructor == String )
                    {
                        /**
                         * $(self.editorDoc)
                         * .find('head')
                         * .append(
                         *     $('<link rel="stylesheet" type="text/css" media="screen" />')
                         *     .attr('href', self.options.css)
                         * );
                         */
                    }
                    else
                        $(self.editorDoc).find('body').css(self.options.css);
                }, 0);
            }
			
			// Image hover event for deleting/editing images
			$(this.editorDoc).find('img').live('mouseover',function(){
				imgWide = $(this).width();
				floated = $(this).css('float');
				marginRightPX = $(this).css('margin-right');
				marginLeftPX = $(this).css('margin-left');
				imgHigh = $(this).height();
				halfWidth = Number(imgWide / 2) - 40;
				marginRight = marginRightPX.replace('px','');				
				marginLeft = marginLeftPX.replace('px','');
				$(this).stop().fadeTo(300, '0.8').wrap('<span id="selectedImage" style="font-family: Arial;display: block; text-align: center; cursor: move; position: relative; width: '+ (imgWide + Number(marginRight)) +'px; height: '+ (imgHigh + 15) +'px; float: '+ floated +'; clear: '+ floated +'"></span>').parent().append('<span id="deleteImg" style="position: absolute; color: #222; display: block; padding: 1px 4px; background: #efefef; font-size: 11px; opacity: 0.8; z-index: 1000; border-radius: 6px; bottom: 10px; width: 80px; margin: 0px '+ halfWidth +'px;">double click to remove</span><span id="editImg" style="position: absolute; top: 5px; color: #222; display: block; padding: 1px 4px; font-size: 11px; opacity: 0.8; z-index: 1000; background: #efefef; border-radius: 6px; width: 80px; margin: 0px '+ halfWidth +'px;">drag to move</span>');
				
				$(this).dblclick(function(){
					$(this).remove();
				});
				
				$(this).mousedown(function() {
					$(this).stop().fadeTo(300, '1.0').parent().find('#editImg').remove();
					$(this).parent().find('#deleteImg').remove();
					$(this).unwrap();
				});				
			});
			$(this.editorDoc).find('img').live('mouseout', function(){
				
				$(this).stop().fadeTo(300, '1.0').parent().find('#editImg').remove();
				$(this).parent().find('#deleteImg').remove();
				$(this).unwrap();
			});
			
			/*$(this.editorDoc).find('img').mouseleave(function(){
				$(this).parent().find('#editImg').remove();
				$(this).parent().find('#deleteImg').remove();
				$(this).unwrap();
			});*/
        },

        designMode : function()
        {
            if ( !( this.editorDoc_designMode ) )
            {
                try {
                    this.editorDoc.designMode = 'on';
                    this.editorDoc_designMode = true;
                } catch ( e ) {}
            }
        },

        getContent : function()
        {
            return $( $(this.editor).document() ).find('body').html();
        },

        setContent : function( newContent )
        {
            $( $(this.editor).document() ).find('body').html(newContent);
        },

        saveContent : function()
        {
            if ( this.original )
            {
                var content = this.getContent();

                if ( this.options.rmUnwantedBr )
                    content = ( content.substr(-4) == '<br>' ) ? content.substr(0, content.length - 4) : content;

                $(this.original).val(content);
            }
        },

        appendMenu : function( cmd, args, className, fn )
        {
            var self = this;
            var args = args || [];

            $('<li></li>').append(
                $('<a><!-- --></a>').addClass(className || cmd)
            ).mousedown(function() {
                if ( fn ) fn.apply(self); else self.editorDoc.execCommand(cmd, false, args);
                if ( self.options.autoSave ) self.saveContent();
            }).appendTo( this.panel );
        },

        appendMenuSeparator : function()
        {
            $('<li class="separator"></li>').appendTo( this.panel );
        },

        appendControls : function()
        {
            for ( var name in this.options.controls )
            {
                var control = this.options.controls[name];

                if ( control.separator )
                {
                    if ( control.visible !== false )
                        this.appendMenuSeparator();
                }
                else if ( control.visible )
                {
                    this.appendMenu(
                        control.command || name, control.arguments || [],
                        control.className || control.command || name || 'empty', control.exec
                    );
                }
            }
        },

        checkTargets : function( element )
        {
            for ( var name in this.options.controls )
            {
                var control = this.options.controls[name];
                var className = control.className || control.command || name || 'empty';

                $('.' + className, this.panel).removeClass('active');

                if ( control.tags )
                {
                    var elm = element;

                    do {
                        if ( elm.nodeType != 1 )
                            break;

                        if ( $.inArray(elm.tagName.toLowerCase(), control.tags) != -1 )
                            $('.' + className, this.panel).addClass('active');
                    } while ( elm = elm.parentNode );
                }

                if ( control.css )
                {
                    var elm = $(element);

                    do {
                        if ( elm[0].nodeType != 1 )
                            break;

                        for ( var cssProperty in control.css )
                            if ( elm.css(cssProperty).toString().toLowerCase() == control.css[cssProperty] )
                                $('.' + className, this.panel).addClass('active');
                    } while ( elm = elm.parent() );
                }
            }
        }
    });
})(jQuery);



/*
 * Jeditable - jQuery in place edit plugin
 *
 * Copyright (c) 2006-2009 Mika Tuupola, Dylan Verheul
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Based on editable by Dylan Verheul <dylan_at_dyve.net>:
 *    http://www.dyve.net/jquery/?editable
 *
 */

/**
  * Version 1.7.1
  *
  * ** means there is basic unit tests for this parameter. 
  *
  * @name  Jeditable
  * @type  jQuery
  * @param String  target             (POST) URL or function to send edited content to **
  * @param Hash    options            additional options 
  * @param String  options[method]    method to use to send edited content (POST or PUT) **
  * @param Function options[callback] Function to run after submitting edited content **
  * @param String  options[name]      POST parameter name of edited content
  * @param String  options[id]        POST parameter name of edited div id
  * @param Hash    options[submitdata] Extra parameters to send when submitting edited content.
  * @param String  options[type]      text, textarea or select (or any 3rd party input type) **
  * @param Integer options[rows]      number of rows if using textarea ** 
  * @param Integer options[cols]      number of columns if using textarea **
  * @param Mixed   options[height]    'auto', 'none' or height in pixels **
  * @param Mixed   options[width]     'auto', 'none' or width in pixels **
  * @param String  options[loadurl]   URL to fetch input content before editing **
  * @param String  options[loadtype]  Request type for load url. Should be GET or POST.
  * @param String  options[loadtext]  Text to display while loading external content.
  * @param Mixed   options[loaddata]  Extra parameters to pass when fetching content before editing.
  * @param Mixed   options[data]      Or content given as paramameter. String or function.**
  * @param String  options[indicator] indicator html to show when saving
  * @param String  options[tooltip]   optional tooltip text via title attribute **
  * @param String  options[event]     jQuery event such as 'click' of 'dblclick' **
  * @param String  options[submit]    submit button value, empty means no button **
  * @param String  options[cancel]    cancel button value, empty means no button **
  * @param String  options[cssclass]  CSS class to apply to input form. 'inherit' to copy from parent. **
  * @param String  options[style]     Style to apply to input form 'inherit' to copy from parent. **
  * @param String  options[select]    true or false, when true text is highlighted ??
  * @param String  options[placeholder] Placeholder text or html to insert when element is empty. **
  * @param String  options[onblur]    'cancel', 'submit', 'ignore' or function ??
  *             
  * @param Function options[onsubmit] function(settings, original) { ... } called before submit
  * @param Function options[onreset]  function(settings, original) { ... } called before reset
  * @param Function options[onerror]  function(settings, original, xhr) { ... } called on error
  *             
  * @param Hash    options[ajaxoptions]  jQuery Ajax options. See docs.jquery.com.
  *             
  */
(function($){$.fn.editable=function(a,b){if("disable"==a){$(this).data("disabled.editable",true);return}if("enable"==a){$(this).data("disabled.editable",false);return}if("destroy"==a){$(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");return}var c=$.extend({},$.fn.editable.defaults,{target:a},b);var d=$.editable.types[c.type].plugin||function(){};var e=$.editable.types[c.type].submit||function(){};var f=$.editable.types[c.type].buttons||$.editable.types["defaults"].buttons;var g=$.editable.types[c.type].content||$.editable.types["defaults"].content;var h=$.editable.types[c.type].element||$.editable.types["defaults"].element;var i=$.editable.types[c.type].reset||$.editable.types["defaults"].reset;var j=c.callback||function(){};var k=c.onedit||function(){};var l=c.onsubmit||function(){};var m=c.onreset||function(){};var n=c.onerror||i;if(c.tooltip){$(this).attr("title",c.tooltip)}c.autowidth="auto"==c.width;c.autoheight="auto"==c.height;return this.each(function(){var a=this;var b=$(a).width();var o=$(a).height();$(this).data("event.editable",c.event);if(!$.trim($(this).html())){$(this).html(c.placeholder)}$(this).bind(c.event,function(m){if(true===$(this).data("disabled.editable")){return}if(a.editing){return}if(false===k.apply(this,[c,a])){return}m.preventDefault();m.stopPropagation();if(c.tooltip){$(a).removeAttr("title")}if(0==$(a).width()){c.width=b;c.height=o}else{if(c.width!="none"){c.width=c.autowidth?$(a).width():c.width}if(c.height!="none"){c.height=c.autoheight?$(a).height():c.height}}if($(this).html().toLowerCase().replace(/(;|")/g,"")==c.placeholder.toLowerCase().replace(/(;|")/g,"")){$(this).html("")}a.editing=true;a.revert=$(a).html();$(a).html("");var p=$("<form />");if(c.cssclass){if("inherit"==c.cssclass){p.attr("class",$(a).attr("class"))}else{p.attr("class",c.cssclass)}}if(c.style){if("inherit"==c.style){p.attr("style",$(a).attr("style"));p.css("display",$(a).css("display"))}else{p.attr("style",c.style)}}var q=h.apply(p,[c,a]);var r;if(c.loadurl){var s=setTimeout(function(){q.disabled=true;g.apply(p,[c.loadtext,c,a])},100);var t={};t[c.id]=a.id;if($.isFunction(c.loaddata)){$.extend(t,c.loaddata.apply(a,[a.revert,c]))}else{$.extend(t,c.loaddata)}$.ajax({type:c.loadtype,url:c.loadurl,data:t,async:false,success:function(a){window.clearTimeout(s);r=a;q.disabled=false}})}else if(c.data){r=c.data;if($.isFunction(c.data)){r=c.data.apply(a,[a.revert,c])}}else{r=a.revert}g.apply(p,[r,c,a]);q.attr("name",c.name);f.apply(p,[c,a]);$(a).append(p);d.apply(p,[c,a]);$(":input:visible:enabled:first",p).focus();if(c.select){q.select()}q.keydown(function(b){if(b.keyCode==27){b.preventDefault();i.apply(p,[c,a])}});var s;if("cancel"==c.onblur){q.blur(function(b){s=setTimeout(function(){i.apply(p,[c,a])},500)})}else if("submit"==c.onblur){q.blur(function(a){s=setTimeout(function(){p.submit()},200)})}else if($.isFunction(c.onblur)){q.blur(function(b){c.onblur.apply(a,[q.val(),c])})}else{q.blur(function(a){})}p.submit(function(b){if(s){clearTimeout(s)}b.preventDefault();if(false!==l.apply(p,[c,a])){if(false!==e.apply(p,[c,a])){if($.isFunction(c.target)){var d=c.target.apply(a,[q.val(),c]);$(a).html(d);a.editing=false;j.apply(a,[a.innerHTML,c]);if(!$.trim($(a).html())){$(a).html(c.placeholder)}}else{var f={};f[c.name]=q.val();f[c.id]=a.id;if($.isFunction(c.submitdata)){$.extend(f,c.submitdata.apply(a,[a.revert,c]))}else{$.extend(f,c.submitdata)}if("PUT"==c.method){f["_method"]="put"}$(a).html(c.indicator);var g={type:"POST",data:f,dataType:"html",url:c.target,success:function(b,d){if(g.dataType=="html"){$(a).html(b)}a.editing=false;j.apply(a,[b,c]);if(!$.trim($(a).html())){$(a).html(c.placeholder)}},error:function(b,d,e){n.apply(p,[c,a,b])}};$.extend(g,c.ajaxoptions);$.ajax(g)}}}$(a).attr("title",c.tooltip);return false})});this.reset=function(b){if(this.editing){if(false!==m.apply(b,[c,a])){$(a).html(a.revert);a.editing=false;if(!$.trim($(a).html())){$(a).html(c.placeholder)}if(c.tooltip){$(a).attr("title",c.tooltip)}}}}})};$.editable={types:{defaults:{element:function(a,b){var c=$('<input type="hidden"></input>');$(this).append(c);return c},content:function(a,b,c){$(":input:first",this).val(a)},reset:function(a,b){b.reset(this)},buttons:function(a,b){var c=this;if(a.submit){if(a.submit.match(/>$/)){var d=$(a.submit).click(function(){if(d.attr("type")!="submit"){c.submit()}})}else{var d=$('<button type="submit" />');d.html(a.submit)}$(this).append(d)}if(a.cancel){if(a.cancel.match(/>$/)){var e=$(a.cancel)}else{var e=$('<button type="cancel" />');e.html(a.cancel)}$(this).append(e);$(e).click(function(d){if($.isFunction($.editable.types[a.type].reset)){var e=$.editable.types[a.type].reset}else{var e=$.editable.types["defaults"].reset}e.apply(c,[a,b]);return false})}}},text:{element:function(a,b){var c=$("<input />");if(a.width!="none"){c.width(a.width)}if(a.height!="none"){c.height(a.height)}c.attr("autocomplete","off");$(this).append(c);return c}},textarea:{element:function(a,b){var c=$("<textarea />");if(a.rows){c.attr("rows",a.rows)}else if(a.height!="none"){c.height(a.height+100)}if(a.cols){c.attr("cols",a.cols)}else if(a.width!="none"){c.width(a.width)}$(this).append(c);return c}},select:{element:function(a,b){var c=$("<select />");$(this).append(c);return c},content:function(data,settings,original){if(String==data.constructor){eval("var json = "+data)}else{var json=data}for(var key in json){if(!json.hasOwnProperty(key)){continue}if("selected"==key){continue}var option=$("<option />").val(key).append(json[key]);$("select",this).append(option)}$("select",this).children().each(function(){if($(this).val()==json["selected"]||$(this).text()==$.trim(original.revert)){$(this).attr("selected","selected")}})}}},addInputType:function(a,b){$.editable.types[a]=b}};$.fn.editable.defaults={name:"value",id:"id",type:"text",width:"auto",height:"auto",event:"click.editable",onblur:"cancel",loadtype:"GET",loadtext:"Loading...",placeholder:"Click to edit",loaddata:{},submitdata:{},ajaxoptions:{}}})(jQuery)


/*
 * Wysiwyg input for Jeditable
 *
 * Copyright (c) 2008 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Depends on jWYSIWYG plugin by Juan M Martinez:
 *   http://projects.bundleweb.com.ar/jWYSIWYG/
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Revision: $Id$
 *
 */
 
$.editable.addInputType('wysiwyg', {
    /* Use default textarea instead of writing code here again. */
    //element : $.editable.types.textarea.element,
    element : function(settings, original) {
        /* Hide textarea to avoid flicker. */
        var textarea = $('<textarea>')/*.css("opacity", "0")*/;
        if (settings.rows) {
            textarea.attr('rows', settings.rows);
        } else {
            textarea.height(settings.height + 20);
        }
        if (settings.cols) {
            textarea.attr('cols', settings.cols);
        } else {
            textarea.width(settings.width);
        }
        $(this).append(textarea);
        return(textarea);
    },
    content : function(string, settings, original) { 
        /* jWYSIWYG plugin uses .text() instead of .val()        */
        /* For some reason it did not work work with generated   */
        /* textareas so I am forcing the value here with .text() */
        $('textarea', this).text(string);
    },
    plugin : function(settings, original) {
        var self = this;
        /* Force autosave off to avoid "element.contentWindow has no properties" */
        settings.wysiwyg = $.extend({autoSave: true}, settings.wysiwyg);
        if (settings.wysiwyg) {
            setTimeout(function() { $('textarea', self).wysiwyg(settings.wysiwyg); }, 0);
        } else {
            setTimeout(function() { $('textarea', self).wysiwyg(); }, 0);
        }
    },
    submit : function(settings, original) {
        var iframe         = $("iframe", this).get(0); 
        var inner_document = typeof(iframe.contentDocument) == 'undefined' ?  iframe.contentWindow.document.body : iframe.contentDocument.body;
        var new_content    = $(inner_document).html();
        $('textarea', this).val(new_content);
    }
});




$(document).ready(function() {
	var page = $('body').attr('id');	
	
	$('a#editTitleBtn').live('click', function(e){
		e.preventDefault();
		$('div#title').fadeToggle(); 
		$('div#editMenu').css('display','none');
		$('div#deleter').css('display','none'); 	  
	});
	
	$('a#editMenuBtn').live('click', function(e){
		e.preventDefault(); 
		$('div#editMenu').fadeToggle();	
		$('div#title').css('display','none');
		$('div#deleter').css('display','none'); 
	});
	
	$('a#deleterBtn').live('click', function(e){
		e.preventDefault(); 
		$('div#deleter').fadeToggle();	
		$('div#title').css('display','none'); 
		$('div#editMenu').css('display','none');
	});
	
	$('button#cancelDelete').live('click', function(){		
		$('div#deleter').fadeToggle();
	});
	
	$('.edit_area').editable(page, { 
         type      : 'wysiwyg',
         cancel    : 'Cancel',
         submit    : 'Save',
         indicator : '<img src="img/indicator.gif">',
         tooltip   : 'Click to edit...',
		 id   : 'id',
         name : 'value',
		 onblur : 'ignore',		 
		 wysiwyg   : { 
		 	controls : { 
				separator04  : { 
					visible : true 
				},
			   	insertOrderedList   : { 
					visible : true 
				},
			   	insertUnorderedList : { 
					visible : true 
				}
			},
			css: 'css/global.css'
		}
     });	 
	 $('.edit_title').editable(page, { 
         type      : 'text',
         cancel    : 'Cancel',
         submit    : 'Save',
         indicator : '<img src="img/indicator.gif">',
         tooltip   : 'Click to edit...',
		 id   : 'id',
         name : 'value',
		 onblur : 'ignore'
     });
	 $('.edit_menu').editable('nav_menu', { 
         type      : 'textarea',
         cancel    : 'Cancel',
         submit    : 'Save',
         indicator : '<img src="img/indicator.gif">',
         tooltip   : 'Click to edit code directly...',
		 id   : 'id',
         name : 'value',
		 onblur : 'ignore'
     });
	 
	 $('.edit_footer').editable('footer', { 
         type      : 'wysiwyg',
         cancel    : 'Cancel',
         submit    : 'Save',
         indicator : '<img src="img/indicator.gif">',
         tooltip   : 'Click to edit...',
		 id   : 'id',
         name : 'value',
		 onblur : 'ignore',
		 wysiwyg   : { 
		 	controls : { 
				separator04  : { 
					visible : true 
				},
			   	insertOrderedList   : { 
					visible : true 
				},
			   	insertUnorderedList : { 
					visible : true 
				}
			},
			css: 'css/global.css'
		}
     });
	 
	 
	 // Uploader scripts from http://tutorialzine.com/2011/09/html5-file-upload-jquery-php/
	 //
	 
	 var dropbox = $('#dropbox'),
		message = $('.message', dropbox);

	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'pic',
		maxfiles: 10,
    	maxfilesize: 2, // in mb
		url: 'upload',
		uploadFinished:function(i,file,response){
			$.data(file).addClass('done');
			//var timeout = setTimeout(function() {$("#all_pics img").trigger("sporty")}, 3000);
			// response is the JSON object that post_file.php returns
		},
    	error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
					showMessage('Your browser does not support HTML5 file uploads!');
					break;
				case 'TooManyFiles':
					alert('Too many files! Please select 5 at most!');
					break;
				case 'FileTooLarge':
					alert(file.name+' is too large! Please upload files up to 2mb.');
					break;
				default:
					break;
			}
		},
		// Called before each upload is started
		beforeEach: function(file){
			if(!file.type.match(/^image\//)){
				alert('Only images are allowed!');

				// Returning false will cause the
				// file to be rejected
				return false;
			}
		},
		uploadStarted:function(i, file, len){
			createImage(file);
		},
		progressUpdated: function(i, file, progress) {
			$.data(file).find('.progress').width(progress);
		}
	});

	var template = '<div class="preview">'+
						'<span class="imageHolder">'+
							'<img />'+
							'<span class="uploaded"></span>'+
						'</span>'+
						'<div class="progressHolder">'+
							'<div class="progress"></div>'+
						'</div>'+
					'</div>'; 

	function createImage(file){

		var preview = $(template),
			image = $('img', preview);

		var reader = new FileReader();

		image.width = 100;
		image.height = 100;

		reader.onload = function(e){

			// e.target.result holds the DataURL which
			// can be used as a source of the image:

			image.attr('src',e.target.result);
		};

		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);

		message.hide();
		preview.appendTo(dropbox);

		// Associating a preview container
		// with the file, using jQuery's $.data():

		$.data(file,preview);
	}

	function showMessage(msg){
		message.html(msg);
	}	
	
	$('a.insertPic').live('click', function(){
		picURL = $(this).attr('rel');
		$('.insertForm').remove();
		$('.all_pics').fadeTo(100,0.2);
		$(this).parent().fadeTo(1000,1.0);
		$(this).parent().after('<div class="insertForm"><form id="insertDetails" action="" method="POST"><p><label for="imgDescription">Image Description:</label> <input type="text" required="required" value="" name="imgDescription" id="imgDescription" /></p><p><label for="width">Width in pixels:</label> <input type="number" required="required" value="" name="width" id="imgWidth" max="800" min="1" /></p><p><label for="align">Align:</label> <select name="align" id="imgAlign"><option value="none">Default</option><option value="left">Left</option><option value="right">Right</option></select></p><p><input type="hidden" value="'+ picURL +'" id="imgFilename" name="imgFilename" /><button id="insertNow" type="submit">Insert</a> <button type="reset" value="Cancel" name="cancel" id="cancelInsert">Cancel</button></p></form></div>');
	});
	
	$('button#cancelInsert:reset').live('click', function(e){	
		
		$('.all_pics').fadeTo(1000,1.0);
		$('.insertForm').remove();
	});
	
	$('button#insertNow').live('click', function(e){
		e.preventDefault();
		var imgDescription = htmlEscape($('#imgDescription').val()),
		 	imgWidth = $('#imgWidth').val(),
			imgAlign = $('#imgAlign').val(),
			imgFilename = $('#imgFilename').val(),
			margins = '';
			if(imgAlign == 'left'){
				margins = '10px 14px 5px 0px';
			} else if(imgAlign == 'right'){
				margins = '10px 0px 5px 14px ';
			} else{
				margins = '5px 0px';
			}
			iframe = $(".wysiwyg iframe").get(0); 
        var inner_document = typeof(iframe.contentDocument) == 'undefined' ?  iframe.contentWindow.document.body : iframe.contentDocument.body;
        $(inner_document).prepend('<img src="uploads/'+ imgFilename +'" alt="'+ imgDescription +'" style="width: '+ imgWidth +'px; float: '+ imgAlign +'; margin: '+margins +'; display: block; clear: '+ imgAlign +'" class="float'+ imgAlign +'" />');
		
		$('.all_pics').fadeTo(1000,1.0);
		$('.insertForm').remove();
		$.colorbox.close();
	});
	
	
	
	
	
	$('span#removeImage').live('click', function(){
		var imgDescription = htmlEscape($('#imgDescription').val()),
		 	imgWidth = $('#imgWidth').val(),
			imgAlign = $('#imgAlign').val(),
			imgFilename = $('#imgFilename').val(),
			iframe = $(".wysiwyg iframe").get(0); 
        var inner_document = typeof(iframe.contentDocument) == 'undefined' ?  iframe.contentWindow.document.body : iframe.contentDocument.body;
        $(inner_document).prepend('<img src="uploads/'+ imgFilename +'" alt="'+ imgDescription +'" style="width: '+ imgWidth +'px; float: '+ imgAlign +'; margin: 5px 20px 10px 20px; display: block;" class="float'+ imgAlign +'" />');
		
		$('.all_pics').fadeTo(1000,1.0);
		$('.insertForm').remove();
	});
	
	$("#searcher").keyup(function(){
		var SEARCHWORD = this.value;
		$("#all_pics div.all_pics").each(function(){		
			if($(this).text().toUpperCase().indexOf(SEARCHWORD.toUpperCase()) >=0)
			   $(this).show();
			else
			   $(this).hide();
		});
	});
	
	function htmlEscape(str) {
    return String(str)
            .replace(/&/g, 'and')
            .replace(/"/g, '')
            .replace(/'/g, '')
            .replace(/</g, '')
            .replace(/>/g, '');
	}
});