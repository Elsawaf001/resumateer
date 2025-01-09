"use server"

import prisma from "@/lib/prisma"

export const onLeadCreation = async (userId : string , title : string , content : string) => {
try {
    const lead = await prisma.lead.create({
        data : {
            title : title,
            content : content,
            userId : userId
        } ,
        select : {
            id : true ,
            title : true ,
            content: true ,
        }
    })
    return lead
} 
catch (error) {
    console.log(error)
    throw new Error("Failed to create lead")
    }
}
