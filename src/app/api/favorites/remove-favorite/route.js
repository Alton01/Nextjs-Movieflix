import connectToDB from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function DELETE(req) {
    try {     
        await connectToDB();
    
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if(!id) {
            return NextResponse.json({
                success: false,
                message: 'Favorite Item ID is Unavailable!!'
            });
        }

        const deletedFavoriteItem = await Favorites.findByIdAndDelete(id)

        if (deletedFavoriteItem) {
            return NextResponse.json({
                success: true,
                message: ' Successfully Removed From Your List'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Something Went Wrong'
            })
        }



    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: 'Something Went Wrong'
        })
    }
}