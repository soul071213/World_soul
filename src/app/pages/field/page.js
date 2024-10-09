import Image from "next/image";
import Glass from "@/public/Image/glass.png"
import Link from "next/link";
import { pretendard_medium } from "@/app/font";

export default function field_page(){
    return(
        <>
            <div className="w-screen h-screen ">
                <Image 
                    src={Glass} 
                    alt="Glass" 
                    layout="fill" 
                    objectFit="fill" 
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                />
            </div>
        </>
    )
}
