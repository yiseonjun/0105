scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight0, function (sprite, location) {
    checkPoint = 1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.playTone(392, music.beat(BeatFraction.Eighth))
    direction += 1
    direction = direction % 4
    방향()
})
function 방향 () {
    mySprite.setImage(cars[direction])
    mySprite.ax = accel * dx[direction]
    mySprite.ay = accel * dy[direction]
}
function 시간 () {
    scene.createRenderable(0, function (target: Image, camera: scene.Camera) {
    const s = "Time " + formatTime(lapTime)+"  Best "+formatTime(bestTime)
    const font = image.font8
    const width = font.charWidth * s.length;
    const left = (screen.width >> 1) - (width >> 1) + 1;
    screen.fillRect(left, 0, width, font.charHeight, 0);
    screen.print(s, left, 0, 3, font);
})
function formatTime(t:number) {
    if (t==0) {
        return "--.--"
    }
    const seconds = Math.idiv(t, 1000)
    const remainder = Math.idiv(t % 1000, 10)
    return formatDecimal(seconds) + "." + formatDecimal(remainder)
}
function formatDecimal(val: number) {
    val |= 0;
    if (val < 10) {
        return "0" + val;
    }
    return val.toString();
}
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorMixed, function (sprite, location) {
    if (checkPoint == 1) {
        checkPoint = 0
        startTime = game.runtime()
        if (bestTime == 0 || lapTime < bestTime) {
            bestTime = lapTime
            music.powerUp.play()
        }
    }
})
let startTime = 0
let checkPoint = 0
let cars: Image[] = []
let dy: number[] = []
let dx: number[] = []
let direction = 0
let accel = 0
let mySprite: Sprite = null
scene.setBackgroundColor(13)
mySprite = sprites.create(sprites.vehicle.carRedLeft, SpriteKind.Player)
mySprite.setPosition(192, 48)
scene.cameraFollowSprite(mySprite)
tiles.setTilemap(tilemap`level1`)
accel = 220
direction = 0
dx = [
-1,
0,
1,
0
]
dy = [
0,
1,
0,
-1
]
cars = [
sprites.vehicle.carRedLeft,
sprites.vehicle.carRedFront,
sprites.vehicle.carRedRight,
sprites.vehicle.carRedBack
]
방향()
let bestTime = 0
let lapTime = 0
시간()
checkPoint = 0
game.showLongText("A 버튼으로 뱡항을 전환하세요.", DialogLayout.Bottom)
startTime = game.runtime()
game.onUpdate(function () {
    mySprite.vx = mySprite.vx * 0.97
    mySprite.vy = mySprite.vy * 0.97
    lapTime = game.runtime() - startTime
})
