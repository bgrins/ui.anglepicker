# UI Anglepicker

A jQuery UI widget for selecting angles.

JavaScript and CSS is based on [LayerStyles](https://github.com/mrflix/LayerStyles)

    $("#element").anglepicker({
        start: function(e, ui) {

        },
        change: function(e, ui) {
            $("#label").text(ui.value)
        },
        stop: function(e, ui) {

        },
        value: 90
    });

    $("#element").anglepicker("value", 50);
