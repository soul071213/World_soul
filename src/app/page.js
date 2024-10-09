import Image from "next/image";
import First_back from "@/app/images/first_back.png"
import Link from "next/link";
import { pretendard_medium } from "@/app/font";

export default function First_page(){
    return(
        <>
            <div className="w-screen h-screen ">
                <Image 
                    src={First_back} 
                    alt="first_back" 
                    layout="fill" 
                    objectFit="cover" 
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                />
                <div style={{display: 'flex', alignItems: 'center', flexDirection:'column' , height: '100vh'}}>
                    <Link href={'/'} style={{ textDecoration: "none",marginTop:'calc(608 / 1080 * 100vh)',}}>
                        <p className={pretendard_medium.className} style={{fontSize:'64px',color:'black' ,}}>START</p>
                    </Link>
                    <a className={pretendard_medium.className} style={{fontSize:'64px',color:'black',textDecoration:'none'}} >Rank</a>
                </div>
            </div>
        </>
    )
}
