'use strict'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function makeRandLine() {
    const words = ['Hahahaha', 'Cheers!', 'Be strong', 'Cute']
    return words[getRandomInt(0, words.length)]
}