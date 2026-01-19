
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import { CuisineType } from "@prisma/client"

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = searchParams.get("take")

    try {

        const restaurantsByRating = await prisma.restaurant.findMany({
            orderBy: {
                rating: "desc"
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                cuisineType: true,
                rating: true,
                openHour: true,
                closeHour: true,
            },
            take: take ? parseInt(take) : 6
        })

        return NextResponse.json(restaurantsByRating, { status: 200 })
        
    } catch (error) {

        console.error("Error fetching restaurants by category:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
        
    }

}