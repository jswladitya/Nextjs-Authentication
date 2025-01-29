/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export const getDataFromToken = (request : NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        // PUTTING ! MEANS I KNOW DATA WILL COME HERE FROM ENV FILE

        return decodedToken.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}