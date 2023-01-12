import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import basic from './basic.module.css';
// import img from '../img.module.js';
import Axios from "axios";
export default function Basic(props) {

    // 假設目前查詢 會員id=1 球隊id=1
    const [userid, setUserid] = useState('1');
    const [teamid, setTeamid] = useState('1');

    // team img src
    const [teamimg, setTeamimg] = useState('');
    
    // 資料庫查詢結果
    const [basicResult,setBasicResult] = useState(null);

    // 將資料放入basicResult
    const handleBasicResult = async () => {
        let res = await Axios.post("http://localhost:3001/teambasic",{
            userid: userid,
            teamid: teamid
        });
        setBasicResult(res.data[0]);
        // 照片格式轉換
        const u8Arr = new Uint8Array(res.data[0].teamimg.data);
        const blob = new Blob([u8Arr],{type:"image/jpeg"});
        const fr = new FileReader
        fr.onload = function () {
            setTeamimg(fr.result);
            };
        fr.readAsDataURL(blob);
    };

    // 當畫面載入 抓資料庫
    useEffect(()=>{
        handleBasicResult();
    },[]);

    return(
        <>
            <div className={basic.basic}>
                {/* <button onClick={handleBasicResult}>顯示資料</button> */}
                {/* 只有隊長可以編輯 */}
                <Link to={`/gosport/user/myteam/basic/edit`}>編輯</Link>
                {/* 基本資料 */}
                <div className={basic.mBigTitle}>{basicResult? basicResult.tname:''}</div>

                <div className={basic.mTitle}>場館</div>
                <div className={basic.mText}>{basicResult? basicResult.sidename:''}</div>

                <div className={basic.mTitle}>縣市</div>
                <div className={basic.mText}>{basicResult? basicResult.county:''}</div>

                <div className={basic.mTitle}>區域</div>
                <div className={basic.mText}>{basicResult? basicResult.area:''}</div>

                <div className={basic.mTitle}>週期</div>
                <div className={basic.mText}>{basicResult? basicResult.week:''}</div>

                <div className={basic.mTitle}>時段</div>
                <div className={basic.mText}>{`${basicResult? basicResult.starttime:''}:00-${basicResult? basicResult.endtime:''}:00`}</div>

                <div className={basic.mTitle}>程度</div>
                <div className={basic.mText}>{basicResult? basicResult.level:''}</div>

                <div className={basic.mTitle}>零打費用</div>
                <div className={basic.mText}>{basicResult? basicResult.fee:''}</div>

                <div className={basic.mTitle}>描述</div>
                <div className={basic.mText}>{basicResult? basicResult.text:''}</div>

                <div><img src={teamimg} className={basic.mBimg} alt='團隊的照片'/></div>
            </div>
        </>
    )
};