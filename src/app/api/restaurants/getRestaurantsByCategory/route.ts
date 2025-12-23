
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import { CuisineType } from "@prisma/client"

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("slug")

    try {

        if(!category) {
            return NextResponse.json({ message: "Category is required" }, { status: 400 })
        }

        if(!Object.values(CuisineType).includes(category as CuisineType)) {
            return NextResponse.json({ message: "Invalid category" }, { status: 400 })
        }

        const restaurantsByCategory = await prisma.restaurant.findMany({
            where: {
                cuisineType: category as CuisineType,
            },
        })

        return NextResponse.json(restaurantsByCategory, { status: 200 })
        
    } catch (error) {

        console.error("Error fetching restaurants by category:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
        
    }

}