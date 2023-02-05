import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams,useLocation, useHistory } from 'react-router-dom';
import activityEdit from './activityEdit.module.css';
import img from '../img.module';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default function ActivityNew(params) {

    // 今天日期
    const setToday = new Date();
    const today = setToday.toISOString().substring(0, 10);

    // 使用者id
    const [userid, setUserid]=useState();
    // 球隊id
    const {id} = useParams();
    const [teamid, setTeamid]=useState(id);
    // 最新文章id值
    const [articleid,setArticleid]=useState(null);
    // 新建文章的id值
    const [newArticleid,setNewArticleid]=useState(null);
    // 文章類型
    const [articleType, setArticleType] = useState('');
    // input
    const [date, setDate] = useState(today);                // 日期
    const [starttime, setStarttime] = useState('06:00');    // 開始時間
    const [endtime, setEndtime] = useState('18:00');        // 結束時間
    const [type, setType] = useState('運動');                // 類型
    const [title, setTitle] = useState(null);               // 標題
    const [place, setPlace] = useState(null);               // 地點
    const [pay, setPay] = useState(null);                   // 支出
    const [members, setmembers] = useState([]);             // 資料庫成員
    const [memberImgUrls, setMemberImgUrls] = useState({}); // 資料庫成員urls 已讀取 
    const newActivityMembers =[];                           // 選取的成員id   
    const [text,setText]=useState(null);                    // 描述 
    const [activityImg, setActivityImg] = useState();       // 顯示
    const [activityFile, setActivityFile] = useState();     // 傳照片
    // 上傳照片...
    const [uploadimg, setUploadimg] = useState(img.upload_c);

    // 網址  
    const location = useLocation();
    const splitLocaPath = location.pathname.split('/');
    useEffect(()=>{
        
        // 依網址判斷文章類型 
        if(splitLocaPath[5]==='fund'){
            setArticleType('fund');
        }else if(splitLocaPath[5]==='pay'){
            setArticleType('pay');
        }else if(splitLocaPath[5]==='activity'){
            setArticleType('activity');
        };

        // 查找最新文章id
        Axios.post('http://localhost:3001/teamactivityall',{
            teamid:teamid
        }).then((response)=>{
            setArticleid(response.data[0].articleid);
        });

    },[])

    // 前往指定網址
    const goPath =useHistory(); 

    // 新建文章
    const handleNewActivity=()=>{

        console.log(`
        日期 ${date}
        時段 ${starttime} - ${endtime}
        類型 ${type}
        標題 ${title}
        地點 ${place}
        支出 ${pay}
        描述 ${text}
        `);

        console.log(newActivityMembers);
        


        // 新增文章
        // Axios.post('http://localhost:3001/teamactivityarticlenew',{
        //     date:date,
        //     teamid:teamid,
        //     // userid:fundMembeIid,
        //     fee:pay,
        //     text:text
        // })

        // 查找最新文章id
        Axios.post('http://localhost:3001/teamactivityall',{
            teamid:teamid
        }).then((response)=>{
            // 設定新建文章id
            setNewArticleid(response.data[0].articleid);
        });

    }

    // 找到新增文章id值後 返回基金頁
    // if(newArticleid){
    //     goPath.push(`/gosport/user/myteam/${id}/activity/${newArticleid}`);
    // }



    

    // 畫面載入時 查找球隊成員
    useEffect(()=>{
        handlemembers(); 
    },[]);

    // 查找成員
    const handlemembers = () => {
        Axios.post("http://localhost:3001/teammember",{
            teamid: teamid
        }).then((response)=>{
            setmembers(response.data); // 放入members
        })
    }

    // members改變時 讀取成員img
    useEffect(() => {

        members.forEach((val, key) => {
            if (val.userimg !== null) {
                let u8Arr = new Uint8Array(val.userimg.data);
                let blob = new Blob([u8Arr], {type: "image/jpeg"});
                let fr = new FileReader;
                fr.readAsDataURL(blob);
                fr.onload = function () {
                    setMemberImgUrls(e => { // 放入memberImgUrls
                        return { ...e, [key]: fr.result }
                    });
                }
            }
        });
                         
    }, [members]);
    
    // 成員清單
    const memberList = members.map((val, key) => {

        // 預設成員不參加
        newActivityMembers.push(false);   

        // 會員有頭像時 img.m
        if(val.userimg !== null){
            return (<React.Fragment key={key}>
                <input type="checkbox" id={`${key}`} value={val.userid}
                       onClick={ (val)=>{ newActivityMembers[val.target.id]=!newActivityMembers[val.target.id] } } />
                <label htmlFor={`${key}`} ><img src={ memberImgUrls[key] } /></label>
            </React.Fragment>)  

        // 會員無頭像時 img.m
        }else{
            return (<React.Fragment key={key}> 
                <input type="checkbox" id={`${key}`} value={val.userid}
                       onClick={ (val)=>{ newActivityMembers[val.target.id]=!newActivityMembers[val.target.id] } } />
                <label htmlFor={`${key}`} ><img src={img.m} /></label>
            </React.Fragment>)
        };
    });

    // 上傳照片
    const inputFile = useRef();
    const upLoadImg=()=>{
        inputFile.current.click();
    }
    // 顯示
    const handleImgChange =(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            console.log(file);
            reader.readAsDataURL(file); // 讀取 以base64編碼的URL
            setActivityFile(file);
        }
        reader.addEventListener("load", function () {
            setActivityImg(reader.result);
            // 隱藏uploadimg
            setUploadimg('none');
        }, false);
    }

    return(
        <>
            <div className={activityEdit.aForm}>
                <div onClick={upLoadImg}>
                    <img src={uploadimg}/>
                    <img src={activityImg}/>
                    <input type='file' accept=".png, .jpg, .jpeg" ref={inputFile} 
                           onChange={ handleImgChange }></input>
                </div>
                <div>日期</div>
                <input type="date" onChange={ (e)=>{setDate(e.target.value)} }
                    defaultValue={ `${today}` }/>
                <div>時段</div>
                <input type='time' defaultValue={'06:00'} onChange={ (e)=>{setStarttime(e.target.value)}}/>
                <div className={activityEdit.fTimeTo}>至</div>
                <input type='time' defaultValue={'18:00'} onChange={ (e)=>{setEndtime(e.target.value)}}/>
                <div>類型</div>
                <select onChange={ (e)=>{setType(e.target.value)} }
                        defaultValue={'運動'}>
                    <option value="運動">運動</option>
                    <option value="聚餐">聚餐</option>
                    <option value="其他">其他</option>
                </select>
                <div>標題</div>
                <input type="text" onChange={ (e)=>{setTitle(e.target.value)} }/>
                <div>地點</div>
                <input type="text" onChange={ (e)=>{setPlace(e.target.value)} }/>
                <div>支出</div>
                <input type="text" onChange={ (e)=>{setPay(e.target.value)} }/>
                <div>參加成員</div>
                <div> { memberList } </div>
                <div>描述</div>
                <textarea onChange={ (e)=>{setText(e.target.value)} } cols="30" rows="10"></textarea>
                <div>
                    <Link to={`/gosport/user/myteam/${id}/activity/${articleid}`}>取消</Link>
                    <button onClick={ handleNewActivity }>儲存</button>
                </div>
            </div>
        </>
    )
};
