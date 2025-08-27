import Image from "next/image"

export default function gameLoading(){
    return ( 
        <>
        <div className="flex items-center justify-center w-full h-screen absolute">
            <Image 
                src="/pompom.jpeg"
                alt="Loading..."
                width={120}
                height={120}
                priority
                className="loadingIcon"
            />
        </div>
        </>
    )
}