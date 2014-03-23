var spiral = {
    
    'init': function() {
        this.data = {
            '0': {
                '0': '0'
            }
        };
        this.location = {
            'x': 1,
            'y': 0
        };
        this.direction = {
            'x': 0,
            'y': 1
        };
    },
    
    'next_direction': function() {
        // cycles [1,0] -> [0,1] -> [-1,0] -> [0,-1]
        var new_x = (this.direction.x !== 0)? 0: (this.direction.y > 0)? -1: 1;
        var new_y = (this.direction.y !== 0)? 0: (this.direction.x < 0)? -1: 1;
        return {'x': new_x, 'y': new_y};
    },
    
    'insert': function(insertee) {
        
        //insert insertee
        if (typeof(this.data[this.location.y]) == 'undefined') this.data[this.location.y] = {};
        this.data[this.location.y][this.location.x] = insertee.toString();
        
        //change direction if the next direction is clear
        if ((typeof(this.data[this.location.y+this.next_direction().y]) == 'undefined') || (typeof(this.data[this.location.y+this.next_direction().y][this.location.x+this.next_direction().x]) == 'undefined'))
            this.direction = this.next_direction();
        
        //update location
        this.location.x += this.direction.x;
        this.location.y += this.direction.y;
        
    },
    
    'create': function(integer) {
        this.init();
        this.maxdigits = integer.toString().length;
        for (var i = 1; i <= integer; ++i) {
            this.insert(i);
        }
        this.print();
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

