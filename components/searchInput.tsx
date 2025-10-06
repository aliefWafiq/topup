"use client"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"

const SearchInput = () => {
    const [isTyping, setIsTyping] = useState(false)

    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams)
        setIsTyping(value.trim() !== "")
        if(value){
            params.set('query', value)
        }else{
            params.delete('query')
        }
        replace(`${pathName}?${params.toString()}`, {scroll: false})
    }, 300)

    return (
        <>
            <div className="relative flex flex-1 flex-shrink-0 mt-12 w-full">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input 
                    type="text"
                    name="search"
                    placeholder="Search"
                    defaultValue={searchParams.get('query'?.toString()) ?? ""}
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                    className="block w-full rounded-l-xl border border-slate-300 bg-white py-3 pl-5 pr-12 text-sm placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50" 
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="text-3xl bg-slate-100 p-3 rounded-r-xl border-slate-300 border"
                    />
            </div>
        </>
    )
}

export default SearchInput