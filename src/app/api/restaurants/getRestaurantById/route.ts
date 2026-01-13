
import { NextResponse, NextRequest } from "next/server" 
import prisma from "@/libs/prisma"

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");

    if (!restaurantId) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: parseInt(restaurantId) 
            }
        })

        if (!restaurant) {
            return NextResponse.json({ message: "Restaurant not found" }, { status: 404 })
        }

        // Importante: Verifique se o seu frontend espera { restaurant } ou apenas o objeto
        return NextResponse.json(restaurant, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}