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
           "tree",
        ]);        

        wait(rand(0.5, 1.5), criarObstaculos);
    }

    criarObstaculos();

    var vida = 5;
    var HeartCont = 0;

    var vidasLabel = add([
        text(vida),
        pos(5,30),
    ]);

    jogador.onCollide("heart", (coracao) => {
        vida++;
        HeartCont++;
        vidasLabel.text = vida;
        coracao.destroy();
    })

    jogador.onCollide("tree", () => {
        vida--;
        vidasLabel.text = vida;
        if(vida == 0){
            burp();
            shake();
            addKaboom(jogador.pos);
            go("lose", pontos, HeartCont);
        }else{
            burp();
            shake();
            addKaboom(jogador.pos);
        }
        
    })

    var pontos = 0;

    var pontuacao = add([
        text(pontos),
        pos(1, 0),
    ]);

    onUpdate(() => {
        pontos++;
        pontuacao.text = pontos;
    });

});

scene("lose", (pontos, HeartCont) => {
    add([
        sprite("bean"),
        pos(500, 200),
        scale(2),
    ]);

    add([
        text(pontos),
        pos(500, 320),
        scale(2),
    ]);

    add([
        sprite("coracao"),
        pos(700, 200),
        scale(2),
    ]);

    add([
        text(HeartCont),
        pos(730, 320),
        scale(2),
    ]);

    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
})


go("game");