//set things up
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
let inventory = [0,0,0,0]
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
    //interactbox.setFlag(SpriteFlag.Invisible,true)
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
//this is the part I need help with. it should be triggering but it isnt.
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`red_lever_up`, function (sprite:Sprite, location:tiles.Location) {
    princess.sayText(":)")
})
//functions
function opendoor1() {

}
function opendoor2() {

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