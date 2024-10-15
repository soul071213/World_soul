"use client"; // Client Component로 설정
import { useEffect, useState } from 'react';
import attack_state from "@/app/data/attack_state";
import depencer_state from "@/app/data/depencer_state";
import { pretendard_Bold, pretendard_medium, } from "@/app/font";
import "./style.css";

export default function SeeStat({ my_name, enumy_name, close}) {
    const [my_playerState, setmy_playerState] = useState(null);
    const [enemy_playerState, setenemy_playerState] = useState(null);
    const [count, setCount] = useState(10);
    useEffect(() => {
        setmystate();
        enumymystate();
    }, [my_name, enumy_name]); // my_name과 enumy_name의 변화를 감지

    useEffect(() => {
        if (count === 0) {
            close();
            return;
        }
    
        const timerId = setInterval(() => {
          setCount(prevCount => prevCount - 1);
        }, 1000); // 1초마다 카운트를 줄임
    
        return () => clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 정리
      }, [count]);

    function setmystate() {
        const state = Array.from(attack_state.entries()).find(([name]) => name === my_name);
        if (state) {
            setmy_playerState(state[1]); // 상태 업데이트
        }
    }

    function enumymystate() {
        const state = Array.from(depencer_state.entries()).find(([name]) => name === enumy_name);
        if (state) {
            setenemy_playerState(state[1]); // 상태 업데이트
        }
    }

    return (
        <div className="flex state_div">
            <div className="my_state">
                <p className={`stat_title ${pretendard_medium.className}`}>{my_name}</p>
                <div className="my_statuss flex">
                    <div>
                        <p className={`${pretendard_medium.className}`}>주력</p>
                        <p className={`${pretendard_medium.className}`}>드리블</p>
                        <p className={`${pretendard_medium.className}`}>개인기</p>
                        <p className={`${pretendard_medium.className}`}>피지컬</p>
                        <p className={`${pretendard_medium.className}`}>슛팅</p>
                    </div>
                    <div>
                        <p className={`${pretendard_medium.className}`}>{my_playerState ? my_playerState[0] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{my_playerState ? my_playerState[1] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{my_playerState ? my_playerState[2] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{my_playerState ? my_playerState[3] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{my_playerState ? my_playerState[4] : ''}</p>
                    </div>
                </div>
            </div>
            <div className="time_stat">
                <p className={`timer_count ${pretendard_Bold.className}`}>{count}</p>
                <div className={`check ${pretendard_medium.className}`} onClick={()=>close()}>확인</div>
            </div>
            <div className="enumy_state">
                <p className={`stat_title ${pretendard_medium.className}`}>{enumy_name}</p>
                <div className="enumy_states flex">
                    <div>
                        <p className={`${pretendard_medium.className}`}>주력</p>
                        <p className={`${pretendard_medium.className}`}>태클</p>
                        <p className={`${pretendard_medium.className}`}>피지컬</p>
                        <p className={`${pretendard_medium.className}`}>반응속도</p>
                    </div>
                    <div>
                        <p className={`${pretendard_medium.className}`}>{enemy_playerState ? enemy_playerState[0] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{enemy_playerState ? enemy_playerState[1] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{enemy_playerState ? enemy_playerState[2] : ''}</p>
                        <p className={`${pretendard_medium.className}`}>{enemy_playerState ? enemy_playerState[3] : ''}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
