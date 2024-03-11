require(['gitbook', 'jquery'], function(gitbook, $) {
    var SITES = {
        'linkedin': {
            'label': 'LinkedIn',
            'icon': 'fa fa-linkedin',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://www.linkedin.com/groups/9135097/');
            }
        },
        'gitter': {
            'label': 'View on Github',
            'icon': 'fa fa-github',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://github.com/proophboard');
            }
        }
    };



    gitbook.events.bind('start', function(e, config) {
        // Direct actions to share
        $.each(SITES, function(sideId, site) {

            gitbook.toolbar.createButton({
                icon: site.icon,
                label: site.label,
                position: 'right',
                onClick: site.onClick
            });
        });
    });
});
