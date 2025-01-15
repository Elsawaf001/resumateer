import { currentUser } from "@clerk/nextjs/server"
import { Environment, Paddle, Product } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"
const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN as string , {
    environment : Environment.sandbox
} )

export async function GET(req: Request){
    try {

        const user = await currentUser()
        if (!user) return new NextResponse('User not authenticated')
    
        const txn = await paddle.transactions.create({
            items : [{
                quantity : 1 , 
                price : {
                    name : "Adding 10000 to my Balance" ,
                    description : "this will add 10000 token to your balance" ,
                    unitPrice : {
                        currencyCode : "USD" ,
                        amount : "900"
                    } ,
                    product : {
                        name : "Adding 10000 to my Balance" ,
                        description : "this will add 10000 token to your balance" , 
                        taxCategory : "saas" ,
                    }
                }
    
            }]
        })
        

        return NextResponse.json({txn : txn.id})
    }
    catch (error) {
        console.log(error)
    }
}
  

