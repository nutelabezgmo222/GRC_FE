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
        name: 'ControlsWrapper',
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
        title: 'General',
        path: '/settings/general',
        name: 'GeneralSettingsWrapper',
        icon: 'hexagon',
        children: [{
            title: 'Users',
            path: '/settings/general/users'
        }, {
            title: 'Admin',
            path: '/settings/general/admin'
        }],
    }, {
        title: 'Control panel',
        path: '/settings/control-panel',
        name: 'ControlPanel',
        icon: 'tool',
    }, {
        title: 'Risk settings',
        name: 'RisksSettingsWrapper',
        path: '/settings/risks',
        icon: 'settings',
        children: [{
            title: 'Threats and vulnerabilities',
            path: '/settings/risks/threats'
        }, {
            title: 'Risk periods',
            path: '/settings/risks/periods'
        }],
    }, {
        title: 'Control settings',
        name: 'SettingsPage',
        path: '/settings/controls',
        icon: 'settings',
    }, {
        title: 'Logout',
        path: '/logout',
        icon: 'log-out',
    }],
}, {
    tab: 'Notification',
    icon: 'bell',
    children: [],
}];