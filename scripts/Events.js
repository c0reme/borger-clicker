function onButton(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function onBorgerClick() {
    // Checks what button gets pressed.
    onButton();
    // Adds a pulse effect to the burger when it gets clicked.
    $('#borger').addClass('pulse');
    $('#borger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
        // Removes the effect after it has ended.
        $('#borger').removeClass('pulse');
    })
    // Increases the amount of burgers by 1.
    Game.addBorgers(1);
    $('#borgers').text(Game.borgers.toLocaleString('en-US'));
    $('#borgers').innerHTML = Game.burgers;
}
