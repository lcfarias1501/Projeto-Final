
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"

// Get trending restaurants
export async function GET() {

    try {

        const trendingRestaurants = await prisma.restaurant.findMany({
            take: 10
        })

        return NextResponse.json(trendingRestaurants)

    } catch (error) {
        
        console.error("Error fetching trending restaurants:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
        
    }

}