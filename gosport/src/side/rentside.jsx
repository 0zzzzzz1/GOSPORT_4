import React, { useState } from 'react';
import side from './rentside.module.css';
import cc from './sidee.module.css';
import arr from './icon/arrowup2.svg';
import ball from './icon/球類別.png';
import a1 from "./icon/方向 (3).png";
import a2 from "./icon/方向.png";
import a3 from "./icon/方向 (1).png";
import a4 from "./icon/方向 (2).png";
import a5 from "./icon/Group 41.png";
import a6 from './icon/Group.png';
import Axios from "axios";

const Rentside = () => {
    const [Taichung, setTaichung] = useState([
        "中區", "東區", "西區", "南區", "北區", "西屯區", "南屯區", "北屯區", "豐原區", "大里區", "太平區", "清水區", "沙鹿區", "大甲區", "東勢區", "梧棲區", "烏日區", "神岡區", "大肚區", "大雅區", "后里區", "霧峰區", "潭子區", "龍井區", "外埔區", "和平區", "石岡區", "大安區", "新社區"
    ]);
    const [time, settime] = useState([
        '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '0:00'
    ])
    // {time.map((val, key) => {
    //     return (<option key={key} value={key+1}>{val}</option>);
    // })}
    const [type,settype] =useState('羽球');
    const [starttime,setstarttime] =useState('');
    const [endtime,setendtime] =useState('');
    const [startdate,setstartdate] =useState('');
    const [enddate,setenddate] =useState('');
    const [peakstarttime,setpeakstarttime] =useState('');
    const [peakendtime,setpeakendtime] =useState('');
    const [county,setcounty] =useState('台中市');
    const [area,setarea] =useState('');
    const [park,setpark] =useState(false);
    const [bath,setbath] =useState(false);
    const [baulk,setbaulk] =useState(false);
    const [text,settext] =useState('%%');
    const [sidelist,setsidelist] =useState([]);
    const [userlist1, setuserlist1] = useState([]);
    const [userlist, setuserlist] = useState([]);
    const spark=()=>{
        setpark(!park);
    }
    const sbath=()=>{
        setbath(!bath);
    }
    const sbaulk=()=>{
        setbaulk(!baulk);
    }
    const search =()=>{
        console.log(type);
        console.log(starttime);
        console.log(endtime);
        console.log(startdate);
        console.log(enddate);
        console.log(county);
        console.log(area);
        console.log(text);
        Axios.post("http://localhost:3001/rentside", {
            type: type,
            starttime: starttime,
            endtime: endtime,
            startdate: startdate,
            enddate: enddate,
            county: county,
            area: area,
            text: text,
            park: park,
            bath: bath,
            baulk: baulk,
        }).then((response) => {
            console.log(response);
            setsidelist(response.data);
            for (let i = 0; i < response.data.length; i++) {
                var u8Arr = new Uint8Array(response.data[i].sideimg.data);
                var blob = new Blob([u8Arr], { type: "image/jpeg" });
                var fr = new FileReader;
                fr.readAsDataURL(blob);
                fr.onload = function (e) {
                    userlist1.push(e.target.result);
                };
            }
        });
        setuserlist(userlist1);
    }
    const [h1,seth1]=useState(false);
    const ee = (key) => {
        const time = setTimeout(()=>{seth1(true)},100);
        if(h1){
            return userlist1[key];
        }
    }
    const [sideedit,setsideedit]=useState([]);
    const more=(sideid)=>{
        Axios.post("http://localhost:3001/rentsideedit", {
            sideid: sideid,
        }).then((response) => {
            console.log(response);
            setsideedit(response.data);
            // for (let i = 0; i < response.data.length; i++) {
            //     var u8Arr = new Uint8Array(response.data[i].sideimg.data);
            //     var blob = new Blob([u8Arr], { type: "image/jpeg" });
            //     var fr = new FileReader;
            //     fr.readAsDataURL(blob);
            //     fr.onload = function (e) {
            //         userlist1.push(e.target.result);
            //     };
            // }
        });
    }
    const [a,seta]=useState(false);
    const aa =()=>{
        console.log('1');
        seta(!a);
    }
    return (
        <React.Fragment>
            <div className={side.div7}>
                {/* 搜尋 */}
                <div style={{ height: 325 }} className={cc.ezsurch1}>
                    <div id="London" style={{ padding: 0, paddingRight: 50, paddingLeft: 50 }} className={cc.tabcontent}>
                        <div>
                            <div id="local" className={cc.d2}>
                                <p className={cc.d3}>類別</p>
                                <div className={cc.d4d}>
                                    <img className={cc.d4} src={a6} alt="" /><br />
                                    <select name="" id="aaa" className={cc.d4s} onChange={(e)=>{settype(e.target.value)}}>
                                        <option value="羽球">羽球</option>
                                        <option value="桌球">桌球</option>
                                        <option value="籃球">籃球</option>
                                    </select>
                                </div>
                                <p className={cc.d5}>地區</p>
                                <img className={`${cc.d6} ${cc.selectedDate}`} src={arr} />
                                <img className={`${cc.d7} ${cc.selectedDate}`} src={arr} />
                                <select name="city" className={cc.county}>
                                    <option value="台中市">台中市</option>
                                </select>
                                <select name="town" className={cc.district} onChange={(e)=>{setarea(e.target.value)}}>
                                    {Taichung.map((val, key) => {
                                        return (<option key={key} value={val}>{val}</option>);
                                    })}

                                </select>

                            </div>

                            <div className={cc.d8}>
                                <p className={cc.d9}>日期</p>
                                <p className={cc.d10}>開始時間</p>
                                <p className={cc.d11}>結束時間</p>
                            </div>

                            <input className={cc.d12} type="date" id="start"
                                name="trip-start" min="2022-12-19" max="2033-12-31" onChange={(e)=>{setstartdate(e.target.value)}}/>
                            <img className={`${cc.d13} ${cc.selectedDate}`} src={arr} />

                            <span className={cc.d14}>~</span>

                            <input className={cc.d15} type="date" id="start"
                                name="trip-start" min="2022-12-19" max="2033-12-31" onChange={(e)=>{setenddate(e.target.value)}}/>
                            <img className={`${cc.d16} ${cc.selectedDate}`} src={arr} />

                            <select name="" id="" className={`${cc.select} ${cc.d17}`} onChange={(e)=>{setstarttime(e.target.value)}}>
                                {time.map((val, key) => {
                                    return (<option key={key} value={key + 1}>{val}</option>);
                                })}
                            </select>
                            <img className={`${cc.d18} ${cc.selectedDate}`} src={arr} />

                            <select name="" id="" className={`${cc.select} ${cc.d19}`} onChange={(e)=>{setendtime(e.target.value)}}>
                                {time.map((val, key) => {
                                    return (<option key={key} value={key + 1}>{val}</option>);
                                })}
                            </select>
                            <img className={`${cc.d20} ${cc.selectedDate}`} src={arr} />


                            <div className={cc.d21}>
                                <p className={cc.d22}>關鍵字</p>
                            </div>
                            <label className={cc.d23} for="">
                                <input className={cc.d24}
                                    type="text" placeholder="請輸入關鍵字" onChange={(e)=>{settext(`%${e.target.value}%`)}}/>
                            </label>
                            <div className={cc.d25}>
                                <p className={cc.d26}>關鍵字</p>

                            </div>

                            <label className={cc.d27}>
                                <input className={cc.d28} type="checkbox" value="停車場" checked={park} onChange={spark}/>
                                <span className={cc.d29}>停車場</span>
                            </label>
                            <label className={cc.d30}>
                                <input className={cc.d31} type="checkbox" value="淋浴間" checked={bath} onChange={sbath}/>
                                <span className={cc.d32}>淋浴間</span>
                            </label>
                            <label className={cc.d33}>
                                <input className={cc.d34} type="checkbox" value="身障友善" checked={baulk} onChange={sbaulk}/>
                                <span className={cc.d35}>身障友善</span>
                            </label>
                            <button type="submit" className={cc.serch} onClick={search}>搜尋</button>
                        </div>
                    </div>
                </div>
                {/* <!-- 標籤欄 --> */}
                <div class={`row d-flex ${side.div8}`}>
                    <div class="d-flex">
                        <div class={side.buttom1}>
                            羽球
                        </div>
                    </div>
                    <div class="d-flex ml-auto">
                        <div class={side.typecol}>價格由低到高
                            <img src={a5} alt="" />
                        </div>
                    </div>
                </div>
                {/* <!-- 球場顯示 --> */}
                {sidelist.map((val,key)=>{
                    return (
                        <React.Fragment>
                            <div class={`row ${side.search} d-flex ${side.div1}`} key={key}>
                                <div class={`col-md-4 ${side.div2}`}>
                                    <img src={ee(key)} alt=""  className={side.div11}/>
                                </div>
                                <div class={`col-md-6 d-flex flex-column ${side.div3}`}>
                                    <div class={`${side.fontsize1} ${side.div4}`}>{val.sidename}</div>
                                    <div class={side.fontsize3}>{val.adress}</div>
                                    <div class={`d-flex ${side.div5}`}>
                                        <div class={`${side.sidediv} ${side.fontsize4}`}>尖峰費用</div>
                                        <span class={`${side.sidespan} ${side.fontsize4}`}>{val.peakfee}元</span>
                                        <div class={`${side.sidediv} ${side.fontsize4}`}>離峰費用</div>
                                        <span class={`${side.sidespan} ${side.fontsize4}`}>{val.offpeakfee}元</span>
                                        <div class={`${side.sidediv} ${side.fontsize4}`}>剩餘數量</div>
                                        <span class={`${side.sidespan2} ${side.fontsize4}`}>{val.amount}</span>
                                    </div>
                                </div>
                                <div className={`col-md-2 d-flex flex-column ${side.div9}` }>
                                    {/* <button className={`${side.div10}`} onClick={(e)=>{more(val.sideid)}}>查看更多</button> */}
                                    <a href={`http://localhost:3000/gosport/rent/side/${val.sideid}`} className={`${side.div10}`} onClick={(e)=>{more(val.sideid)}}>查看更多</a>
                                </div>
                            </div>

                        </React.Fragment>
                    );
                })}
                {/* 下一頁按鈕 */}
                <div class="row">
                    <div class="d-flex justify-content-center col-md-12">
                        <div class={`d-flex ${side.div6}`}>
                            <button class={side.buttom2}><img src={a1} alt="" /></button>
                            <button class={side.buttom2}><img src={a2} alt="" /></button>
                            <div class={side.typecol}>第一頁</div>
                            <button class={side.buttom2}><img src={a3} alt="" /></button>
                            <button class={side.buttom2}><img src={a4} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 場地查看更多 */}

        </React.Fragment>
    );
}

export default Rentside;