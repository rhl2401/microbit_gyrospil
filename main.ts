radio.onReceivedNumber(function (receivedNumber) {
    if (isMaster == 1 && gameStarted == 0) {
        list.push(receivedNumber)
        radio.sendNumber(receivedNumber)
        countDevices += 1
        basic.showNumber(countDevices)
    } else if (isMaster == 1 && gameStarted == 1) {
        list.removeAt(list.indexOf(receivedNumber))
        countDevices += -1
        basic.showNumber(countDevices)
    } else if (receivedNumber == control.deviceSerialNumber()) {
        registered = 1
        basic.showIcon(IconNames.Happy)
    } else {
    	
    }
})
input.onButtonPressed(Button.A, function () {
    if (isMaster == 1) {
        radio.sendValue("gameStarted", 1)
        gameStarted = 1
    }
})
input.onButtonPressed(Button.AB, function () {
    if (isMaster == 0) {
        isMaster = 1
        basic.showIcon(IconNames.Angry)
        radio.sendValue("master", control.deviceSerialNumber())
        countDevices = 0
        list = []
    }
})
input.onGesture(Gesture.Shake, function () {
    if (gameStarted == 1) {
        radio.sendValue("dead", control.deviceSerialNumber())
        basic.showIcon(IconNames.Sad)
        gameStarted = 0
        registered = 0
        basic.pause(1000)
    }
})
radio.onReceivedValue(function (name, value) {
    if (isMaster == 0) {
        if (name == "gameStarted") {
            gameStarted = value
        }
    }
})
let registered = 0
let countDevices = 0
let list: number[] = []
let gameStarted = 0
let isMaster = 0
isMaster = 0
gameStarted = 0
radio.setGroup(76)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    `)
basic.forever(function () {
    if (gameStarted == 0 && registered == 0) {
        radio.sendNumber(control.deviceSerialNumber())
        basic.pause(1000)
    } else {
    	
    }
})
