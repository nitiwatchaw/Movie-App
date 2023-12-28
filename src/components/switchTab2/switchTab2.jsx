import React, { useState, useEffect } from 'react'
import './style.scss'
const SwitchTabs2 = ({ data, onTabChange }) => {

    //* การทำ animation ปุ่ม tab

    // ตำแหน่ง
    const [selectedTab, setSelectedTab] = useState(0)

    // การเคลื่อนไหว
    const [left, setLeft] = useState(0)

    const screenWidth = window.innerWidth;

    const activeTab = (tab, index) => {

        const leftValue = screenWidth >= 768 ? index * 400 : index * 200;

        setLeft(leftValue)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300)
        onTabChange(tab, index)
    }

    // เปลี่ยนระยะทางในการย้าย โดยทันทีเมื่อ resize window
    useEffect(() => {
        const updateLeftValue = () => {
            const screenWidth = window.innerWidth;
            const leftValue = screenWidth >= 768 ? selectedTab * 400 : selectedTab * 200;
            setLeft(leftValue);
        };
        window.addEventListener('resize', updateLeftValue);

        return () => {
            window.removeEventListener('resize', updateLeftValue);
        };
    }, [selectedTab]);

    return (
        <div className='switchingTabs2'>
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        onClick={() => { activeTab(tab, index) }}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}>
                        {tab}
                    </span>
                ))}
                <div className="movingBg" style={{ left: left }} ></div>
            </div>
        </div>
    )
}

export default SwitchTabs2