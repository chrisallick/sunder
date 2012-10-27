var audio, rain;
var CanvasTextEditor, Document, doc, editor;
$(document).ready(function() {
    var img = new Image();
    img.onload = function(event) {
        this.width = $(document).width();
        $("#bg").append(this);
        
        audio = new Audio();
        rain = new Audio();

        audio.setAttribute("src","jams/coolbeans.mp3");
        rain.setAttribute("src","jams/rain.mp3");

        audio.addEventListener("canplaythrough",letsDoThis,false);
        rain.addEventListener("canplaythrough",letsDoThis,false);

        audio.load();
        rain.load();
    }
    img.src = "img/hugebg.jpeg";

    CanvasTextEditor = require('CanvasTextEditor'),
        Document = require('Document'),
        doc = new Document(),
        editor = new CanvasTextEditor(doc);
    document.body.appendChild(editor.getEl());
    editor.focus();
    $(".canvas-text-editor").css({
        left: $(document).width()/2-$(".canvas-text-editor").width()/2,
        top: $(document).height()/2-$(".canvas-text-editor").height()/2
    }).append("<div id='gotime'>enter fullscreen</div>");

    document.addEventListener("webkitfullscreenchange", function () {
        if( !document.webkitIsFullScreen ) {
            $(this).removeClass("cool").html("enter fullscreen");
            audio.pause();
            rain.pause();            
        }
    }, false);

    $("#gotime").click(function(event){
        if( $(this).hasClass("cool") ) {
            document.webkitCancelFullScreen();
            $(this).removeClass("cool").html("enter fullscreen");
            audio.pause();
            rain.pause();
        } else {
            $(this).addClass("cool").html("exit fullscreen");
            document.body.webkitRequestFullScreen($(".canvas-text-editor")[0].ALLOW_KEYBOARD_INPUT);

            audio.play();
            audio.volume = 1;
            rain.play();
            rain.volume = .6;
        }
    });

    var a = document.createElement("a");
    a.innerHTML = "export";
    a.href = "#";
    $(".canvas-text-editor").append( a );
    $(".canvas-text-editor").append( "<p>(drag and drop to load)</p>" );
    $(a).click(function(event) {
        event.preventDefault();
        var bb = new BlobBuilder;
        for(var i = 0, len = editor._document.storage.length; i < len; i++ ) {
            bb.append(editor._document.storage[i]+"\n");
        }
        saveAs(bb.getBlob("text/plain;charset=utf-8"), "text.txt");
    });


    $(document).bind('drop',function(event) {
        event.preventDefault();
        var file = event.originalEvent.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var lines = event.target.result.split(/\r\n|\r|\n/);
            for( var i = 0, len = lines.length; i < len; i++ ) {
                editor._document.storage[i] = lines[i];
            }
        };
        reader.readAsText(file);
    });
});

letsDoThis = function(event) {
    
}