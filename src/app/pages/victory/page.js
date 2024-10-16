"use client"; // Client Component로 설정
import Image from "next/image";
import { Pretendard_Regular, pretendard_Bold ,pretendard_medium } from "@/app/font";
import "./style.css";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import lose from "@/public/Image/lose.png";
import victorys from "@/public/Image/Vitory_back.png";
import Link from "next/link";
import { db } from '../../firebase'; 
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const updateRanking = async (name, points) => {
    const userRef = doc(db, 'rankings', name); 

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        await updateDoc(userRef, {
            points: docSnap.data().points + points,
        });
    } else {
        await setDoc(userRef, {
            name,
            points,
        });
    }
};

export default function Victory() {
    const searchParams = useSearchParams();
    const points = searchParams.get('points');
    const victory_state = searchParams.get('victory_state');
    const final_points = parseInt(points, 10) + 3;

    const [username, setUsername] = useState(''); // 사용자 이름 상태 추가

    const handleRankUpdate = async () => {
        if (username) { // 사용자가 이름을 입력했는지 확인
            await updateRanking(username, final_points);
        } else {
            alert("닉네임을 입력해 주세요.");
        }
    };

    return (
        <div className="w-screen h-screen">
            {victory_state === "true" ? (
                <>
                    <Image 
                        src={victorys} 
                        alt="first_back" 
                        layout="fill" 
                        objectFit="cover" 
                        style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                    />
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="box">
                            <div>
                                <p className={`${pretendard_medium.className}`}>승리하셨습니다.</p>
                                <p className={`${pretendard_medium.className}`}>{final_points}p 획득</p>
                            </div>
                            <div>
                                <input 
                                    className={`${Pretendard_Regular.className}`} 
                                    type="text" 
                                    name="username" 
                                    placeholder="닉네임을 입력해주세요."
                                    value={username} // 상태 값으로 설정
                                    onChange={(e) => setUsername(e.target.value)} // 입력값 업데이트
                                />
                            </div>
                            <Link href={{ pathname: "/", }}>
                                <div onClick={handleRankUpdate}>
                                    <p className={`checkin ${pretendard_medium.className}`}>확인</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Image 
                        src={lose} 
                        alt="first_back" 
                        layout="fill" 
                        objectFit="cover" 
                        style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                    />
                    <p className={`lose ${pretendard_Bold.className}`}>패배하셨습니다.</p>
                    <Link href={{ pathname: "/", }}>
                        <div className="check_box">
                            <p className={`check ${pretendard_medium.className}`}>확인</p>
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
}
