import React, { Component, useState } from 'react';
import Axios from "axios";
import './req.css';
const Client = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const [userimg, setuserimg] = useState("");
    const [tel, settel] = useState("");
    const adduser = () => {
        Axios.post("http://localhost:3001/create", {
            email: email,
            password: password,
            username: username,
            userimg: userimg,
            tel: tel,
        }).then(() => {
            console.log("success");
        });
    };
    //提示email格式   
    const [emailhint, setemailhint] = useState("");
    const emailcheck = (Event) => {
        const text = Event.target.value;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        // 任意字元開頭@gmail.com結尾
        console.log(text.match(reg))
        if (text.match(reg)) {
            setemailhint("格式正確");
            setemail(text);
        } else {
            setemailhint("格式錯誤");
        }
    }
    // 提示密碼格式
    const [passwordhint, setpasswordhint] = useState("");
    const passwordcheck = (Event) => {
        const text = Event.target.value;
        const reg = /^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        // 密碼必須包含大小寫英文字母,至少一個數字與特殊符號,至少8碼
        console.log(text.match(reg))
        if (text.match(reg)) {
            setpasswordhint("格式正確");
            setpassword(text);
        } else {
            setpasswordhint("格式錯誤");
        }
    }
    //提式手機格式
    const [telhint, settelhint] = useState("");
    const telcheck = (Event) => {
        const text = Event.target.value;
        const reg = /^09\d{8}$/;
        // 密碼必須包含大小寫英文字母,至少一個數字與特殊符號,至少8碼
        console.log(text.match(reg))
        if (text.match(reg)) {
            settelhint("格式正確");
            settel(text);
        } else {
            settelhint("格式錯誤");
        }
    }
    const [employeeList, setEmployeeList] = useState([]);
    const getEmployee = () => {
        Axios.post("http://localhost:3001/employee").then((response) => {
            // console.log(response.data);
            setEmployeeList(response.data);
        });
    };
    const [Url,setUrl]=useState('');
    
    const [url,seturl]=useState('');
    const aaa =(e)=>{
      const reader = new FileReader();
      reader.readAsDataURL(e[0]);
      reader.addEventListener("load", function () {
        // seturl(reader.result.replace("data:image/jpeg;base64,",""));
        seturl(reader.result);
        console.log(url);
      }, false);
      Axios.post("http://localhost:3001/userupdate",{
        img:url
      }).then((response) => {
            alert("更新成功");
        });
    }
    return (
        <div>
            帳號<input type="text" onChange={emailcheck} /><span>{emailhint}</span><br />
            <span>密碼需要大小寫字母與數字的組合</span><br />
            密碼<input type="text" onChange={passwordcheck} /><span>{passwordhint}</span><br />
            名稱<input type="text" onChange={(e) => setusername(e.target.value)} /><br />
            頭貼<input type="file" onChange={(e) => setuserimg(e.target.value)} /><br />
            手機<input type="text" onChange={telcheck} /><span>{telhint}</span><br />
            <button onClick={adduser}>123</button>
            <h1>獲取所有會員</h1>
            <button onClick={getEmployee}>搜索</button>
            {employeeList.map((val, key) => {
                var u8Arr = new Uint8Array(val.userimg.data);
                var blob = new Blob([u8Arr],{type:"image/jpeg"});
                var fr = new FileReader
                fr.readAsDataURL(blob);
                fr.onload = function () {
                    var aa = fr.result;
                    setUrl(aa);
                    console.log(Url);
                  };
                return <div key={key}><img src={Url} alt=""/></div>;
            })}
            <input type="file" onChange={(e)=>{aaa(e.target.files)}} />
            <img src={url} alt="" />
        </div>
    );
}

export default Client;

// /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBxAQEBAQEBAQEBAQEBAQEBAQEBEQEBAQFxUZGBYVFhUaHysjGh0oHRUWJTUlKC0vMjIyGSI4PTcwPCsxMi8BCgsL
