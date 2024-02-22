import theme from './theme';


const globalStyles = `
body{
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    overflow-x: hidden;
    overflow-y: scroll !important;
    margin: 0px;
    padding:0px;
    width:100%;
    heigth:100%;
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
.search-input, .select-category{
    background-color: ${theme.colors.search};
}

.button-pedidos button, .right button{
    background-color: ${theme.colors.buttonOrder};
}

.upload-image{
    color: ${theme.colors.text};
}

.footer {
    position: relative;
  }

  @media screen and (max-width: 763px) {
    .app{
        overflow:scroll !important;
    }
    .root{
        overflow:scroll;
    }
    .footer {
        position: relative;
      }
      
      body{
        margin: 0px !important;
        padding:0px !important;
      }
      .container{
        margin-bottom: 50px;
    }
  }
`;

export default globalStyles;