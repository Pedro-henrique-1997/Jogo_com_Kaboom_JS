import kaboom from "kaboom"

kaboom()

loadSprite("bean", "sprites/bean.png");

scene("game", () => {
    const jogador = add([
        sprite("bean"),
        pos(50, 40),
        body(),
        area(),
    ]);

})


go("game");