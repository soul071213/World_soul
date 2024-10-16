'use client';
import Image from "next/image";
import First_back from "@/public/Image/first_back.png";
import Link from "next/link";
import { Pretendard_Regular, pretendard_medium } from "@/app/font";
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import "./style.css";

    export default function First_page() {
        const [rankings, setRankings] = useState([]);
        const [open_ranking,set_open_ranking]=useState(false);

        useEffect(() => {
            const fetchRankings = async () => {
                const rankingsCollection = collection(db, 'rankings');
                const rankingDocs = await getDocs(rankingsCollection);
                const rankingsData = rankingDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // 포인트 기준으로 정렬
                rankingsData.sort((a, b) => b.points - a.points);
                setRankings(rankingsData);
            };

            fetchRankings();
        }, []);

        return (
            <>
                <div className="w-screen h-screen">
                    <Image 
                        src={First_back} 
                        alt="first_back" 
                        layout="fill" 
                        objectFit="cover" 
                        style={{ pointerEvents: 'none', userSelect: 'none', userDrag: 'none', zIndex: '-1' }}
                    />
                    {open_ranking?
                    <>
                        <div className="ranking_bar">
                            <p className={`top ${pretendard_medium.className}`}>랭킹</p>
                            <div className="top-bit">
                                {rankings.map(ranking => (
                                    <div key={ranking.id} className="top-bar">
                                        <p className={`${Pretendard_Regular.className}`}>{ranking.name}</p>
                                        <p className={`${Pretendard_Regular.className}`}>{ranking.points}p</p>
                                    </div>
                                ))}
                            </div>
                            <p  className={`top ${pretendard_medium.className}`} onClick={()=>{set_open_ranking(false)}}>확인</p>
                        </div>
                    </>
                    :
                    null}
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
                        <Link href={'/pages/player'} style={{ textDecoration: "none", marginTop: 'calc(608 / 1080 * 100vh)' }}>
                            <p className={pretendard_medium.className} style={{ fontSize: '64px', color: 'black' }}>START</p>
                        </Link>
                        <a className={pretendard_medium.className} style={{ fontSize: '64px', color: 'black', textDecoration: 'none' }} onClick={()=>{set_open_ranking(true)}}>Rank</a>
                    </div>
                </div>
            </>
        );
    }
