
var jq_scale_zoom = 80;
$.ui.ddmanager.prepareOffsets = function( t, event ) {
    var i, j,
        m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
        type = event ? event.type : null, // workaround for #2317
        list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

    droppablesLoop: for ( i = 0; i < m.length; i++ ) {

        // No disabled and non-accepted
        if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
            continue;
        }

        // Filter out elements in the current dragged item
        for ( j = 0; j < list.length; j++ ) {
            if ( list[ j ] === m[ i ].element[ 0 ] ) {
                m[ i ].proportions().height = 0;
                continue droppablesLoop;
            }
        }

        m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
        if ( !m[ i ].visible ) {
            continue;
        }

        // Activate the droppable if used directly from draggables
        if ( type === "mousedown" ) {
            m[ i ]._activate.call( m[ i ], event );
        }
        console.log(jq_scale_zoom);
        m[ i ].offset = m[ i ].element.offset();
        m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth * jq_scale_zoom, height: m[ i ].element[ 0 ].offsetHeight * jq_scale_zoom });
    }

};

(function ($, window) {

    var intervals = {};
    var removeListener = function(selector) {
    
        if (intervals[selector]) {
            
            window.clearInterval(intervals[selector]);
            intervals[selector] = null;
        }
    };
    var found = 'waitUntilExists.found';
    
    /**
     * @function
     * @property {object} jQuery plugin which runs handler function once specified
     *           element is inserted into the DOM
     * @param {function|string} handler 
     *            A function to execute at the time when the element is inserted or 
     *            string "remove" to remove the listener from the given selector
     * @param {bool} shouldRunHandlerOnce 
     *            Optional: if true, handler is unbound after its first invocation
     * @example jQuery(selector).waitUntilExists(function);
     */
     
    $.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {
       
        var selector = this.selector;
        var $this = $(selector);
        var $elements = $this.not(function() { return $(this).data(found); });
        
        if (handler === 'remove') {
            
            // Hijack and remove interval immediately if the code requests
            removeListener(selector);
        }
        else {
    
            // Run the handler on all found elements and mark as found
            $elements.each(handler).data(found, true);
            
            if (shouldRunHandlerOnce && $this.length) {
                
                // Element was found, implying the handler already ran for all 
                // matched elements
                removeListener(selector);
            }
            else if (!isChild) {
                
                // If this is a recurring search or if the target has not yet been 
                // found, create an interval to continue searching for the target
                intervals[selector] = window.setInterval(function () {
                    
                    $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
                }, 500);
            }
        }
        
        return $this;
    };
     
    }(jQuery, window));