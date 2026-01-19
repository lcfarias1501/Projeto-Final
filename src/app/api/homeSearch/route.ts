import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    // get restaurants matching the search query
    try {
        const restaurants = await prisma.restaurant.findMany({
            where: {
                name: {
                    contains: search || '',
                }
            },
            select: {
                id: true, 
                name: true, 
                imageUrl: true,
                cuisineType: true,
                city: true
            },
            take: 5
        })

        return NextResponse.json({ restaurants })

    } catch (error) {
        console.error("Error fetching restaurants:", error)
        return NextResponse.json({ error: "Failed to fetch restaurant details" }, { status: 500 })
    }

    // get menu items matching the search query
    // (implementation can be added here)

}
