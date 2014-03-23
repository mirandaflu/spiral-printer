var spiral = {
    
    'init': function(negative) {
        this.next_direction = (negative)? this.counterclockwise: this.clockwise;
        this.increment = (negative)? -1: 1;
        this.data = {
            '0': {
                '0': '0'
            }
        };
        this.location = {
            'x': this.increment,
            'y': 0
        };
        this.direction = {
            'x': 0,
            'y': 1
        };
    },
    
    'clockwise': function() {
        // cycles [1,0] -> [0,1] -> [-1,0] -> [0,-1]
        var new_x = (this.direction.x !== 0)? 0: -this.direction.y;
        var new_y = (this.direction.y !== 0)? 0: this.direction.x;
        return {'x': new_x, 'y': new_y};
    },
    
    'counterclockwise': function() {
        // cycles [1,0] -> [0,-1] -> [-1,0] -> [0,1]
        var new_x = (this.direction.x !== 0)? 0: this.direction.y;
        var new_y = (this.direction.y !== 0)? 0: -this.direction.x;
        return {'x': new_x, 'y': new_y};
    },
    
    'insert': function(insertee) {
        
        //insert insertee
        if (typeof(this.data[this.location.y]) == 'undefined') this.data[this.location.y] = {};
        this.data[this.location.y][this.location.x] = insertee.toString();
        
        //change direction if the next direction is clear
        if ((typeof(this.data[this.location.y+this.next_direction().y]) == 'undefined') ||
            (typeof(this.data[this.location.y+this.next_direction().y][this.location.x+this.next_direction().x]) == 'undefined'))
            this.direction = this.next_direction();
        
        //update location
        this.location.x += this.direction.x;
        this.location.y += this.direction.y;
        
    },
    
    'create': function(integer) {
        if (isNaN(parseInt(integer)) || parseFloat(integer) != parseInt(integer)) {
            alert('Please enter an integer');
        }
        else {
            this.init(parseInt(integer) < 0);
            this.maxdigits = integer.toString().length;
            for (var i = 0; Math.abs(i-integer) !== 0; i += this.increment) {
                this.insert(i+this.increment);
            }
            this.print();
        }
    },
    
    'test': function() {
        var i = 1;
        this.timer = setInterval(function() { this.create(i); ++i; }.bind(this), 300);
        document.getElementById('testtoggle').innerHTML = 'Stop Printing Test';
        document.getElementById('testtoggle').onclick = function() { spiral.stoptest(); };
    },
    
    'stoptest': function() {
        if (typeof(this.timer) != 'undefined') clearInterval(this.timer);
        document.getElementById('testtoggle').innerHTML = 'Start Printing Test';
        document.getElementById('testtoggle').onclick = function() { spiral.test(); };
    },
    
    'print': function() {
        
        //insert spaces until you hit a corner
        var checkspot = {};
        while (1) {
            checkspot.x = this.location.x + this.next_direction().x;
            checkspot.y = this.location.y + this.next_direction().y;
            if (typeof(this.data[checkspot.y]) == 'undefined') break;
            if (typeof(this.data[checkspot.y][checkspot.x]) == 'undefined') break;
            this.insert(' ');
        }
        
        //print
        var result = '';
        var i = 0, j = 0;
        while (typeof(this.data[i]) != 'undefined') { --i; }
        ++i;
        while (typeof(this.data[i][j]) != 'undefined') { --j; }
        ++j;
        var startj = j;
        while (typeof(this.data[i]) != 'undefined') {
            j = startj;
            while (typeof(this.data[i][j]) != 'undefined') {
                var extraspaces = this.maxdigits - this.data[i][j].toString().length;
                while (extraspaces > 0) {
                    result += ' ';
                    --extraspaces;
                }
                result += this.data[i][j] + ' ';
                ++j;
            }
            result += '\n';
            ++i;
        }
        document.getElementById('spiral').innerHTML = '<pre>'+result+'</pre>';
        
    }
    
};
