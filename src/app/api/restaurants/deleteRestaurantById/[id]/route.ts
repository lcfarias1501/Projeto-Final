import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import { cloudinary } from "@/libs/cloudinary"


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const restaurantId = parseInt(id)

        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
        })

        if (!restaurant) {
            return NextResponse.json({ error: "Restaurante não encontrado" }, { status: 404 })
        }

        // --- LÓGICA CORRIGIDA PARA O PUBLIC_ID ---
        if (restaurant.imageUrl) {
            try {
                
                const parts = restaurant.imageUrl.split('/')
                const folder = parts[parts.length - 2] 
                const fileNameWithExtension = parts[parts.length - 1]
                const fileName = fileNameWithExtension.split('.')[0]

                const publicId = `${folder}/${fileName}`
                
                console.log("Tentando deletar Public ID:", publicId) // Verifique no console se aparece 'restaurants/lkdr...'
                
                const result = await cloudinary.uploader.destroy(publicId)
                console.log("Resultado Cloudinary:", result)
                
            } catch (cloudErr) {
                console.error("Erro Cloudinary:", cloudErr)
            }
        }

        // Deletar do banco
        await prisma.restaurant.delete({
            where: { id: restaurantId },
        })

        return NextResponse.json({ message: "Deletado com sucesso!" })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Erro interno" }, { status: 500 })
    }
}