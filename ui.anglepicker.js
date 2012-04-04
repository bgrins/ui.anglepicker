/*
    ui.anglepicker
*/

$.widget("ui.anglepicker", $.ui.mouse, {
    _init: function () {
        this._mouseInit();
    },
    _propagate: function(name, event) {
        this._trigger(name, event, this.ui());
    },
    _create: function() {
        this.pointer = $('<div class="ui-anglepicker-pointer"></div>');
        this.pointer.append('<div class="ui-anglepicker-dot"></div>');
        this.pointer.append('<div class="ui-anglepicker-line"></div>');
        
        this.element.addClass("ui-anglepicker");
        this.element.append(this.pointer);
        
        this.setDegrees(this.options.degrees);
    },
    destroy: function () {
        this._mouseDestroy();
        
        this.element.removeClass("ui-anglepicker");
        this.pointer.remove();
    },
    _mouseStart: function (event) {
        var myOffset = this.element.offset();
        this.width = this.element.width();
        this.height = this.element.height();
        
        this.startOffset = { 
            x: myOffset.left+(this.width/2), 
            y: myOffset.top+(this.height/2) 
        };
        
        this.setDegreesFromEvent(event);
        this._propagate("start", event);
    },
    _mouseStop: function (event) {
        this._propagate("stop", event);
    },
    _mouseDrag: function (event) {
        this.setDegreesFromEvent(event);
        this._propagate("change", event);
    },
    ui: function() {
        return {
            element: this.element,
            degrees: this.degrees
        };
    },
    drawRotation: function() {
        var rotation = 'rotate('+-this.degrees+'deg)';
        this.pointer.css({
            '-webkit-transform': rotation,
            '-moz-transform': rotation,
            '-ms-transform': rotation,
            'transform': rotation
        });
    },
    setDegrees: function(degrees) {
        this.degrees = degrees;
        this.drawRotation();
    },
    setDegreesFromEvent: function(event) {
        var opposite = this.startOffset.y - event.pageY,
            adjacent = event.pageX - this.startOffset.x,
            radiants = Math.atan(opposite/adjacent),
            degrees = Math.round(radiants*(180/Math.PI), 10);
        
        if(event.shiftKey) {
            degrees = this.roundToMultiple(degrees, 15);
        }
        
        if(adjacent < 0 && opposite >= 0) {
            degrees+= 180;
        }
        else if (opposite < 0 && adjacent < 0) {
            degrees-= 180;
        }
        
        if(degrees === -180) {
            degrees = 180;
        }
        
        this.setDegrees(degrees);
    },
    roundToMultiple: function(number, multiple) {
        var value = number/multiple,
            integer = Math.floor(value),
            rest = value - integer;
            
        return rest > 0.5 ? (integer+1)*multiple : integer*multiple;
    },
    options: {
        distance: 1,
        delay: 1,
        degrees: 90
    }
});

