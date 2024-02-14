import theme from './theme';


const globalStyles = `
body{
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    overflow-x: hidden;
}

ul{
    list-style: none;
}

a{
    text-decoration: none;
    color: ${theme.colors.text};
}

*{
    margin: 0;
    padding: 0;
    font-family: "Poppins";
}
.navbar, .offcanvas{
    background-color: ${theme.colors.secundary};
}
.search-input{
    background-color: ${theme.colors.search};
}

.button-pedidos button, .right button{
    background-color: ${theme.colors.buttonOrder};
}
`;

export default globalStyles;