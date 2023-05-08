export default [{
    tab: 'General',
    icon: 'user',
    children: [{
        title: 'Main',
        name: 'MainPage',
        path: '/main',
        icon: 'database'
    },{
        title: 'Risks',
        name: 'RisksWrapper',
        path: '/risks',
        icon: 'alert-circle',
        children: [{
            title: 'My risks',
            path: '/risks/my'
        }, {
            title: 'All risks',
            path: '/risks/overview'
        },  {
            title: 'Reports',
            path: '/risks/reports'
        }],
    }, {
        title: 'Controls',
        name: 'ControlWrapper',
        path: '/controls',
        icon: 'edit',
        children: [{
            title: 'My controls',
            path: '/controls/my'
        }, {
            title: 'All controls',
            path: '/controls/overview'
        },  {
            title: 'Reports',
            path: '/controls/reports'
        }],
    }],
}, {
    tab: 'Settings',
    icon: 'settings',
    children: [{
        title: 'Settings',
        path: '/settings',
        icon: 'settings',
    }, {
        title: 'Logout',
        path: '/logout',
        icon: 'log-out',
    }],
}, {
    tab: 'Notification',
    icon: 'bell',
    children: [{
        title: 'Settings',
        path: '/settings',
        icon: 'settings',
    }, {
        title: 'Logout',
        path: '/logout',
        icon: 'log-out',
    }],
}];