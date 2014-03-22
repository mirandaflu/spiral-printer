var spiral = {
    
    'init': function() {
        this.data = {
            '0': {
                '0': '0'
            }
        };
        this.nav.location = {
            'x': 1,
            'y': 0
        };
        this.nav.direction.x = 0;
        this.nav.direction.y = 1;
    },
    
    'nav': {
        'direction': {
            'x': 0,
            'y': 1
        },
        'next_direction': function(old_x, old_y) {
            // cycles [1,0] -> [0,1] -> [-1,0] -> [0,-1]
            var new_x = (this.direction.x !== 0)? 0: (this.direction.y > 0)? -1: 1;
            var new_y = (this.direction.y !== 0)? 0: (this.direction.x < 0)? -1: 1;
            return {'x': new_x, 'y': new_y};
        },
        'location': {
            'x': 1,
            'y': 0
        }
    },
    
    'insert': function(insertee) {
        
        //insert insertee
        if (typeof(this.data[this.nav.location.y]) == 'undefined') this.data[this.nav.location.y] = {};
        this.data[this.nav.location.y][this.nav.location.x] = insertee.toString();
        
        //console.log('inserted',insertee.toString(),'at',this.nav.location.x, this.nav.location.y);
        
        //change direction if the next direction is clear
        var nextdir = this.nav.next_direction(this.nav.direction.x, this.nav.direction.y);
        if ((typeof(this.data[this.nav.location.y+nextdir.y]) == 'undefined') || (typeof(this.data[this.nav.location.y+nextdir.y][this.nav.location.x+nextdir.x]) == 'undefined')) {
            //console.log('changing direction');
            //console.log(this.nav.direction.x, this.nav.direction.y, ' to ', nextdir.x, nextdir.y);
            this.nav.direction.x = nextdir.x;
            this.nav.direction.y = nextdir.y;
        }
        
        //update location
        this.nav.location.x += this.nav.direction.x;
        this.nav.location.y += this.nav.direction.y;
        
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
        
        //store direction
        var dir = {'x': this.nav.direction.x, 'y': this.nav.direction.y};
        
        //insert spaces until direction changes
        while (this.nav.direction.x == dir.x && this.nav.direction.y == dir.y)
            this.insert(' ');
        
        //take out last space
        delete this.data[this.nav.location.y][this.nav.location.x];
        
        //print
        var result = '';
        var i = 0;
        while (typeof(this.data[i]) != 'undefined') { --i; }
        ++i;
        var j = 0;
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

