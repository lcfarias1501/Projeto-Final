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

        // O Prisma lida automaticamente com campos parciais.
        // Se 'body' for { name: "Novo Nome" }, apenas o nome será alterado.
        const updatedRestaurant = await prisma.restaurant.update({
            where: { id: restaurantId },
            data: {
                ...body,
                // Garantir que campos numéricos sejam tratados corretamente se existirem
                rating: body.rating ? parseFloat(body.rating) : undefined,
            },
        })

        return NextResponse.json(updatedRestaurant)
    } catch (error: any) {
        console.error("Erro ao atualizar restaurante:", error)
        
        // Erro de P2025 é o código do Prisma para "Registro não encontrado"
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Restaurante não encontrado para atualizar" }, { status: 404 })
        }

        return NextResponse.json({ error: "Erro ao atualizar dados" }, { status: 500 })
    }
}