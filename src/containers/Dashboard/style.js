export default (theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        padding: 30,
        overflow: 'auto'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(5, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    Item: {
        ...theme.typography.body2,
        flex: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgb(10 10 10 / 2%)',
        textAlign: 'center',
        boxShadow: 'none',
        borderRadius: 15,
        fontSize: 11,
        margin: 3,
        flexGrow: 1,
        flexShrink: 1,
        height: '100px',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#d3d3d3'
        }
    }
})