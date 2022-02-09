function setGlowingBase(player_number) {
    $(`#base_player0`).removeClass('glowing-base')
    $(`#base_player1`).removeClass('glowing-base')
    $(`#base_player2`).removeClass('glowing-base')
    $(`#base_player3`).removeClass('glowing-base')

    $(`#base_player${player_number}`).addClass('glowing-base')
}
