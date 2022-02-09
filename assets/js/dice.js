var button = document.getElementById('rolldice');
var rolled_dice = false
let $dice_placeholder = $('#placeholder')
var result
var waiting_for_movement

var dice = {
    sides: 6,
    roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
    }
}
//Prints dice roll to the page
function printNumber(number) {
    var placeholder = document.getElementById('placeholder');
    placeholder.innerHTML = number;
}
button.onclick = function() {
    if (waiting_for_movement) {
        alert('Please move a marker!')
        return 0
    }

    if (rolled_dice) return 0

    result = dice.roll();
    printNumber(result);

    // Play dice sound
    new Audio('./assets/sound/dice.mp3').play()

    // Check if player has any markers out
    let hasMarkersOut = false
    for (let marker=1; marker<=4; marker++) {
        let player_marker_data = markers_info[`p${turn}_m${marker}`]['location']
        if (player_marker_data!=='base') hasMarkersOut = true
    }

    if (!hasMarkersOut && result===6 && !waiting_for_movement) isSix()
    else if (hasMarkersOut && result!==6 && !waiting_for_movement) isNotSix()
    else if (!hasMarkersOut && result!==6 && !waiting_for_movement) nextTurn()

    rolled_dice = true
};

// Called when dice is 6
function isSix() {
    // Make markers glowing
    $(`.marker_player${turn}`).each(function(i, obj) {
        $(this).addClass('glowing')
    });
}

// Called when dice is not 6
function isNotSix() {
    console.log('not six')
    waiting_for_movement = true
    console.log('end of turn')
}

// Next turn
function nextTurn() {
    setTimeout(() => {
        console.log('next turn')
        $($dice_placeholder).html('')

        let newTurn = turn + 1
        if (newTurn > players) newTurn = 0
        turn = newTurn

        // Change background for the next player
        $('body').css('background', players_data[turn]['bg_color'])

        // Set next player glowing base
        setGlowingBase(turn)

        // Flag dice as not rolled
        rolled_dice = false

        waiting_for_movement = false
    }, 1000)
}


function roll_dice(num) {
    if (waiting_for_movement) {
        alert('Please move a marker!')
        return 0
    }

    if (rolled_dice) return 0

    result = num //dice.roll();
    printNumber(result);

    // Play dice sound
    new Audio('./assets/sound/dice.mp3').play()

    // Check if player has any markers out
    let hasMarkersOut = false
    for (let marker=1; marker<=4; marker++) {
        let player_marker_data = markers_info[`p${turn}_m${marker}`]['location']
        if (player_marker_data!=='base') hasMarkersOut = true
    }

    if (!hasMarkersOut && result===6 && !waiting_for_movement) isSix()
    else if (hasMarkersOut && result!==6 && !waiting_for_movement) isNotSix()
    else if (!hasMarkersOut && result!==6 && !waiting_for_movement) nextTurn()

    rolled_dice = true
}
