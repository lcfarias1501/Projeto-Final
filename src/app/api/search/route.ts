import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const city = searchParams.get('city')
    const cuisineType = searchParams.get('cuisineType')?.toUpperCase()
    const restaurantName = searchParams.get('restaurantName')



    try {
        const where: any = {}

        if (restaurantName) {
            where.name = { contains: restaurantName }
        }

        if (city) {
            where.city = { contains: city }
        }

        if (cuisineType) {
            // Como você está usando o valor do Enum diretamente do seu arquivo de constantes,
            // o Prisma filtrará corretamente pela strinxg correspondente
            where.cuisineType = {
                equals: cuisineType,
            }
        }

        console.log("Where:", where)

        const restaurants = await prisma.restaurant.findMany({
            where,
            // Ordenar por nome por padrão
            orderBy: { name: 'asc' }
        })

        return NextResponse.json(restaurants)
    } catch (error) {
        console.error("Erro na busca:", error)
        return NextResponse.json({ error: "Erro ao buscar" }, { status: 500 })
    }
}