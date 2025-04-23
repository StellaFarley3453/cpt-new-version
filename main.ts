
//set things up
namespace SpriteKind {
    export const dialoguedoor = SpriteKind.create()
    export const lever1 = SpriteKind.create()
    export const lever2 = SpriteKind.create()
    export const lever3 = SpriteKind.create()
    export const box1 = SpriteKind.create()
    export const box2 = SpriteKind.create()
    export const torch = SpriteKind.create()
    export const lockeddoor = SpriteKind.create()
    export const wooddoor = SpriteKind.create()
    export const boardedwall = SpriteKind.create()
}
let key = false
let unlittorch = false
let littorch = false
let long_board = false
let prybar = false

tiles.setCurrentTilemap(tilemap`level`)

let princess = sprites.create(assets.image`princess_facing_down`)
scene.cameraFollowSprite(princess)
controller.moveSprite(princess)
tiles.placeOnTile(princess, tiles.getTileLocation(53, 7))

let interactbox:Sprite = null

let skeleton = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
`, SpriteKind.Enemy)
skeleton.setPosition(48,94)

let leverhitbox1 = sprites.create(assets.image`myImage`,SpriteKind.lever1)
tiles.placeOnTile(leverhitbox1, tiles.getTileLocation(58, 6))
leverhitbox1.setFlag(SpriteFlag.Invisible,true) 

let keybox = sprites.create(assets.image`myImage`,SpriteKind.box1)
tiles.placeOnTile(keybox,tiles.getTileLocation(56,15))
keybox.setFlag(SpriteFlag.Invisible,true)
let dialogue1 = ["A voice chimes in from the other side of the door.\"Hello? is there at last someone in the cell next to mine to give me company?\"",
"\"So are you a princess or something? I heard the guards say something about you. I can't seem to remember what It was, though.\"","\"What? you think you can get out? Well, you wouldn't be the first. Ask me if you need any tips!\"",
"\"I've heard whispers of a lever in your room that opens one of the doors. There might be something useful in there to get you out.\"",
"\"Well you mustn't dawdle, if you plan to escape then get to it!\""]
let dialogue2 = ["\"you have a key? well that's lovely! If I were you, I'd find the door it goes to.\"","\"After, you should try to find something useful in a nearby room.\"","\"Go on, then.\""]
let dialogue3 = []
let dialoguespot1 = 0
let dialoguespot2 = 0
let dialoguespot3 = 0

let keydoor = sprites.create(assets.image`myImage0`,SpriteKind.lockeddoor)
tiles.placeOnTile(keydoor,tiles.getTileLocation(50,8))
keydoor.y=keydoor.y-8
keydoor.setFlag(SpriteFlag.Invisible,true)

let dialogue_door = sprites.create(assets.image`myImage`,SpriteKind.dialoguedoor)
tiles.placeOnTile(dialogue_door,tiles.getTileLocation(53,3))
dialogue_door.setFlag(SpriteFlag.Invisible,true)
// this variable is to keep track of what direction the player sprite is facing.
// 1 is up, 2 is right, 3 is down, 4 is left.
let direction = 3


//event handlers
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 4
    animation.runImageAnimation(princess,assets.animation`princess_Walk_Left`,100,true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
    animation.runImageAnimation(princess, assets.animation`princess_Walk_Right`, 100, true)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 1
    animation.runImageAnimation(princess, assets.animation`princess_Walk_Up`, 100, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
    animation.runImageAnimation(princess, assets.animation`princess_Walk_Down`, 100, true)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (!controller.up.isPressed() && !controller.left.isPressed() && !controller.right.isPressed() && !controller.down.isPressed()){
    animation.stopAnimation(animation.AnimationTypes.All, princess)
    }
    //princess.setImage(assets.image`princess_facing_left`)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (!controller.up.isPressed() && !controller.left.isPressed() && !controller.right.isPressed() && !controller.down.isPressed()) {
        animation.stopAnimation(animation.AnimationTypes.All, princess)
    }
    //princess.setImage(assets.image`princess_facing_right`)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (!controller.up.isPressed() && !controller.left.isPressed() && !controller.right.isPressed() && !controller.down.isPressed()) {
        animation.stopAnimation(animation.AnimationTypes.All, princess)
    }
    //princess.setImage(assets.image`princess_facing_up`)
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (!controller.up.isPressed() && !controller.left.isPressed() && !controller.right.isPressed() && !controller.down.isPressed()) {
        animation.stopAnimation(animation.AnimationTypes.All, princess)
    }
    //princess.setImage(assets.image`princess_facing_down`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed,function(){
if (direction == 1) {
    let interactbox = sprites.create(assets.image`myImage`, SpriteKind.Projectile)
    interactbox.lifespan = 500
    interactbox.setPosition(princess.x,princess.y-16)
    //i've commented below out to make the interactbox visible for testing purposes.
    interactbox.setFlag(SpriteFlag.Invisible,true)
}
if (direction == 2) {
    let interactbox = sprites.create(assets.image`myImage`, SpriteKind.Projectile)
    interactbox.lifespan = 500
    interactbox.setPosition(princess.x + 16, princess.y)
    interactbox.setFlag(SpriteFlag.Invisible, true)
}
if (direction == 3) {
    let interactbox = sprites.create(assets.image`myImage`, SpriteKind.Projectile)
    interactbox.lifespan = 500
    interactbox.setPosition(princess.x, princess.y + 16)
    interactbox.setFlag(SpriteFlag.Invisible, true)
}
if (direction == 4) {
    interactbox = sprites.create(assets.image`myImage`, SpriteKind.Projectile)
    interactbox.lifespan = 500
    interactbox.setPosition(princess.x - 16, princess.y)
    interactbox.setFlag(SpriteFlag.Invisible, true)
}
})
sprites.onOverlap(SpriteKind.Projectile,SpriteKind.lever1,opendoor1)
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.dialoguedoor, dialogue)
sprites.onOverlap(SpriteKind.Projectile,SpriteKind.box1,function(sprite:Sprite,otherSprite:Sprite){
    sprites.destroy(otherSprite)
    key = true
    tiles.setTileAt(tiles.getTileLocation(56,15), assets.image`openbox`)
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.UntilDone)
    pause(300)
    game.showLongText("You got a key. How convenient.",DialogLayout.Bottom)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.lockeddoor, opendoor2)
//functions
function opendoor(sprite:Sprite,otherSprite:Sprite,location1:tiles.Location,location2:tiles.Location,image1:Image,image2:Image){
    sprites.destroy(otherSprite)
    sprites.destroy(sprite)
    tiles.setTileAt(location1,image1)
    tiles.setTileAt(location2,image2)
    tiles.setWallAt(location1,false)
    tiles.setWallAt(location2,false)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
}
function opendoor1(sprite:Sprite,otherSprite:Sprite) {
    tiles.setTileAt(tiles.getTileLocation(58, 6),assets.image`orange_lever_down`)
    opendoor(sprite, otherSprite, tiles.getTileLocation(52, 10), tiles.getTileLocation(53, 10), assets.image`opendoor`, assets.image`opendoor`)
}
function opendoor2(sprite:Sprite,otherSprite:Sprite) {
    if (key){
        opendoor(sprite, otherSprite, tiles.getTileLocation(50, 7), tiles.getTileLocation(50, 8), assets.image`opendoor`, assets.image`opendoor`)
    }
    else{
        sprites.destroy(sprite)
        game.showLongText("locked...",DialogLayout.Bottom)
    }
}
function burndoor3() {

}
function removeboards() {

}
function openpittrap() {

}
function laydownboard() {

}
function victory() {

}
function dialogue(sprite:Sprite,otherSprite:Sprite) {
    sprites.destroy(sprite)
    if (dialoguespot1 < 5 && !key){
        game.showLongText(dialogue1[dialoguespot1],DialogLayout.Bottom)
        if (dialoguespot1<4){
            dialoguespot1++
        }
        
    }
    else{
        if (key && !unlittorch) {
            game.showLongText(dialogue2[dialoguespot2],DialogLayout.Bottom)
            if (dialoguespot2 < dialogue2.length - 1) {
                dialoguespot2++
            }
        }
    }
}