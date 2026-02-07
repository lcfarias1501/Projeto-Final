import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import { cloudinary } from "@/libs/cloudinary"

// Função auxiliar para extrair o publicId de uma URL do Cloudinary
const extractPublicId = (url: string) => {
    try {
        const parts = url.split('/')
        const folder = parts[parts.length - 2]
        const fileNameWithExtension = parts[parts.length - 1]
        const fileName = fileNameWithExtension.split('.')[0]
        return `${folder}/${fileName}`
    } catch {
        return null
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const restaurantId = parseInt(id)

        // 1. Buscar o restaurante E os itens do menu antes de deletar
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
            include: { menuItems: true } // Precisamos das URLs das fotos dos pratos
        })

        if (!restaurant) {
            return NextResponse.json({ error: "Restaurante não encontrado" }, { status: 404 })
        }

        // 2. Coletar todas as URLs de imagem (Principal + Menu)
        const imagesToDelete: string[] = []
        
        if (restaurant.imageUrl) imagesToDelete.push(restaurant.imageUrl)
        
        restaurant.menuItems.forEach(item => {
            if (item.imageUrl) imagesToDelete.push(item.imageUrl)
        })

        // 3. Deletar as imagens do Cloudinary
        await Promise.all(
            imagesToDelete.map(async (url) => {
                const publicId = extractPublicId(url)
                if (publicId) {
                    try {
                        const result = await cloudinary.uploader.destroy(publicId)
                        console.log(`Cloudinary delete (${publicId}):`, result)
                    } catch (err) {
                        console.error(`Erro ao apagar imagem ${publicId}:`, err)
                    }
                }
            })
        )

        // 4. Deletar do banco (O Cascade tratará os MenuItems e RestaurantImages automaticamente)
        await prisma.restaurant.delete({
            where: { id: restaurantId },
        })

        return NextResponse.json({ message: "Restaurante e mídia removidos com sucesso!" })

    } catch (error: any) {
        console.error("Erro no delete:", error)
        return NextResponse.json({ error: "Erro interno ao deletar" }, { status: 500 })
    }
}