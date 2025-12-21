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
        path: '/About'
    },
    {
        name: 'Pesquisa',
        path: '/Search'
    },
    {
        name: 'Contactos',
        path: '/Contacts' // Corrigi aqui - estava faltando a barra
    },
]

export default menuItems