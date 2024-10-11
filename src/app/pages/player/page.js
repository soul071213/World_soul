import Image from "next/image";
import back from "@/public/Image/back.png";
import Link from "next/link";
import { pretendard_Bold } from "@/app/font";
import Player from "@/public/Image/player.png";
import "./style.css";
import players from "@/app/data/player";

function switching_name(name){
    let country;
    if (name === '해리 케인' || name === '필 포든' || name === '사카') {
        country = "england";
    } else if (name === '음바페' || name === '지루' || name === '튀랑') {
        country = "france"; 
    } else if (name === '하베르츠' || name === '비르츠' || name === '퓔크루크') {
        country = "germany";
    } else {
        country = "other";
    }
    return country;
}
export default function First_page() {
    return (
        <>
            <div className="w-screen h-screen">
                <Image
                    src={back}
                    alt="first_back"
                    layout="fill"
                    objectFit="cover"
                    style={{ pointerEvents: "none", userSelect: "none", userDrag: "none", zIndex: "-1" }}
                />
                <Image
                    className="player_bar"
                    src={Player}
                    alt="player"
                    objectFit="contain"
                    style={{ pointerEvents: "none", userSelect: "none", userDrag: "none" }}
                />
                <div className="players flex">
                    {Array.from(players.entries()).map(([name, image], index) => {
                        // Set color based on index range
                        let textColor;
                        if (index >= 0 && index < 3) {
                            textColor = "#C93030"; // 1~3번째
                        } else if (index >= 3 && index < 6) {
                            textColor = "#1676FF"; // 4~6번째1676FF
                        } else if (index >= 6 && index < 9) {
                            textColor = "#CDD438"; // 7~9번째
                        } else {
                            textColor = "#000000"; // 기타
                        }

                        return (
                            <div className="player_card" key={name}>
                                <p
                                    style={{
                                        color: textColor, // apply color based on index range
                                        fontSize: "40px",
                                        paddingBottom: "10px",
                                        textShadow:"-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black"
                                    }}
                                    className={pretendard_Bold.className}
                                >
                                    {name}
                                </p>
                                <Link href={{ pathname: "/pages/field",query:{selected_country:switching_name(name),selected_player:(name)} }}>
                                    <div className="player_card_image">
                                        <Image
                                            className="block"
                                            src={image[0]}
                                            alt={name}
                                            style={{
                                                pointerEvents: "none",
                                                userSelect: "none",
                                                userDrag: "none",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
