/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect() //here db connection done

export async function POST(request: NextRequest){
    const userId = await getDataFromToken(request)

    const user =  await User.findOne({_id: userId}).select("-password")

    if(!user){
        return NextResponse.json({error:"invalid token"}, {status:400})
    }

    return NextResponse.json({
        message: "User Found",
        data: user
    })
}