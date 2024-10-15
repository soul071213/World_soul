"use client";
import { useEffect, useState } from 'react';
import "./style.css";
import { pretendard_Bold, pretendard_medium, Pretendard_Regular } from "@/app/font";
import Image from "next/image";
import country_player from "@/app/data/country_playes_image";

function PassModal({ isOpen, onClose, my_name, my_country,change_player }) {
    return (
        <>
        {isOpen ? (
            <div>
                <div className="modal-overlay">
                    <div className='pass_cards' onClick={(e) => e.stopPropagation()}>
                    {Array.from(country_player.entries()).map(([players_name, players_state]) => {
                        return (
                            <div key={players_name}>
                                {players_name !== my_name && players_state[0] === my_country ? (
                                    <div className='pass_selected_card' 
                                    onClick={()=>{
                                        change_player(players_name); 
                                        onClose();
                                    }}
                                    >
                                        <Image
                                            className="pass_selected_card"
                                            src={players_state[1]}
                                            alt={players_state[0]}
                                            style={{
                                                pointerEvents: "none",
                                                userSelect: "none",
                                                userDrag: "none",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        ) : null}
        </>
    );
}

export default PassModal;
