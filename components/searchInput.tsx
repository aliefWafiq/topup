"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

const SearchInput = () => {
    const [isTyping, setIsTyping] = useState(false);

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }, 300);

    return (
    <>
        <div className="relative flex flex-1 flex-shrink-0 mt-12 w-full">
                <InputGroup>
                    <InputGroupInput 
                        placeholder="Search..." 
                        defaultValue={searchParams.get("query"?.toString()) ?? ""}
                        onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    />
                    <InputGroupAddon>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className=""
                        />
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </>
    );
};

export default SearchInput;
