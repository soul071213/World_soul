"use client";
import { useEffect, useState } from 'react';
import "./style.css";
import { pretendard_Bold, pretendard_medium, Pretendard_Regular } from "@/app/font";
import Ball from "@/public/Image/ball.png";
import Image from "next/image";
import attack_state from "@/app/data/attack_state";
import depencer_state from "@/app/data/depencer_state";

function SkillModals({ isOpen, onClose, my_name, enumy_name, skills, change_success, fail_change_success, change_keeper }) {
    const [my_playerState, setmy_playerState] = useState(null); // 적 스탯
    const [enemy_playerState, setenemy_playerState] = useState(null); // 나의 스탯

    const [success_or_fail, setsuccess_or_fail] = useState("");
    const [is_string, setis_string] = useState(false);
    const [number, setNumber] = useState(1); // 돌림판 값
    const [count, setCount] = useState(0);
    const [success, setsuscccess] = useState();

    useEffect(() => {
        let state = Array.from(attack_state.entries()).find(([name]) => name === my_name);
        if (state) {
            setmy_playerState(state[1]); // 상태 업데이트
        }
    }, [my_name]);

    useEffect(() => {
        let state = Array.from(depencer_state.entries()).find(([name]) => name === enumy_name);
        if (state) {
            setenemy_playerState(state[1]); // 상태 업데이트
        }
    }, [enumy_name]);

    useEffect(() => {
        if (isOpen) {
            setCount(0); // 모달이 열릴 때 count를 0으로 초기화
        }
        setsuccess_or_fail("");
        setis_string(false);
        setsuscccess();
    }, [isOpen]);

    useEffect(() => {
        if (count < 30) {
            const interval = setInterval(() => {
                setNumber(Math.floor(Math.random() * 6) + 1); // 1~6의 난수 생성
                setCount((prevCount) => prevCount + 1); // count 증가
            }, 35); // 0.35초마다 실행

            return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
        } else {
            if (my_playerState && enemy_playerState) {
                const skillNumber = skills === 1
                    ? turn_skill(my_playerState, enemy_playerState)
                    : dirbble_skill(my_playerState, enemy_playerState);
                setNumber(skillNumber); // 스킬 숫자 설정
                if (skillNumber >= 4) {
                    setsuccess_or_fail("Success");
                    setis_string(true);
                    setsuscccess(true);
                    if (isOpen) {
                        change_keeper();
                        change_success();
                    }
                } else {
                    setsuccess_or_fail("Fail");
                    setis_string(true);
                    setsuscccess(false);
                    fail_change_success();
                }
            }
        }
    }, [count]);

    function turn_skill(my_playerState, enemy_playerState) {
        let score = my_playerState[0] + (my_playerState[1] * 2) + (my_playerState[2] * 3) + my_playerState[3] -
            (enemy_playerState[0] + enemy_playerState[1] * 2 + enemy_playerState[2] + enemy_playerState[3]);

        let successProbability = Math.min(90, Math.max(10, score + 50)); // 확률이 너무 극단적이지 않도록 10~90% 범위

        let randomRoll = Math.random() * 100;

        if (randomRoll < successProbability) {
            return Math.floor(Math.random() * 3) + 4;
        } else {
            return Math.floor(Math.random() * 3) + 1;
        }
    }

    function dirbble_skill(my_playerState, enemy_playerState) {
        let score = (my_playerState[0] * 2) + (my_playerState[1] * 3) + my_playerState[2] + (my_playerState[3] * 2) -
            (enemy_playerState[0] * 2 + enemy_playerState[1] + enemy_playerState[2] + enemy_playerState[3] * 2);

        let successProbability = Math.min(90, Math.max(10, score + 50));

        let randomRoll = Math.random() * 100;

        if (randomRoll < successProbability) {
            return Math.floor(Math.random() * 3) + 4;
        } else {
            return Math.floor(Math.random() * 3) + 1;
        }
    }

    return (
        <>
            {isOpen ?
                <>
                    <div>
                        <div className="modal-overlay">
                            <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                                <p className={`success ${pretendard_Bold.className}`} style={success ? { color: '#0048FF' } : { color: '#FF0000' }}>
                                    {success_or_fail}
                                </p>
                                <p className={`text_success ${Pretendard_Regular.className}`}>4 이상이면 성공합니다.</p>
                                <p className={`number ${pretendard_Bold.className}`}>
                                    {number}
                                </p>
                                <Image
                                    src={Ball}
                                    alt="ball"
                                    className="ball_card"
                                    style={{
                                        pointerEvents: "none",
                                        userSelect: "none",
                                        userDrag: "none",
                                        objectFit: "contain",
                                    }}
                                />
                                {is_string ? <><p className={`check_card ${pretendard_medium.className}`} onClick={() => { onClose(); }}>확인</p></> : <></>}
                            </div>
                        </div>
                    </div>
                </> : null}
        </>
    );
}

export default SkillModals;
