// Store global markers info
var markers_info = {
    // Player 0
    p0_m1: {
        base_cell: 'base_player0_pos1',
        location: 'base',
        start_cell: 'cell_1',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p0_m2: {
        base_cell: 'base_player0_pos2',
        location: 'base',
        start_cell: 'cell_1',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p0_m3: {
        base_cell: 'base_player0_pos3',
        location: 'base',
        start_cell: 'cell_1',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p0_m4: {
        base_cell: 'base_player0_pos4',
        location: 'base',
        start_cell: 'cell_1',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    // Player 1
    p1_m1: {
        base_cell: 'base_player1_pos1',
        location: 'base',
        start_cell: 'cell_27',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p1_m2: {
        base_cell: 'base_player1_pos2',
        location: 'base',
        start_cell: 'cell_27',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p1_m3: {
        base_cell: 'base_player1_pos3',
        location: 'base',
        start_cell: 'cell_27',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p1_m4: {
        base_cell: 'base_player1_pos4',
        location: 'base',
        start_cell: 'cell_27',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    // Player 2
    p2_m1: {
        base_cell: 'base_player2_pos1',
        location: 'base',
        start_cell: 'cell_14',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p2_m2: {
        base_cell: 'base_player2_pos2',
        location: 'base',
        start_cell: 'cell_14',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p2_m3: {
        base_cell: 'base_player2_pos3',
        location: 'base',
        start_cell: 'cell_14',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p2_m4: {
        base_cell: 'base_player2_pos4',
        location: 'base',
        start_cell: 'cell_14',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    // Player 3
    p3_m1: {
        base_cell: 'base_player3_pos1',
        location: 'base',
        start_cell: 'cell_40',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p3_m2: {
        base_cell: 'base_player3_pos2',
        location: 'base',
        start_cell: 'cell_40',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p3_m3: {
        base_cell: 'base_player3_pos3',
        location: 'base',
        start_cell: 'cell_40',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    },
    p3_m4: {
        base_cell: 'base_player3_pos4',
        location: 'base',
        start_cell: 'cell_40',
        passedLastWhiteCell: false,
        enteredGoalPath: false,
    }
}


function moveMarker(elm) {
    if (!rolled_dice) return 0

    const marker_id = $(elm).attr('id')
    const marker_location = markers_info[marker_id]['location']
    let new_marker_location
    let passTurn = true

    // If marker is in base and got 6
    if (marker_location==='base' && result===6) {
        console.log('in base with dice 6')
        const start_cell = markers_info[marker_id]['start_cell']
        const base_cell = markers_info[marker_id]['base_cell']

        // Remove marker from base cell
        $(`#${base_cell}`).html('')

        // Move marker to the start cell
        $(`#${start_cell}`).html(elm)

        // Set marker location
        new_marker_location = start_cell
    }
    // Marker is playing
    else if (marker_location!=='base') {
        console.log('not in base')
        const numberic_cell_id = marker_location.replaceAll("cell_", "");

        // Remove marker from current cell
        $(`#${marker_id}`).remove()

        // Calculate the next cell
        const numeric_next_cell = (Number(numberic_cell_id) + Number(result))
        let next_cell = 'cell_' + numeric_next_cell

        // If the next cell is beyond marker path (When marker reached the end of its while cells)
        const player_last_white_cell = Number(players_data[turn]['lastWhiteCell'])
        const player_first_goal_cell = Number(players_data[turn]['firstGoalCell'])
        const player_last_goal_cell = Number(players_data[turn]['lastGoalCell'])
        const player_passed_last_white_cell = markers_info[marker_id]['passedLastWhiteCell']
        const player_entered_goal_path = markers_info[marker_id]['enteredGoalPath']

        if (turn===0 && numeric_next_cell > player_last_white_cell) {
            next_cell = 'cell_' + (player_first_goal_cell + Number(result) - 1)
            console.log('Next cell is: ' + next_cell)
        }

        if (turn===0) {
            console.log('p0 turn')
        }
        else if (turn===1) {
            // If reached the last white cell
            if (numeric_next_cell > 52 && !player_passed_last_white_cell) {
                next_cell = 'cell_' + (Number(numeric_next_cell) - 52)
                markers_info[marker_id]['passedLastWhiteCell'] = true
                console.log(`player${turn} has reached the last white cell, resetting...`)
            }

            // If reached the end of marker path
            else if (numeric_next_cell > player_last_white_cell && player_passed_last_white_cell && !player_entered_goal_path) {
                markers_info[marker_id]['enteredGoalPath'] = true
                next_cell = 'cell_' + (player_first_goal_cell + Number(result) -1)
                console.log(`player${turn}'s marker has reached the last white cell, entering goal path...`)
            }

            // else if (67)

            // If reached the goal
            else if (numeric_next_cell > player_last_goal_cell) {
                console.log('REACHED THE GOAL')
                next_cell = 'cell_500'
            }
        }

        // If next cell is bigger than allowed white cells
        /*
            The last white cell is (cell_52) and if marker was standing on (cell_51) and got (dice 3) he will go to (cell_54)
            With this code, it will calculate the number of steps that are bigger than (cell_52), Example:
            Next cell is (cell_54) -> 54 - 52 = 2 => so from (cell_51) to (cell_2) on board there are 3 steps :)
         */
        /*if (turn===0 && numeric_next_cell > 52) {
            console.log('player0 reached the end')
            const more_moves = Number(numeric_next_cell) - player_last_white_cell
            next_cell = 'cell_' + more_moves
        }
        else if (turn===1 && numeric_next_cell > 26 && markers_info[marker_id]['passedLastWhiteCell']) {
            console.log('player1 reached the end')
            const more_moves = Number(numeric_next_cell) - player_last_white_cell
            next_cell = 'cell_' + more_moves
        }*/

        console.log(next_cell)

        // Move marker to the next cell
        $(`#${next_cell}`).append(elm)

        // Set marker location
        new_marker_location = next_cell
    }

    if (new_marker_location) {
        // Update marker location
        markers_info[marker_id]['location'] = new_marker_location

        // Add marker to cell info
        cells[new_marker_location]['markersIn'].push(marker_id)

        // Check if marker passed last white cell
        // if (turn===0 && new_marker_location > 52) markers_info[marker_id]['passedLastWhiteCell'] = true
        // else if (turn===1 && new_marker_location > 51) markers_info[marker_id]['passedLastWhiteCell'] = true

        // Remove glowing effect
        $(`.marker_player${turn}`).each(function(i, obj) {
            $(this).removeClass('glowing')
        });

        if (result===6) passTurn = false
        if (passTurn) nextTurn()

        rolled_dice = false
        waiting_for_movement = false
    }
}
