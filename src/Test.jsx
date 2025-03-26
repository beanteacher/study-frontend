import React from 'react';

function Test() {
    const name = 'react';
    const style = {
        color: 'aqua',
        backgroundColor: 'red',
        fontSize: 24,
        padding: '1rem'
    }
    return (
        <>
            <div style={style}>{name}</div>
            <div className="gray-box">Gray 색</div>
        </>
    )
}

export default Test;