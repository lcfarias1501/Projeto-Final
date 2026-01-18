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
        path: '/about'
    },
    {
        name: 'Pesquisa',
        path: '/search'
    },
    {
        name: 'Contactos',
        path: '/contacts' // Corrigi aqui - estava faltando a barra
    },
]

export default menuItems