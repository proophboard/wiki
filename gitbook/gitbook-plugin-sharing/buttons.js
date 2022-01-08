require(['gitbook', 'jquery'], function(gitbook, $) {
    var SITES = {
        'twitter': {
            'label': 'Twitter',
            'icon': 'fa fa-twitter',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://twitter.com/prooph_software');
            }
        },
        'gitter': {
            'label': 'View on Github',
            'icon': 'fa fa-github',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://github.com/proophboard/wiki');
            }
        }
    };



    gitbook.events.bind('start', function(e, config) {
        // Direct actions to share
        $.each(SITES, function(sideId, site) {

            gitbook.toolbar.createButton({
                icon: site.icon,
                label: site.text,
                position: 'right',
                onClick: site.onClick
            });
        });
    });
});
