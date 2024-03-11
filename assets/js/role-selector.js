(() => {
    var makeImageName = (role) => {
        if(role.length) {
            role = '-'+role.slice(1);
        }
        return '/assets/images/getting-started/one-team/prooph-board-roles'+role+'.png';
    }

    var openLink = (role) => {
        role = role.slice(1);

        if(role === 'all') {
            window.location.href = 'https://free.prooph-board.com';
            return;
        }

        window.location.pathname = '/getting_started/'+role;
    }

    var initRoleSelector = () => {
        var roleSelector = document.querySelector('.prooph-board-role-selector');

        console.log(roleSelector);

        if(roleSelector) {
            var image = roleSelector.querySelector('image');

            var links = roleSelector.querySelectorAll('a');

            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    console.log(link.getAttribute('xlink:href'), makeImageName(link.getAttribute('xlink:href')));
                    image.setAttribute('xlink:href', makeImageName(link.getAttribute('xlink:href')));
                });

                link.addEventListener('mouseleave', () => {
                    image.setAttribute('xlink:href', makeImageName(''));
                })

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    openLink(link.getAttribute('xlink:href'));
                })
            })
        }

    }


    var currentPath = null;
    window.setInterval(() => {
        if(currentPath !== window.location.pathname) {
            initRoleSelector();

            currentPath = window.location.pathname;
        }

    }, 500);
})();
