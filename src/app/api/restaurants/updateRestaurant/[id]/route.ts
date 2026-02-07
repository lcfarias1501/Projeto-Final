import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const restaurantId = parseInt(id)
        const body = await request.json()

        if (isNaN(restaurantId)) {
            return NextResponse.json({ error: "ID Inválido" }, { status: 400 })
        }

        // 1. Extraímos os menuItems do body para tratá-los separadamente
        const { menuItems, ...restaurantData } = body

        // 2. Usamos uma transação para garantir que tudo ocorra bem (ou nada ocorra)
        const updatedRestaurant = await prisma.$transaction(async (tx) => {
            
            // Se o usuário enviou menuItems, atualizamos a lista
            if (menuItems) {
                // Primeiro, removemos todos os itens antigos do menu deste restaurante
                await tx.menuItem.deleteMany({
                    where: { restaurantId: restaurantId }
                })

                // Depois, criamos os novos itens vinculados a este restaurante
                // O restaurantData já terá o imageUrl atualizado vindo do front
                restaurantData.menuItems = {
                    create: menuItems.map((item: any) => ({
                        name: item.name,
                        description: item.description || "",
                        price: parseFloat(item.price),
                        category: item.category,
                        imageUrl: item.imageUrl || "",
                    }))
                }
            }

            // Tratamento do Rating (Garantir que é float se existir)
            if (restaurantData.rating) {
                restaurantData.rating = parseFloat(restaurantData.rating)
            }

            // 3. Atualizamos os dados do restaurante
            return await tx.restaurant.update({
                where: { id: restaurantId },
                data: restaurantData,
                include: {
                    menuItems: true // Retorna o restaurante com o menu novo
                }
            })
        })

        return NextResponse.json(updatedRestaurant)

    } catch (error: any) {
        console.error("Erro ao atualizar restaurante:", error)
        
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Restaurante não encontrado" }, { status: 404 })
        }

        return NextResponse.json({ 
            error: "Erro ao atualizar dados", 
            details: error.message 
        }, { status: 500 })
    }
}