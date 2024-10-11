"use client"; // Client Component로 설정
import loading_page from "@/public/Image/loading_image.png";
import Image from "next/image";
import Glass from "@/public/Image/glass.png";
import Ball from "@/public/Image/ball.png";
import { pretendard_Bold ,pretendard_medium,pretendard_semiBold} from "@/app/font";
import "./style.css";
import { useSearchParams } from 'next/navigation';
import counrtys_player from "@/app/data/country";
import { useEffect, useState } from 'react';
import players from "@/app/data/player";
import depencer from "@/app/data/depencer";


function change_ko(name) {
    let counrty;
    if (name === "england") {
        counrty = '잉글랜드';
    } else if (name === "france") {
        counrty = '프랑스';
    } else if (name === "germany") {
        counrty = '독일';
    } else {
        counrty = '외국';
    }
    return counrty;
}


function change_color(name) {
    let colors;
    if (name === "잉글랜드") {
        colors = '#FF7272';
    } else if (name === "프랑스") {
        colors = '#2F80F2';
    } else if (name === "독일") {
        colors = '#F0F93E';
    } else {
        colors = 'white';
    }
    return colors;
}

function change_image(name) {
    if (players.has(name)) {
        return players.get(name)[1]; // 해당 키가 있을 경우 두 번째 이미지 반환
    }
    return null; // 키가 없을 경우 null 반환
}

export default function FieldPage() {
    const searchParams = useSearchParams();
    const name = searchParams.get('selected_country');
    const selected_player = searchParams.get('selected_player');
    const [enumyplayer, setenumyplayer] = useState(null);;
    // enumyCountry 상태와 setter 함수 정의
    const [enumyCountry, setEnumyCountry] = useState(null);
    const [my_score, setmy_score] = useState(0);
    const [enumy_score, setenumy_score] = useState(0);
    const [chance, setchance] = useState(0);

    const move_chance = () => {
        const chances=Math.floor(Math.random() * 3)+3;
        setchance(chances);
    }

    function select_country(counrty) {
        let randomNumber = Math.floor(Math.random() * counrtys_player.length); // country의 길이에 맞춰 랜덤 생성
        
        // 같은 나라가 선택될 경우 랜덤 숫자를 다시 생성
        while (counrtys_player[randomNumber] ==counrty) {
            randomNumber = Math.floor(Math.random() * counrtys_player.length);
        }

        return counrtys_player[randomNumber][0]; // key 값 반환
    }

    useEffect(() => {
        move_chance();
        setmy_score(0);
        setenumy_score(0);
    }, []);

    useEffect(() => {
        if (name) {
            const selectedCountry = select_country(change_ko(name)); // 적국 선택
            setEnumyCountry(selectedCountry); // 상태 업데이트
            
            // 적국의 선수 이미지 가져오기
            if (depencer.has(selectedCountry)) {
                setenumyplayer(depencer.get(selectedCountry)); // 해당 선수 정보 가져오기
            }
        }
    }, [name]);

    return (
        <>
            <div className="w-screen h-screen ">
                <Image
                    src={Glass}
                    alt="Glass"
                    layout="fill"
                    objectFit="fill"
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                />
                <div className="top_bar flex">
                    <div className="score_box1" style={{ backgroundColor: change_color(change_ko(name)) }}>
                        <p className={`p_country ${pretendard_Bold.className}`} style={{textShadow:"-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black"}}>
                            {change_ko(name)}
                        </p>
                    </div>
                    <div className="score_bar" style={{ background: `linear-gradient(84deg, ${change_color(change_ko(name))} 16.54%, ${change_color(enumyCountry)} 99.24%)`}}>
                        <p className={`p_country ${pretendard_Bold.className} `} style={{textShadow:"-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black",}}>
                            {my_score} VS {enumy_score}
                        </p>
                    </div>
                    <div className="score_box2" style={{ backgroundColor: change_color(enumyCountry) }}>
                        <p className={`p_country ${pretendard_Bold.className}`} style={{textShadow:"-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black"}}>
                            {enumyCountry}
                        </p>
                    </div>
                </div>
                <div>
                    <Image
                        src={change_image(selected_player)}
                        alt="player_user"
                        className="my_players"
                        style={{
                            pointerEvents: "none",
                            userSelect: "none",
                            userDrag: "none",
                            objectFit: "contain",
                        }}
                    />
                    <div className={`my_nametag ${pretendard_medium.className}`} style={{ backgroundColor: change_color(change_ko(name))}}>
                        <p>{selected_player}</p>
                    </div>
                </div>
                
                {enumyplayer && (
                    <>
                        <Image
                            src={enumyplayer[1]} // 적국 선수의 이미지
                            alt={enumyplayer[0]} // 적국 선수 이름
                            className="enumy_players"
                            style={{
                                pointerEvents: "none",
                                userSelect: "none",
                                userDrag: "none",
                                objectFit: "contain",
                            }}
                        />
                        <div className={`enumy_nametag ${pretendard_medium.className}`} style={{ backgroundColor: change_color(enumyCountry)}}>
                             <p>{enumyplayer[0]}</p>
                        </div>
                    </>
                    
                    
                )}
                <Image
                    src={Ball} // 적국 선수의 이미지
                    className="ball"
                    style={{
                        pointerEvents: "none",
                        userSelect: "none",
                        userDrag: "none",
                        objectFit: "contain",
                    }}
                />
                <div className="boxes">
                    <div className="flex ">
                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{ backgroundColor: '#FF0000' ,marginBottom:'12px', marginRight:'8px'}}>개인기</div>
                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{ backgroundColor: '#11FF00' ,marginBottom:'12px', marginRight:'8px'}}>드리블</div>
                    </div>
                    <div className="flex">
                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{ backgroundColor: '#2F80F2' ,marginRight:'8px'}}>패스</div>
                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{ backgroundColor: '#BC36FF' , marginRight:'8px'}}>스탯 보기</div>
                    </div>
                </div>

            </div>
        </>
    );

}
