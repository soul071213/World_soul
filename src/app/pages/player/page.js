import Image from "next/image";
import back from "@/public/Image/back.png"
import Link from "next/link";
import { pretendard_Bold } from "@/app/font";
import Player from "@/public/Image/player.png"
import "./style.css"
import players from "@/app/data/player"

export default function First_page(){
    return(
        <>
            <div className="w-screen h-screen ">
                <Image 
                    src={back} 
                    alt="first_back" 
                    layout="fill" 
                    objectFit="cover" 
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                />
                <Image
                    className="player_bar"
                    src={Player} 
                    alt="player" 
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none'}}
                />
                <div className="players flex">
                    {Array.from(players.entries()).map(([name, image,numbers]) => (
                        <div className="player_card" key={name}>
                            <p style={{color:'white' ,fontSize:'40px' ,}}className={pretendard_Bold.className}>{name}</p>
                            <Link href={{pathname:'/pages/field'}}>
                                <Image
                                    className="player_card_image"
                                    src={image} 
                                    alt={name} // alt 속성에 선수 이름 추가
                                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', objectFit: 'contain' }}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
