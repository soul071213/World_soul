"use client"; // Client Component로 설정
import Image from "next/image";
import Glass from "@/public/Image/glass.png";
import Ball from "@/public/Image/ball.png";
import { pretendard_Bold ,pretendard_medium,pretendard_semiBold} from "@/app/font";
import "./style.css";
import { useSearchParams,useRouter } from 'next/navigation';
import counrtys_player from "@/app/data/country";
import { useEffect, useState } from 'react';
import players from "@/app/data/player";
import depencer from "@/app/data/depencer";
import StatePage from "./seestat";
import Skill_modal from "@/app/pages/field/skill_modals"
import Pass_modal from "@/app/pages/field/pass_modal"
import keeper from "@/app/data/keeper"
import attack_state from "@/app/data/attack_state";
import Homerun from "@/public/Image/home_run.png"
import Score from "@/public/Image/score.png"
import loading_page from "@/public/Image/loading_image.png";

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
    const name = searchParams.get('selected_country'); //내 국가 영이름
    const selected = searchParams.get('selected_player'); //내 선수 
    const [enumyplayer, setenumyplayer] = useState(null); //적대 선수  [0]선수 국가 [1] 선수 이름
    // enumyCountry 상태와 setter 함수 정의
    const [selected_player, setselected_player] = useState(selected);
    const [enumyCountry, setEnumyCountry] = useState(null); //적대 국가
    const [my_score, setmy_score] = useState(0); // 나의 스코어
    const [enumy_score, setenumy_score] = useState(0); // 상대 스코어
    const [chance, setchance] = useState(0); //행동 횟수
    const [SeeStats,setSeestate] = useState(false); //스탯 보기 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passisModalOpen, setpassIsModalOpen] = useState(false);
    const [chancestate, setchancestate] = useState(false);
    const [what_skill,setwhat_skill]=useState(0);
    const [dischance,setdischance]=useState(0); //다음 찬스
    const [skill_success,setskillsuccess]=useState(false); //스킬 성공 여부
    const [goal_fail_sucess,setgoal_fail_sucess]=useState(false); //슛팅 성공 여부
    const [goal_try,setgoal_try]=useState(false); //슛팅 시도 여부
    const [enemy_playerState, setenemy_playerState] = useState(0); //나의 스탯
    const router = useRouter();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const passopenModal = () => {
        setpassIsModalOpen(true);
    };

    const passcloseModal = () => {
        setpassIsModalOpen(false);
    };
    function SeeStat_change(){
        setSeestate(!SeeStats);
    }
    function change_success(){
        setskillsuccess(true);
    }
    function fail_change_success(){
        setskillsuccess(false);
    }
    function select_country(counrty) {
        let randomNumber = Math.floor(Math.random() * counrtys_player.length); // country의 길이에 맞춰 랜덤 생성
        
        // 같은 나라가 선택될 경우 랜덤 숫자를 다시 생성
        while (counrtys_player[randomNumber] ==counrty) {
            randomNumber = Math.floor(Math.random() * counrtys_player.length);
        }

        return counrtys_player[randomNumber][0]; // key 값 반환
    }
    function change_keeper(){
        if (keeper.has(enumyCountry)) {
            setenumyplayer(keeper.get(enumyCountry)); // 해당 선수 정보 가져오기
        }
    }

    function discount() {
        if (chance > 0) {
            setchance(chance - 1);
        }
    }

    function move_chance(){
        if(chancestate===false){
            const chances=Math.floor(Math.random() * 4)+2;
            setchance(chances);
            setdischance(chances);
            setchancestate(true);
        }
    }

    useEffect(() => {
        // chance가 0이 되었을 때 로직 추가
        if (chance === 0 && chancestate === true ) {
            if (dischance === 0) {
                const point = my_score - enumy_score;
                if (my_score > enumy_score ) {
                    router.push(`/pages/victory?points=${point}&victory_state=true`);
                } else if (my_score < enumy_score || my_score === enumy_score) {
                    router.push(`/pages/victory?points=${point}&victory_state=false`);
                }         
            }
            setenumy_score(enumy_score + 1); // 상대 스코어 증가

            setdischance(dischance - 1);
            
             // 다음 찬스 횟수 줄이기
            setchance(dischance); // chancestate 유지 후 chance 업데이트
    

        }
    }, [chance]);
    
    useEffect(() => {
        move_chance();
        setmy_score(0);
        setenumy_score(0);
    }, []);
    

    // useEffect(() => {
    //     console.log(SeeStats);
    // }, [SeeStats]);
    function select_depencer(selectedCountry){
        if (depencer.has(selectedCountry)) {
            setenumyplayer(depencer.get(selectedCountry)); // 해당 선수 정보 가져오기
        }
    }

    useEffect(() => {
        if (name) {
            const selectedCountry = select_country(change_ko(name)); // 적국 선택
            setEnumyCountry(selectedCountry); // 상태 업데이트
            
            // 적국의 선수 이미지 가져오기
            select_depencer(selectedCountry);
        }
    }, [name]);

    function pass_change_player(players_name){
        setselected_player(players_name);
    }

    function mystate() {
        const state = Array.from(attack_state.entries()).find(([names]) => names === selected_player);
        if (state) {
            setenemy_playerState(state[1][4]); // 상태 업데이트
        }
    }
    
    useEffect(() => {
        mystate();  // 상태 업데이트
    }, [selected_player]);

    function shooting() {
        const random_number = Math.floor(Math.random() * 100);
        
        // enemy_playerState가 업데이트 된 후에만 실행
        if (random_number >100-enemy_playerState * 10) {
            setgoal_fail_sucess(true);
            setgoal_try(true);
            setmy_score(my_score+1);
        } else {
            setgoal_fail_sucess(false);
        }
        setskillsuccess(false);
        setTimeout(()=>{
            setgoal_try(false);
        },2000);
        if(dischance!==1 || dischance!==0 || dischance<0===false){
            setdischance(dischance - 1);
        }
        setchance(dischance);
        select_depencer(enumyCountry);
    }
    
    
    return (
        <Suspense fallback={            <Image
            src={loading_page}
            alt="Glass"
            layout="fill"
            objectFit="fill"
            style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
        />}>
            <>
        
        <div className="w-screen h-screen ">
            {goal_try?
            <>
            {goal_fail_sucess?
                <>
                <Image
                    src={Score}
                    alt="Score"
                    layout="fill"
                    objectFit="fill"
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                />
                </>:
                <>
                <Image
                    src={Homerun}
                    alt="Homerun"
                    layout="fill"
                    objectFit="fill"
                    style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                />
                </>}
                
            </>:
            <>
            <Skill_modal 
                isOpen={isModalOpen} 
                onClose={closeModal}  
                my_name={selected_player} 
                enumy_name={enumyplayer ? enumyplayer[0] : ''}  // null 체크 후 접근
                skills={what_skill}
                change_success={change_success}
                fail_change_success={fail_change_success}
                change_keeper={change_keeper}
            />
            <Pass_modal  isOpen={passisModalOpen} onClose={passcloseModal} my_name={selected_player} my_country={change_ko(name) } change_player={pass_change_player} ></Pass_modal>
            <Image
                src={Glass}
                alt="Glass"
                layout="fill"
                objectFit="fill"
                style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
            />
            <div className="top_bar flex w-full">
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
            <div className="chance">
                <p className={`${pretendard_Bold.className}`}>행동 횟수 : {chance}</p>
            </div>
                <>
                    <>
                        {SeeStats ? 
                        <>
                            <StatePage my_name={selected_player} enumy_name={enumyplayer[0]} close={SeeStat_change} ></StatePage>
                        </>:
                        <>
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
                                src={Ball} 
                                alt="ball"
                                className="ball"
                                style={{
                                    pointerEvents: "none",
                                    userSelect: "none",
                                    userDrag: "none",
                                    objectFit: "contain",
                                }}
                            />
                            {skill_success?
                            <>
                               <div className="shoot_box" onClick={shooting}>
                                    <p className={`${pretendard_semiBold.className}`}>슈팅하기</p>
                                </div>
                            </>:
                            <>
                                <div className="boxes">
                                    <div className="flex ">
                                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{ marginBottom:'12px', marginRight:'8px'}} onClick={() => {openModal(); setwhat_skill(1); discount();}}>개인기</div>
                                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{  marginBottom:'12px', marginRight:'8px'}} onClick={() => {openModal(); setwhat_skill(2); discount();}}>드리블</div>
                                    </div>
                                    <div className="flex">
                                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{ marginRight:'8px'}} onClick={() => {passopenModal(); discount();}}>패스</div>
                                        <div className={`skill_box ${pretendard_semiBold.className}`} style={{  marginRight:'8px'}} onClick={() => {SeeStat_change(); discount();}}>스탯 보기</div>
                                    </div>
                                </div>
                            </>}
                        </>
                        }
                    </>
                </>
            </>}
            
        </div>
    </>

        </Suspense>
        
    );

}
