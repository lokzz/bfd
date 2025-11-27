let mySprite = sprites.create(img`
    3 3 
    3 3 
    `, SpriteKind.Player)
let mySprite2 = sprites.create(img`
    4 4 4 4 
    4 4 4 4 
    4 4 4 4 
    4 4 4 4 
    `, SpriteKind.Player)
let enemy4 = sprites.create(img`
    2 2 2 2 
    2 2 2 2 
    2 2 2 2 
    2 2 2 2 
    `, SpriteKind.Enemy)
game.stats=true
// game.consoleOverlay.setVisible(true)
enemy4.x = 0
enemy4.y = 0
enemy4.setFlag(SpriteFlag.GhostThroughWalls, true)
mySprite2.setStayInScreen(true)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`level`)
controller.moveSprite(mySprite, 200, 200)
function enemy_logic(enemy: Sprite, player: Sprite) {

}
game.onUpdate(function () {
    // console.log(mySprite.tilemapLocation().x)
    let range_x = [-3*16, 3*16]
    let loc_x = randint(-range_x[0], -range_x[1]) + scene.cameraProperty(CameraProperty.X)
    let range_y = [-16, 3*16]
    let loc_y = randint(-range_y[0], -range_y[1]) + scene.cameraProperty(CameraProperty.Y)
    enemy4.x = loc_x
    enemy4.y = loc_y

    
    return
    if (enemy4.tilemapLocation().x / 16 < 2 || enemy4.tilemapLocation().x / 16 > 8) {
        enemy4.vx = enemy4.tilemapLocation().x < 5 ? -16 : 16
        enemy4.vy = 5
    } else if (spriteutils.distanceBetween(mySprite2, enemy4) > 6) {
        enemy4.follow(mySprite2, 16)
    } else {
        enemy4.follow(null)
    }
})
