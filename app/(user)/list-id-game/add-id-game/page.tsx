import React from 'react'
import ListGames from '@/components/ListGames'
import CardIdGame from '@/components/Card-id-game';
import SearchInput from "@/components/searchInput";

export const dynamic = "force-dynamic"

const PageAddIdgame = async({
    searchParams
}:{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const resolvedSearchParams = await searchParams
    const queryValue = resolvedSearchParams.query ?? ""
    const finalQuery = Array.isArray(queryValue) ? queryValue[0]:queryValue
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-32 px-8">
            <div className='bg-white w-1/2 rounded-lg p-5'>
                <div>Tambahkan Id Game</div>
                <SearchInput />
                <div>
                    <ListGames
                        query={finalQuery}
                        renderItem={(game) => <CardIdGame key={game.id} data={game} />}
                    />
                </div>
            </div>
        </div>
    )
}

export default PageAddIdgame