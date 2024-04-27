import kaboom from "kaboom"

kaboom()

var largura = 48;

loadSprite("bean", "sprites/bean.png");
loadSprite("coracao", "sprites/coracao.png");

setGravity(1600)

scene("game", () => {
    const jogador = add([
        sprite("bean"),
        pos(50, 40),
        body(),
        area(),
        scale(1),
    ]);

    add([
        rect(width(), largura),       
        pos(0, height()),
        area(),
        body({isStatic: true}),
        anchor("botleft"),
        outline(4),
        color(0, 8, 255),
    ]);

    function pular(){
        if(jogador.isGrounded()){
            jogador.jump(800);
        }
    }

    onKeyPress("space", pular);
    onClick(pular);

    loop(5, () => {
       var coracao =  add([
            sprite("coracao"),
            pos(width(), 350),
            move(LEFT, 480),
            body({isStatic: true}),
            area(),
            "heart",
        ]);
    })

    function criarObstaculos(){
        add([
           rect(48, rand(96, 32)),
           area(),
           color(0, 198, 0),
           anchor("botleft"),
           pos(width(), height() - 48),
           move(LEFT, 400),
           outline(4),
        ]);        

        wait(rand(0.5, 1.5), criarObstaculos);
    }

    criarObstaculos();

})


go("game");