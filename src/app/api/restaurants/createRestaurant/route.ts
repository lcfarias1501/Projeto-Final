
import { NextResponse } from "next/server"
import prisma from "@/libs/prisma"
import { Restaurant } from "@/types/Restaurant"

// Create a new restaurant
export async function POST(request: Request) {

    try {
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
        }: Restaurant = await request.json()

        const newRestaurant = await prisma.restaurant.create({
            data: {
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
            }
        })

        return NextResponse.json(newRestaurant, { status: 201 })

    } catch (error) {
        console.error("Error creating restaurant:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }

}


// Get all restaurants
export async function GET() {
  try {
    const allRestaurants = await prisma.restaurant.findMany();
    return NextResponse.json(allRestaurants);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}