interface items {
    name: string
    path: string
}

const menuItems: items[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Sobre',
        path: '/About'
    },
    {
        name: 'Mapa',
        path: '/Maps'
    },
    {
        name: 'Carrinho',
        path: 'Checkout'
    },
]

export default menuItems