import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Desestruturamos os dados, separando o menuItems do resto
        const {
            name,
            description,
            address,
            rating,
            city,
            phoneNumber,
            cuisineType,
            imageUrl,
            openHour,
            closeHour,
            openDays,
            menuItems, // A lista de pratos vinda do frontend
        } = body

        const newRestaurant = await prisma.restaurant.create({
            data: {
                name,
                description,
                address,
                rating: parseFloat(rating), // Garantir que é Float
                city,
                phoneNumber,
                cuisineType,
                imageUrl,
                openHour,
                closeHour,
                openDays,
                // Aqui acontece a mágica: criamos o restaurante e os itens de uma vez
                menuItems: {
                    create: menuItems.map((item: any) => ({
                        name: item.name,
                        description: item.description,
                        imageUrl: item.imageUrl, // URL já vinda do Cloudinary via frontend
                        price: parseFloat(item.price), // Garantir que é Float
                        category: item.category,
                    }))
                }
            },
            // Opcional: incluir o menu na resposta para confirmar a criação
            include: {
                menuItems: true
            }
        })

        return NextResponse.json(newRestaurant, { status: 201 })

    } catch (error: any) {
        console.error("Error creating restaurant:", error)
        return NextResponse.json(
            { message: "Erro ao criar restaurante", error: error.message }, 
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        // Incluímos o menuItems no GET para que a listagem já traga os pratos se necessário
        const allRestaurants = await prisma.restaurant.findMany({
            include: {
                menuItems: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(allRestaurants);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}