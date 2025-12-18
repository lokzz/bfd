function enemy_logic(enemy: Sprite, player2: Sprite) {
    placement = [randint(0 - sRange_x[0], 0 - sRange_x[1]) + scene.cameraProperty(CameraProperty.X), randint(0 - sRange_y[0], 0 - sRange_y[1]) + scene.cameraProperty(CameraProperty.Y)]
}

function give_pos() {
    range_x = [-3 * 16, 3 * 16]
    range_y = [-16, 3 * 16]
    loc_x = randint(0 - range_x[0], 0 - range_x[1]) + scene.cameraProperty(CameraProperty.X)
    loc_y = randint(0 - range_y[0], 0 - range_y[1]) + scene.cameraProperty(CameraProperty.Y)
    return { "x": loc_x, "y": loc_y }
}

console.log(give_pos()["x"])

let loc_y = 0
let range_y: number[] = []
let loc_x = 0
let range_x: number[] = []
let placement: number[] = []
let sRange_y: number[] = []
let sRange_x: number[] = []
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

let imagagag: Image[] = [
    img`.`,
    img`
        2 2 2 2
        2 2 2 2
        2 2 2 2
        2 2 2 2
    `
]

game.stats = true
// game.consoleOverlay.setVisible(true)
enemy4.x = 0
enemy4.y = 0
enemy4.setFlag(SpriteFlag.GhostThroughWalls, true)
mySprite2.setStayInScreen(true)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`level`)
// controller.moveSprite(mySprite, 200, 200)
mySprite.y = 24 * 16
mySprite.vy = -25
controller.moveSprite(mySprite2, 40, 40)
sRange_x = [-3 * 16, 3 * 16]
sRange_y = [-16, 3 * 16]

let enemies: [Sprite, Sprite][] = []
let tick = 0

game.onUpdate(function () {
    // console.log(mySprite.tilemapLocation().x)
    tick += 1
    if (tick % 250 == 0) {
        let nloc = give_pos()

        let newTarget = sprites.create(imagagag[0], SpriteKind.Food)
        newTarget.x = nloc["x"]
        newTarget.y = nloc["y"]

        let newEnemy = sprites.create(imagagag[1], SpriteKind.Enemy)
        let v = scene.cameraProperty(CameraProperty.X)
        newEnemy.x = randint(0, 1) == 1 ? v - (16 * 5) : v + (16 * 5)
        newEnemy.y = scene.cameraProperty(CameraProperty.Y) + randint(0 - sRange_y[0], 0 - sRange_y[1])
        newEnemy.setFlag(SpriteFlag.GhostThroughWalls, true)

        newEnemy.follow(newTarget, 18)
        controller.moveSprite(newEnemy, 40, 40)
        enemies.push([newEnemy, newTarget])
    }
    enemies.forEach(function (i, idx) {
        if (i[1] && i[0].x == i[1].x && i[0].y == i[1].y) {
            i[1].destroy()
        }
        // if (enemy4.tilemapLocation().x / 16 < 2 || enemy4.tilemapLocation().x / 16 > 8) {
        //     enemy4.vx = enemy4.tilemapLocation().x < 5 ? -16 : 16
        //     enemy4.vy = 5
        // } else if (spriteutils.distanceBetween(mySprite2, enemy4) > 4 * 16) {
        //     enemy4.follow(mySprite2, 16)
        // } else {
        //     enemy4.follow(null)
        // }
    })
    if (mySprite2.isHittingTile(CollisionDirection.Top)) {
        mySprite.vy = 0
    } else {
        mySprite.vy = -25
    }
})
