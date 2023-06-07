module.exports = {
    content: ["./src/**/*.vue"],
    theme: {
        extend: {
            colors: {
                'main-blue': '#14213D',
                'light-blue': '#0077b6',
                'main-orange': '#FCA311',
                'main-gray': '#E5E5E5',
                'lightgray': '#E1E1E1',
                'light-green': '#90e0ef',
                'dark-green': '#354f52'
            },
            lineClamp: {
                2: '2',
            },
            width: {
                '7/10': '70%',
                '3/10': '30%'
            },
        },
    },
    plugins: [],
};