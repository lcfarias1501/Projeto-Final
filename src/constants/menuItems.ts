interface MenuItem {
    name: string
    path: string | MenuItem[]
}

const menuItems: MenuItem[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Dashboard',
        path: [
            { name: 'Criar Restaurante', path: '/dashboard/create-restaurant' },
            { name: 'Apagar Restaurantes', path: '/dashboard/delete-restaurant' }
        ]
    },
    {
        name: 'Sobre',
        path: '/sobre'
    },
    {
        name: 'Pesquisa',
        path: '/search'
    },
]

export default menuItems