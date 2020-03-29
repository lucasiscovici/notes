define([
    'require',
    'jquery',
    'base/js/namespace',
    'base/js/events',
    'notebook/js/codecell'
], function(
    requirejs,
    $,
    Jupyter,
    events,
    codecell
) {
    "use strict";

   

function addCSS(name){
var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = requirejs.toUrl(name);
        document.getElementsByTagName("head")[0].appendChild(link);
}

    var load_css = function() {
            addCSS("./main.css");
                        // addCSS("http://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css")
       // $.getScript("http://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js")
         // addCSS("http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css");
        addCSS("https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css");
        

    };

    //.....................global variables....



    var notes_button = function() {
        if (!Jupyter.toolbar) {
            events.on("app_initialized.NotebookApp", notes_button);
            return;
        }
        if ($("#notes_button").length === 0) {
            $(Jupyter.toolbar.add_buttons_group([
                Jupyter.keyboard_manager.actions.register ({
                    'help'   : 'notes',
                    'icon'   : 'fa-sticky-note-o',
                    'handler': toggleNotes,
                }, 'notes', 'notes')
            ])).find('.btn').attr('id', 'notes_button');
        }
    };


var SaveButton = function (context) {
  var ui = $.summernote.ui;

  // create button
  var button = ui.button({
    contents: '<i class="fa fa-save"/> Save',
    tooltip: 'save',
    click: function () {
      // invoke insertText method with 'hello' on editor module.
        myCustomSaveContent($('#summernote').summernote("code"))
    }
  });

  return button.render();   // return button as jquery object
}

var FocusButton = function (context) {
  var ui = $.summernote.ui;

  // create button
  var button = ui.button({
    contents: '<i class="fa <i class="fas fa-mouse-pointer"/> Enter',
    tooltip: 'enter',
    click: function () {
      // invoke insertText method with 'hello' on editor module.
       $('#summernote').summernote("focus")
    }
  });

  return button.render();   // return button as jquery object
}
// You can see render() which returns jquery object as button.



function html_table_notes() {

    // var kernelLanguage = Jupyter.notebook.metadata.kernelspec.language.toLowerCase()
    
    // var kernel_config = cfg.kernels_config[kernelLanguage];
    // var varList = JSON.parse(String(jsonVars))

    // var shape_str = '';
    // var has_shape = false;
    if (Jupyter.notebook.metadata.notes==undefined) {
        Jupyter.notebook.metadata.notes={}
    }
    var notes = Jupyter.notebook.metadata.notes.notes
    if (notes==undefined) {
        Jupyter.notebook.metadata.notes.notes=""
    }
    var beg_table = '<div id="summernote"></div>';
  
    return [beg_table,notes,function(){
                //   requirejs(
                // [
                //     '/nbextensions/notes/summernote-lite.js'
                //     //'nbextensions/varInspector/colResizable-1.6.min'
                // ],
                // function() {
                    if ($.summernote==undefined) {
  requirejs(
                [
                    '/nbextensions/notes/summernote-lite.js'
                    //'nbextensions/varInspector/colResizable-1.6.min'
                ],
                function() {

                   $('#summernote').summernote({

                     callbacks: {
                         onEnter: function() {
      $('#summernote').focus();
    },
    onFocus: function() {
      Jupyter.keyboard_manager.disable();
    },
    onBlur: function() {
      Jupyter.keyboard_manager.enable();
    }
  },
  disableDragAndDrop: false,
  disableResizeEditor: true,
    // airMode: true,
   toolbar: [
  ['style', ['style']],
  ['font', ['bold', 'underline', 'clear']],
  ['fontname', ['fontname']],
  ['color', ['color']],
  ['para', ['ul', 'ol', 'paragraph']],
  ['table', ['table']],
  ['insert', ['link', 'picture', 'video']],
  ['view', ['fullscreen', 'codeview', 'help']],
    ['mysave', ['save',"focus"]]
  ],

  buttons: {
    save: SaveButton,
    focus:FocusButton
  }
});

    })
}else{

                   $('#summernote').summernote({

                     callbacks: {
                         onEnter: function() {
      $('#summernote').focus();
    },
    onFocus: function() {
      Jupyter.keyboard_manager.disable();
    },
    onBlur: function() {
      Jupyter.keyboard_manager.enable();
    }
  },
  disableDragAndDrop: false,
  disableResizeEditor: true,
    // airMode: true,
   toolbar: [
  ['style', ['style']],
  ['font', ['bold', 'underline', 'clear']],
  ['fontname', ['fontname']],
  ['color', ['color']],
  ['para', ['ul', 'ol', 'paragraph']],
  ['table', ['table']],
  ['insert', ['link', 'picture', 'video']],
  ['view', ['fullscreen', 'codeview', 'help']],
    ['mysave', ['save',"focus"]]
  ],

  buttons: {
    save: SaveButton,
    focus:FocusButton
  }
});
}
}];
}
function myCustomSaveContent(code) {
    Jupyter.notebook.metadata.notes.notes=code;
}
var cfg={
"oldHeight":0
}
var st = {}

   function toggleNotes() {
        toggle_notes(cfg, st)
    }
    function fofo(table) {
        // body...
        var btn = document.createElement("div");   // Create a <button> element
btn.innerHTML = table[1];                   // Insert text
// document.body.appendChild(btn);   
                    console.log("RESET NOTES");
                    $('#summernote').summernote("reset");
                    // var obj=$("<div></div>").html(table[1])[0]
                    // console.log(typeof obj);
                    // console.log(obj);
                    // console.log(table[1])
                     // $('#summernote').summernote("reset");
     $("#summernote").summernote("code",table[1])
     stopReload=false;
    }
    var stopReload=false;
    function reload() {
        // body...
            // setTimeout(function(){
                if(stopReload){
                    return;
                }else{
                    stopReload=true;
                }
    var table=html_table_notes();
    console.log(table);
    st.table=table
$('#notes').html(table[0]);
     table[2]();
var table = st.table
if ($.summernote==undefined) {


 
       requirejs(
                [
                    '/nbextensions/notes/summernote-lite.js'
                    //'nbextensions/varInspector/colResizable-1.6.min'
                ],
                function() {
                    // setTimeout(function(){
fofo(table);
                    })

}else{
    fofo(table);
}
 // },5000);
 // })
     // }
        // , 0)
    }
    var stop=false;
    var notes_init = function() {
        if (Jupyter.notebook.metadata.notes==undefined) {
        Jupyter.notebook.metadata.notes={}
    }
    notes_button(); 
 
    
        notes_inspector(cfg,st);
        stop=true

    };


    var create_notes_div = function(cfg, st) {
        function save_position(){
            Jupyter.notebook.metadata.notes.position = {
                'left': $('#notes-wrapper').css('left'),
                'top': $('#notes-wrapper').css('top'),
                'width': $('#notes-wrapper').css('width'),
                'height': $('#notes-wrapper').css('height'),
                'right': $('#notes-wrapper').css('right')
            };
        }
        var notes_wrapper = $('<div id="notes-wrapper"/>')
            .append(
                $('<div id="notes-header"/>')
                .addClass("header")
                .text("notes ")
                .append(
                    $("<a/>")
                    .attr("href", "#")
                    .text("[x]")
                    .addClass("kill-btn")
                    .attr('title', 'Close window')
                    .click(function() {
                        toggleNotes();
                        return false;
                    })
                )
                .append(
                    $("<a/>")
                    .attr("href", "#")
                    .addClass("hide-btn")
                    .attr('title', 'Hide notes')
                    .text("[-]")
                    .click(function() {
                        $('#notes-wrapper').css('position', 'fixed');
                        $('#notes').slideToggle({
                            start: function(event, ui) {
                                // $(this).width($(this).width());
                            },
                            'complete': function() {
                                    Jupyter.notebook.metadata.notes['notes_section_display'] = $('#notes').css('display');
                                    save_position();
                                    Jupyter.notebook.set_dirty();
                            }
                        });
                        $('#notes-wrapper').toggleClass('closed');
                        if ($('#notes-wrapper').hasClass('closed')) {
                            cfg.oldHeight = $('#notes-wrapper').height(); //.css('height');
                            $('#notes-wrapper').css({ height: 40 });
                            $('#notes-wrapper .hide-btn')
                                .text('[+]')
                                .attr('title', 'Show Variable Inspector');
                        } else {
                            $('#notes-wrapper').height(cfg.oldHeight); //css({ height: cfg.oldHeight });
                            $('#notes').height(cfg.oldHeight - $('#notes-header').height() - 30 )
                            $('#notes-wrapper .hide-btn')
                                .text('[-]')
                                .attr('title', 'Hide notes');
                        }
                        return false;
                    })
                ).append(
                    $("<a/>")
                    .attr("href", "#")
                    .text("  \u21BB")
                    .addClass("reload-btn")
                    .attr('title', 'Reload notes')
                    .click(function() {
                        notes_inspector(cfg,st); 
                        // varRefresh();
                        return false;
                    })
                ).append(
                    $("<span/>")
                    .html("&nbsp;&nbsp")
                ).append(
                    $("<span/>")
                    .html("&nbsp;&nbsp;")
                )
            ).append(
                $("<div/>").attr("id", "notes").addClass('notes')
            )

        $("body").append(notes_wrapper);
        // Ensure position is fixed
        $('#notes-wrapper').css('position', 'fixed');

        // enable dragging and save position on stop moving
        $('#notes-wrapper ').draggable({
            handle: '#notes-header',
            drag: function(event, ui) {}, //end of drag function
            start: function(event, ui) {
                $(this).width($(this).width());
            },
            stop: function(event, ui) { // on save, store window position
                    save_position();
                    Jupyter.notebook.set_dirty();
                // Ensure position is fixed (again)
                $('#notes-wrapper').css('position', 'fixed');
            },
        });

        $('#notes-wrapper').resizable({
            handles: 'n, e, s, w',
            resize: function(event, ui) {
                $('#notes').height($('#notes-wrapper').height() - $('#notes-header').height());
            },
            start: function(event, ui) {
                //$(this).width($(this).width());
                $(this).css('position', 'fixed');
            },
            stop: function(event, ui) { // on save, store window position
                    save_position();
                    $('#notes').height($('#notes-wrapper').height() - $('#notes-header').height())
                    Jupyter.notebook.set_dirty();
                // Ensure position is fixed (again)
                //$(this).css('position', 'fixed');
            }
        })

        // restore window position at startup
            if (Jupyter.notebook.metadata.notes.position !== undefined) {
                $('#notes-wrapper').css(Jupyter.notebook.metadata.notes.position);
            }
        // Ensure position is fixed
        $('#notes-wrapper').css('position', 'fixed');

        // Restore window display 
            if (Jupyter.notebook.metadata.notes !== undefined) {
                if (Jupyter.notebook.metadata.notes['notes_section_display'] !== undefined) {
                    $('#notes').css('display', Jupyter.notebook.metadata.notes['notes_section_display'])
                    //$('#varInspector').css('height', $('#varInspector-wrapper').height() - $('#varInspector-header').height())
                    if (Jupyter.notebook.metadata.notes['notes_section_display'] == 'none') {
                        $('#notes-wrapper').addClass('closed');
                        $('#notes-wrapper').css({ height: 40 });
                        $('#notes-wrapper .hide-btn')
                            .text('[+]')
                            .attr('title', 'Show Notes');
                    }
                }
                if (Jupyter.notebook.metadata.notes['window_display'] !== undefined) {
                    console.log(log_prefix + "Restoring Notes window");
                    $('#notes-wrapper').css('display', Jupyter.notebook.metadata.notes['window_display'] ? 'block' : 'none');
                    if ($('#notes-wrapper').hasClass('closed')){
                        $('#notes').height(cfg.oldHeight - $('#notes-header').height())
                    }else{
                        $('#notes').height($('#notes-wrapper').height() - $('#notes-header').height()-30)
                    }
                    
                }
            }
        // if varInspector-wrapper is undefined (first run(?), then hide it)
        if ($('#notes-wrapper').css('display') == undefined) $('#notes-wrapper').css('display', "none") //block

        notes_wrapper.addClass('notes-float-wrapper');
    }

    var notes_inspector = function(cfg, st,reloadOK) {

        var notes_wrapper = $("#notes-wrapper");
        if (notes_wrapper.length === 0) {
            create_notes_div(cfg, st);
        }

        $(window).resize(function() {
            $('#notes').css({ maxHeight: $(window).height() - 30 });
            $('#notes-wrapper').css({ maxHeight: $(window).height() - 10 });
        });

        $(window).trigger('resize');
        // varRefresh();
        if(reloadOK==undefined) {
setTimeout(reload,1000);
        }
    };

    var toggle_notes = function(cfg, st) {
        // toggle draw (first because of first-click behavior)
        $("#notes-wrapper").toggle({
            'progress': function() {},
            'complete': function() {
                    Jupyter.notebook.metadata.notes['window_display'] = $('#notes-wrapper').css('display') == 'block';
                    Jupyter.notebook.set_dirty();
                // recompute:
                if ($("#notes-wrapper").css("display")!="none") {
                    // var table=html_table_notes();
                    // st.table=table
                   setTimeout(notes_inspector,1000,cfg, st);
                }
            }
        });
    };
    var mod_name = "notes";
    var log_prefix = '[' + mod_name + '] ';

    var load_jupyter_extension = function() {
        load_css(); //console.log("Loading css")
        notes_button(); //console.log("Adding varInspector_button")
stop=false
        // If a kernel is available, 
        if (typeof Jupyter.notebook.kernel !== "undefined" && Jupyter.notebook.kernel !== null) {
            console.log(log_prefix + "Kernel is available -- varInspector initializing ")
            // notes_init();

        }
        // if a kernel wasn't available, we still wait for one. Anyway, we will run this for new kernel 
        // (test if is is a Python kernel and initialize)
        // on kernel_ready.Kernel, a new kernel has been started and we shall initialize the extension
        events.on("kernel_ready.Kernel", function(evt, data) {
            console.log(log_prefix + "Kernel is available -- reading configuration");
            if (!stop) {
                requirejs(
                [
                    '/nbextensions/notes/summernote-lite.js'
       //              //'nbextensions/varInspector/colResizable-1.6.min'
                ],
                function() {
            
            setTimeout(notes_init,1000);
        })
        }
        });
    };

    return {
        load_ipython_extension: load_jupyter_extension
     };

});

