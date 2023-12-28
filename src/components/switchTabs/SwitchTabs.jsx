import React, { useState } from 'react'
import './style.scss'
const SwitchTabs = ({ data, onTabChange }) => {

    //* การทำ animation ปุ่ม tab

    // ตำแหน่ง
    const [selectedTab, setSelectedTab] = useState(0)

    // การเคลื่อนไหว
    const [left, setLeft] = useState(0)


    const activeTab = (tab, index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300)
        onTabChange(tab, index)
    }

    return (
        <div className='switchingTabs'>
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

export default SwitchTabs