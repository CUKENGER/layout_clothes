$(document).ready(function() {
    const menuItems = {
        "Бренды": ["Choux", "Rizzle"],
        "Одежда": [
            "Верхняя одежда",
            "Платья",
            "Жакеты",
            "Костюмы",
            "Рубашки и блузы"
        ],
        "Аксессуары": ["Бейсболки", "Ремни", "Шапки"],
        "Украшения": ["Украшения"],
        "Контакты": ["Контакты"],
        "Клиентский сервис": ["Номера телефонов"]
    };

    const $menuOpenHover = $('#menuOpenHover');
    const $menuItemNodes = $('.menu_item');
    const $podmenuItems = $('.podmenu_item');
    let hideTimeout;

    $menuItemNodes.each(function() {
        const $item = $(this);
        const $mobileArrow = $item.find('.menu_item_arrow--mobile');

        if (isMobileDevice()) {
            $item.on('touchstart', function(event) {
                event.stopPropagation();

                const $podmenu = $item.next('.podmenu');

                if ($podmenu.length) {
                    $('.podmenu').not($podmenu).removeClass('active').prev().find('.menu_item_arrow--mobile').attr('src', "assets/mobile_arrow.svg");

                    $podmenu.toggleClass('active');

                    if ($podmenu.hasClass('active')) {
                        $mobileArrow.attr('src', "assets/mobile_arrow_open.svg");
                    } else {
                        $mobileArrow.attr('src', "assets/mobile_arrow.svg");
                    }
                }
            });
        } else {
            $item.on('mouseenter', function() {
                clearTimeout(hideTimeout);
                showSubMenu($item);
            });

            $item.on('mouseleave', function() {
                hideTimeout = setTimeout(hideAllSubMenus, 300);
            });
        }
    });

    $podmenuItems.on('touchstart', function() {
        // Обработчик для подменю (если нужно)
    });

    $menuOpenHover.on('mouseenter', function() {
        clearTimeout(hideTimeout);
    });

    $menuOpenHover.on('mouseleave', function() {
        hideTimeout = setTimeout(hideAllSubMenus, 300);
    });

    $(document).on('click', function(event) {
        if (!$menuOpenHover.is(event.target) && $menuOpenHover.has(event.target).length === 0 && !$menuItemNodes.is(event.target) && $menuItemNodes.has(event.target).length === 0) {
            hideAllSubMenus();
        }
    });

    function showSubMenu($item) {
        const itemName = $item.text().trim();
        const subItems = menuItems[itemName];

        $menuOpenHover.empty();
        if (subItems && subItems.length > 0) {
            subItems.forEach(function(subItem) {
                $('<div></div>').text(subItem).addClass('menu_open_item').appendTo($menuOpenHover);
            });
            $menuOpenHover.addClass('show');
        } else {
            $menuOpenHover.removeClass('show');
        }
    }

    function hideAllSubMenus() {
        $menuOpenHover.removeClass('show');
        $menuItemNodes.removeClass('active');
    }

    function isMobileDevice() {
        is = window.innerWidth < 525;
        console.log('is', is);
        return is
    }
});