
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"


export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = searchParams.get("take")

    try {

        const dishesByRating = await prisma.menuItem.findMany({
            select: {
                name: true, 
                category: true, 
                description: true, 
                id: true, 
                imageUrl: true, 
                price: true, 
                restaurantId: true
            },
            take: take ? parseInt(take) : 6
        })

        return NextResponse.json(dishesByRating, { status: 200 })
        
    } catch (error) {

        console.error("Error fetching restaurants by category:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
        
    }

}