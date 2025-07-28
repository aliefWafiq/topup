import prisma from "@/lib/prisma"

export const getGames = async () => {
    try{
        if (!prisma) {
            throw new Error("Prisma client is not initialized")
        }
        const result = await prisma.game.findMany()

        const plainGames = result.map(game => ({
            ...game,
        }))
        return plainGames
    }catch(error){
        throw new Error("failed to fetch data")
    }
}