import connectToDB from "@/database";
import Account from "@/models/Account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function POST(req) {
    try {
        await connectToDB();
        const {name, pin, uid} = await req.json();

        const isAccountAlreadyExists = await Account.find({uid, name})

        const allAccounts = await Account.find({})

        if (isAccountAlreadyExists && isAccountAlreadyExists > 0) {
            return NextResponse.json({
                success: false,
                message: 'Please try with another name'
            });
        }

        if (allAccounts && allAccounts.length === 4) {
            return NextResponse.json({
                success: false,
                message: 'You can only create a maximum of 4 accounts'
            });
        }

        const hashPin = await hash(pin, 12)

        const newlyCreatedAccount = await Account.create({
            name, pin : hashPin, uid,
        });

        if (newlyCreatedAccount) {
            return NextResponse.json({
                success: true,
                message: 'Your Account Has Been Successfully Created!!'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Something Went Wrong!!'
            });
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: 'Something Went Wrong'
        })
    }
}