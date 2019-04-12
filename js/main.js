let data = {
    mapsData: [],
    squre: [
        [{x:4,y:0},{x:5,y:0},{x:4,y:1},{x:5,y:1}],
        [{x:4,y:0},{x:3,y:1},{x:4,y:1},{x:5,y:1}],
        [{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:3,y:1}],
        [{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:5,y:1}],
        [{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0}],
        [{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:5,y:1}],
        [{x:4,y:0},{x:5,y:0},{x:3,y:1},{x:4,y:1}],
    ],
    colorArr: ["#56452d", "#bb505d", "#f26522", "#7fb80e", "#afb4db", "#1a2933", "#4e72b8"],
    speed: 500,
    timer: null,
    n: 0,
    newSqure: [{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:5,y:1}],
    falldSqure: [],
    stats: 0,

    init: function() {
        this.createMap()
        this.createSqure()
    },

    createMap: function() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 15; j++) {
                this.mapsData.push({x: i, y: j})
            }
        }
    },

    //随机数公式
    getRandom: function(min, max){
        return parseInt(Math.random()*(max-min+1)+min,10);
    },
    //渲染落下的样式
    renderFalled: function(){
        
        for (let i = 0; i < this.newSqure.length; i++) {
            this.falldSqure.push(this.newSqure[i])  
        }
        let str = ""
        for (let i = 0; i < this.falldSqure.length; i++) {
            str += `<div class="squreFalled"
            style="top:${this.falldSqure[i].y*30}px; left:${this.falldSqure[i].x*30}px"></div>`
        }
        
        $("#squreFalled").html(str)
    },
    //渲染样式
    renderSqure: function(){
        this.newSqure = this.squre[this.n]
        let str = ""
        for (let i = 0; i < this.newSqure.length; i++) {
            str += `<div class="squre"
            style="background:${this.colorArr[this.n]};
            top:${this.newSqure[i].y*30}px; left:${this.newSqure[i].x*30}px"></div>`
        }
        
        $("#sqCon").html(str)
    },
    //生成新的方块
    createSqure: function(){
        this.n = this.getRandom(0, this.squre.length-1)
        console.log(this.n)
        this.renderSqure()
        this.fall()
        this.change()
    },
    
    // 变换
    change: function(){
        let _this = this
        $(document).off("keydown").on("keydown", function(event){
            if (event.keyCode == 38) {
                if (_this.n == 5 && _this.stats == 0) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[1].y += 1
                    _this.newSqure[2].x -= 1
                    _this.newSqure[3].x -= 2
                    _this.newSqure[3].y += 1
                    _this.stats = 1
                    _this.renderSqure()

                } else if (_this.n == 5 && _this.stats == 1) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[1].y -= 1
                    _this.newSqure[2].x += 1
                    _this.newSqure[3].x += 2
                    _this.newSqure[3].y -= 1
                    _this.stats = 0
                    _this.renderSqure()

                } else if (_this.n == 1 && _this.stats == 0) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[1].x += 1
                    _this.newSqure[1].y -= 1
                    _this.newSqure[3].x -= 1
                    _this.newSqure[3].y += 1
                    _this.stats = 1
                    _this.renderSqure()

                } else if (_this.n == 1 && _this.stats == 1) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[1].x += 1
                    _this.newSqure[1].y += 1
                    _this.newSqure[3].x -= 1
                    _this.newSqure[3].y -= 1
                    _this.stats = 2
                    _this.renderSqure()

                } else if (_this.n == 1 && _this.stats == 2) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[1].x -= 1
                    _this.newSqure[1].y += 1
                    _this.newSqure[3].x += 1
                    _this.newSqure[3].y -= 1
                    _this.stats = 3
                    _this.renderSqure()

                } else if (_this.n == 1 && _this.stats == 3) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[1].x -= 1
                    _this.newSqure[1].y -= 1
                    _this.newSqure[3].x += 1
                    _this.newSqure[3].y += 1
                    _this.stats = 0
                    _this.renderSqure()

                } else if (_this.n == 2 && _this.stats == 0) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[2].x -= 1
                    _this.newSqure[2].y += 1
                    _this.newSqure[3].y -= 2
                    _this.stats = 1
                    _this.renderSqure()

                } else if (_this.n == 2 && _this.stats == 1) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[2].x -= 1
                    _this.newSqure[2].y -= 1
                    _this.newSqure[3].x += 2
                    _this.stats = 2
                    _this.renderSqure()

                } else if (_this.n == 2 && _this.stats == 2) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[2].x += 1
                    _this.newSqure[2].y -= 1
                    _this.newSqure[3].y += 2
                    _this.stats = 3
                    _this.renderSqure()

                } else if (_this.n == 2 && _this.stats == 3) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[2].x += 1
                    _this.newSqure[2].y += 1
                    _this.newSqure[3].x -= 2
                    _this.stats = 0
                    _this.renderSqure()

                } else if (_this.n == 3 && _this.stats == 0) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[2].x -= 1
                    _this.newSqure[2].y += 1
                    _this.newSqure[3].x -= 2
                    _this.stats = 1
                    _this.renderSqure()

                } else if (_this.n == 3 && _this.stats == 1) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[2].x -= 1
                    _this.newSqure[2].y -= 1
                    _this.newSqure[3].y -= 2
                    _this.stats = 2
                    _this.renderSqure()

                } else if (_this.n == 3 && _this.stats == 2) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[2].x += 1
                    _this.newSqure[2].y -= 1
                    _this.newSqure[3].x += 2
                    _this.stats = 3
                    _this.renderSqure()

                } else if (_this.n == 3 && _this.stats == 3) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[2].x += 1
                    _this.newSqure[2].y += 1
                    _this.newSqure[3].y += 2
                    _this.stats = 0
                    _this.renderSqure()

                } else if (_this.n == 4 && _this.stats == 0) {
                    _this.newSqure[0].x += 1
                    _this.newSqure[0].y -= 1
                    _this.newSqure[2].x -= 1
                    _this.newSqure[2].y += 1
                    _this.newSqure[3].x -= 2
                    _this.newSqure[3].y += 2
                    _this.stats = 1
                    _this.renderSqure()

                } else if (_this.n == 4 && _this.stats == 1) {
                    _this.newSqure[0].x -= 1
                    _this.newSqure[0].y += 1
                    _this.newSqure[2].x += 1
                    _this.newSqure[2].y -= 1
                    _this.newSqure[3].x += 2
                    _this.newSqure[3].y -= 2
                    _this.stats = 0
                    _this.renderSqure()

                } else if (_this.n == 6 && _this.stats == 0) {
                    _this.newSqure[1].x -= 1
                    _this.newSqure[1].y -= 1
                    _this.newSqure[2].x += 2
                    _this.newSqure[3].x += 1
                    _this.newSqure[3].y -= 1
                    _this.stats = 1
                    _this.renderSqure()

                } else if (_this.n == 6 && _this.stats == 1) {
                    _this.newSqure[1].x += 1
                    _this.newSqure[1].y += 1
                    _this.newSqure[2].x -= 2
                    _this.newSqure[3].x -= 1
                    _this.newSqure[3].y += 1
                    _this.stats = 0
                    _this.renderSqure()
                }
            } else if (event.keyCode == 37) {
                for (let i = 0; i < 4; i++) {
                    _this.newSqure[i].x -= 1
                }
                _this.renderSqure()
            } else if (event.keyCode == 39) {
                for (let i = 0; i < 4; i++) {
                    _this.newSqure[i].x += 1
                }
                _this.renderSqure()
            }
                    
        })
    },
    //自由下落
    fall: function(){
        let squreCon = $(".squre")
        let _this = this
        this.timer = setInterval(function(){
            if (_this.newSqure[3].y >= 13) {
                clearInterval(_this.timer)
                _this.renderFalled()
                _this.createSqure()
                _this.stats = 0
            } else {
                for (let i = 0; i < squreCon.length; i++) {
                    _this.newSqure[i].y += 1
                    _this.renderSqure()
                }
                
            }
        }, this.speed)
    }
}

data.init()