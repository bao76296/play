$(function(){
			
			
    class Game{
        constructor(type){
            switch (type){
                case 0 : {
                    enemy.health = 4;
                    break;
                }
                case 1 : {
                    enemy.health = 3;
                    break;
                }
                case 2 :{
                    enemy.health = 2;
                    break;
                }
                case 3 : {
                    enemy.health = 1;
                    console.log(type);
                }
            }
            this.load();
        }
        
        load(){
            console.log(1);
            $('#menu').hide();
            $('#loading').show();
            let conunt = 2;
            let sum = 1;
            this.loadTimer = setInterval(function(){
                sum++;
                $('#loading').css("background","url(img/loading"+ conunt +".png)")
                conunt = conunt == 3 ? 1 : ++conunt;
                if(sum >= 7){
                    clearInterval(this.loadTimer);
                    $('#loading').hide();
                    $('#logo').hide();
                    $('#score').show();
                    this.backMove();
                    this.start();
                }
            }.bind(this),1000)
        }
        backMove(){
            let x = 0;
            this.backMoveTimer = setInterval(function(){
                $('#back').css("background-position-y",(x+=2))
            },30);
        }
        start(){
            this.play = new Player();
            this.play.playerMove();
            this.prEnemy1 = setInterval(function(){
                let e = new enemy("A")
                
                enemy.arr.add(e);
            },10000)
            
            this.prEnemy2 = setInterval(function(){
                let e = new enemy("B")	
                ;
                enemy.arr.add(e);
            },4000)
            
            this.prEnemy3 = setInterval(function(){
                let e = new enemy("C")	
                enemy.arr.add(e);
                
            },1500)
            
        }
        over(){
            clearInterval(this.prEnemy1);
            clearInterval(this.prEnemy2);
            clearInterval(this.prEnemy3);
            clearInterval(this.backMoveTimer);
            clearInterval(this.crashTimer);
        }
    }
    Game.score = 0;
    
    
    class enemy{
        constructor(type){
            this.$en = $('<div>');
            this.$en.appendTo($('#back'));
            this.$en.addClass("enemy");
            this.type= type;
            switch(type){
                case "A" : {
                //	console.log('A');
                    this.score = 5000;
                    this.speed = 1;
                    this.hp = enemy.health*3;
                    this.$en.width(165);
                    this.$en.height(256);
                    this.$en.css({
                        background : "url(img/plain3.png)",
                        left : getRandom(0,$('#back').width()-164),
                        top : -256
                    })
                    this.die = function(){
                        let x = 1;
                        this.deiTimer =setInterval(function(){
                            this.$en.css({
                                background : "url(img/plain3_die"+ x++ +".png)"
                            })
                            if(x >= 8){
                                clearInterval(this.deiTimer);
                                this.over();
                            }
                        }.bind(this),100)
                    }
                    break;
                }
                case "B" : {
                //	console.log("B");
                    this.score = 1000;
                    this.speed = 3;
                    this.hp = enemy.health*2;
                    this.$en.width(70);
                    this.$en.height(92);
                    this.$en.css({
                        background : "url(img/plain2.png)",
                        left : getRandom(0,$('#back').width()-69),
                        top : -92
                    })
                    this.die = function(){
                        let x = 1;
                        this.deiTimer =setInterval(function(){
                            this.$en.css({
                                background : "url(img/plain2_die"+ x++ +".png)"
                            })
                            if(x >= 6){
                                clearInterval(this.deiTimer);
                                this.over();
                            }
                        }.bind(this),100)
                    }
                    break;
                }
                case "C" : {
                //	console.log("C");
                    this.score = 100;
                    this.speed = 5;
                    this.hp = 1;
                    this.$en.width(59);
                    this.$en.height(36);
                    this.$en.css({
                        background : "url(img/plane1.png)",
                        left : getRandom(0,$('#back').width()-58),
                        top : -36
                    })
                    this.die = function(){
                        let x = 1;
                        this.deiTimer =setInterval(function(){
                            this.$en.css({
                                background : "url(img/plain1_die"+ x++ +".png)"
                            })
                            if(x >= 5){
                                clearInterval(this.deiTimer);
                                this.over();
                            }
                        }.bind(this),100)
                    }
                }
            }
            this.enFlyTimer = setInterval(function(){
                this.$en.css({
                    top : this.$en.position().top + this.speed
                })
                if(this.$en.position().top >= $('#back').height()){
                    this.over();
                }
            }.bind(this),30)
        }
        over(){
            clearInterval(this.enFlyTimer);
            this.$en.remove();
        }
    }
    enemy.arr = new Set();
    class Player{
        constructor(){
            Player.HP = 1;
            this.ammo = 1;
            this.$player = $('<div>');
            this.$player.addClass('player');
            this.$player.css("background","url(img/me.png)");
            this.$player.css({
                top:$('#back').height() - 122,
                left : $('#back').width()/2-40
            })
            this.$player.appendTo($('#back'))
        }
        playerMove(){
            $(document).mousemove(function(e){
                this.$player.css({
                    top :  Math.max(Math.min( e.pageY - this.$player.outerHeight()/2,$('#back').outerHeight()-this.$player.outerHeight()),0) ,
                    left : Math.max(0,Math.min(e.pageX - $('#back').offset().left - this.$player.outerWidth()/2, $('#back').outerWidth()-this.$player.outerWidth()))   
                })

                for(var en of enemy.arr){
                    if(((this.$player.position().top <=en.$en.position().top + en.$en.height()  && this.$player.position().top >= en.$en.position().top)|| 
                    (this.$player.position().top <= en.$en.position().top && this.$player.position().top + this.$player.height() >= en.$en.position().top + en.$en.height()) ||
                    (this.$player.position().top + this.$player.height()  >= en.$en.position().top && this.$player.position().top + this.$player.height()  <= en.$en.position().top + en.$en.height()))
                    && ((this.$player.position().left <= en.$en.position().left+en.$en.width() && this.$player.position().left >= en.$en.left) ||
                       (this.$player.position().left + this.$player.width() >= en.$en.position().left && this.$player.position().left + this.$player.width() <= en.$en.position().left + en.$en.width()) ||
                        (this.$player.position().left <= en.$en.position().left && this.$player.position().left +this.$player.width() >= en.$en.position().left+en.$en.width() )
                    )){
                               this.die();
                               en.die();
                               setTimeout(function(){
                                   alert("您的得分为："+$('#score').find('span').text());
                                   location.reload();
                               },300)
                               
                       }
                }
            }.bind(this))
            this.fire()
        }
        fire(){
            this.fireTimer = setInterval(function(){
                let $ammo = $('<div>');
                $ammo.addClass('ammo');
                $ammo.css({
                    top : this.$player.position().top - 20,
                    left : this.$player.position().left + this.$player.outerWidth()/2 -2
                })
                $ammo.appendTo($('#back'));
                let ammoTimer = setInterval(function(){
                    $ammo.css({
                        top : $ammo.position().top - 5
                    })
                    if($ammo.position().top <= 0 || $ammo.position().left <= 0 || $ammo.position().left >= $('#back').outerWidth()){
                        $ammo.remove();
                        clearInterval(ammoTimer);
                        if(Player.bullet.has($ammo)){
                            Player.bullet.delete($ammo);
                        }
                    }
                    for(var en of enemy.arr){
                        if(($ammo.position().top <=en.$en.position().top + en.$en.height()  && $ammo.position().top >= en.$en.position().top) && (($ammo.position().left <= en.$en.position().left+en.$en.width() && $ammo.position().left >= en.$en.left) || 
                           ($ammo.position().left >= en.$en.position().left && $ammo.position().left <= en.$en.position().left + en.$en.width())  )){
                                   en.hp--;
                                   if(en.hp == 0){
                                       $ammo.css({
                                           background: "url(img/die2.png)",
                                           width:40,
                                           height:43,
                                           opacity:0.5
                                       }).animate({
                                           opacity:1
                                    },200,function(){
                                        $ammo.remove();
                                    })
                                    if(enemy.arr.has(en)){
                                        Game.score += en.score;
                                        $('#score').find('span').text(Game.score);
                                           en.die();
                                           enemy.arr.delete(en)
                                       }
                                   }else{
                                       $ammo.css({
                                           background: "url(img/die1.png)",
                                           width:41,
                                           height:39,
                                           opacity:0.5
                                       }).animate({
                                           opacity:1
                                    },200,function(){
                                        $ammo.remove();
                                    })
                                   }
                                clearInterval(ammoTimer);
                                if(Player.bullet.has($ammo)){
                                    Player.bullet.delete($ammo);
                                }
                           }
                    }
                },30)
                Player.bullet.add($ammo);
            }.bind(this),200)
        }
        die (){
            $(document).unbind('mousemove');
            let temp = 1;
            this.deiTimer =setInterval(function(){
                this.$player.css({
                    background : "url(img/me_die"+ temp++ +".png)"
                })
                
                if(temp >= 5){
                    console.log(temp)
                    clearInterval(this.deiTimer);
                    this.$player.remove();
                    this.over();
                }
            }.bind(this),100)
        }
        over(){
            clearInterval(this.fireTimer);
        }
    }
    Player.bullet = new Set();
    
    
    
    
    
    $('ul').on('click','li',function(e){
        var a = new Game($(this).index())
    })
})