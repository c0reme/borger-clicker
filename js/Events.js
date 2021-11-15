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
    Game.addBorgers(Game.click_amount);
    $('#borgers').text(unitify(Game.borgers));
    $('#borgers').innerHTML = Game.burgers;
}

function onStoreOpen() {
    // Checks what button gets pressed.
    onButton();
    // Changes the css
    $('.container').css({ 'margin': '0' });
    $('#store').css({ 'right': '-5px' });
    setTimeout(() => {
        // Changes the function for the onclick event
        $('#store-button').attr('onclick', 'onStoreClose()');
    }, 500)
}

function onStoreClose() {
    // Checks what button gets pressed.
    onButton();
    // Changes the css
    $('.container').css({ 'margin': '0 auto' });
    $('#store').css({ 'right': '-600px' });
    setTimeout(() => {
        // Changes the function for the onclick event
        $('#store-button').attr('onclick', 'onStoreOpen()');
    }, 500)
}

function onXn(type) {
    if ($('#xn').hasClass('1')) $('#xn').removeClass('1');
    if ($('#xn').hasClass('10')) $('#xn').removeClass('10');
    if ($('#xn').hasClass('100')) $('#xn').removeClass('100');
    if ($('#xn').hasClass('max')) $('#xn').removeClass('max');

    if (type == '1') {
        $('#xn').addClass('1'); $('#xn').text('x1');
    }
    else if (type == '10') {
        $('#xn').addClass('10'); $('#xn').text('x10');
    }
    else if (type == '100') {
        $('#xn').addClass('100'); $('#xn').text('x100');
    }
    else if (type == 'max') {
        $('#xn').addClass('max'); $('#xn').text('MAX');
    }
}

function onBXn(type) {
    switch (type) {
        case 'clicker':
            let amount = 1;
            if ($('#xn').hasClass('10')) amount = 10;
            else if ($('#xn').hasClass('100')) amount = 100;
            else if ($('#xn').hasClass('max')) amount = 100;
            Game.removeBorgers(Number($('#xm-clicker').val()))
            return Game.addUpgrade('clickers', amount);
    }
}