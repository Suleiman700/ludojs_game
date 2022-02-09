let players = 1
let turn = 0


let players_data = [
    // Player 0
    {
        bg_color: 'rgba(32 115 181 / 47%)',
        lastWhiteCell: 51,
        firstGoalCell: 53,
        lastGoalCell: 57,
    },
    // Player 1
    {
        bg_color: 'rgba(176 181 32 / 47%)',
        lastWhiteCell: 25,
        firstGoalCell: 63,
        lastGoalCell: 67,
    },
    // Player 2
    {
        // bg_color: 'rgba(176 181 32 / 47%)',
        lastWhiteCell: 12,
        firstGoalCell: 58,
        lastGoalCell: 62,
    },
    // Player 3
    {
        // bg_color: 'rgba(176 181 32 / 47%)',
        lastWhiteCell: 38,
        firstGoalCell: 68,
        lastGoalCell: 72,
    }
]

// Players background color
const p1_color = 'rgba(32 115 181 / 47%)'
const p2_color = 'rgba(176 181 32 / 47%)'
const p3_color = 'rgba(181 32 32 / 47%)'
const p4_color = 'rgba(65 150 77 / 47%)'

// Add players markers
for (let player=0; player<=players; player++) {
    for (let marker=1; marker<=4; marker++) {
        $(`#base_player${player}_pos${marker}`).append(`<span class="dot cursor marker_player${player}" id="p${player}_m${marker}" player="1" onclick="moveMarker(this)"></span>`)
    }
}

// Set background
$('body').css('background', players_data[0]['bg_color'])

// Set glowing turn base
setGlowingBase(turn)

