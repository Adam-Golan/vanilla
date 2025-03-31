interface ITheme {
    bg: string
    color: string
    [variable: string]: string
}
export const theme: {dark: ITheme, light: ITheme} = {
    dark: {
        bg: '#000',
        color: '#fff'
    },
    light: {
        color: '#000',
        bg: '#fff'
    }
}