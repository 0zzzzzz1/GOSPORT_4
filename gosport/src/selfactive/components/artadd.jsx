import React, { useState } from 'react';
// import React from 'react';
import Axios from "axios";
import Cookies from 'js-cookie';

import arrowup from '../icon/arrowup2.svg'
// import star from '../icon/star1.svg'
// import pic from '../icon/20130917_171106.jpg'
const Artadd = ({ control }) => {
    const [stratDate, setStartDate] = useState('');
    const [endDate, setEndtDate] = useState('');
    const [sublist, setSubList] = useState([{
        articleid_sublet: '',
        date: '',
        content: '',
        ballgames: '',
        amount: ''
    }]);
    const [zerolist, setZeroList] = useState([{
        date: '',
        content: '',
        ballgames: '',
        number: ''
    }]);
    const userid = Cookies.get('id');
    const [countsub, setcountsublist] = useState([]);
    const [countzero, setcountcountzero] = useState([]);
    let findArticle = () => {
        Axios.post("http://localhost:3001/findzoro", {
            stratDate: stratDate,
            endDate: endDate,
            userid: userid
        }).then((response) => {
            console.log(response.data);
            setZeroList(response.data);
            for (let i = 0; i < response.data.length; i++) {
                Axios.post("http://localhost:3001/countzero", {
                    articleid: response.data[i].articleid_sublet
                }).then((response) => {
                    console.log(response.data);
                    setcountcountzero(countzero+response.data)
                });
            }
        });
        Axios.post("http://localhost:3001/findsub", {
            stratDate: stratDate,
            endDate: endDate,
            userid: userid
        }).then((response) => {
            console.log(response.data);
            setSubList(response.data);
            for (let i = 0; i < response.data.length; i++) {
                Axios.post("http://localhost:3001/countsub", {
                    articleid: response.data[i].articleid_sublet
                }).then((response) => {
                    console.log(response.data);
                    setcountsublist(countsub+response.data)
                });
            }
        });
    }
    let datalist = sublist + zerolist
    // console.log(datalist)
    return (
        <React.Fragment>
            <div>
                日期區間<br />
                <input type="date" onChange={(e) => { setStartDate(e.target.value) }} /><img className="selectedDate" src={arrowup} alt='' />至&emsp;&thinsp;
                <input type="date" onChange={(e) => { setEndtDate(e.target.value) }} /><img className="selectedDate" src={arrowup} alt='' />
                <span onClick={findArticle}>搜尋</span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>新增日期</td>
                        <td>類別</td>
                        <td>標題</td>
                        <td>報名/承租</td>
                        <td>留言數</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2022/12/21</td>
                        <td>羽球</td>
                        <td>一個內斂又大膽的標題</td>
                        <td style={{ textAlign: "center", cursor: "pointer" }} onClick={control}>66</td>
                        <td style={{ textAlign: "center" }}>88</td>
                        <td style={{ position: "relative" }}>
                            <button>編輯</button>
                            <button>刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </React.Fragment>
    );
}
// class Artadd extends Component {
//     state = {
//     }

//     render() {
//         const {controlModal}=this.props
//         return (
//             <React.Fragment>
//                 <div>
//                     日期區間<br />
//                     <input type="date" /><img className="selectedDate" src={arrowup} alt='' />至&emsp;&thinsp;
//                     <input type="date" /><img className="selectedDate" src={arrowup} alt='' />
//                 </div>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>新增日期</td>
//                             <td>類別</td>
//                             <td>標題</td>
//                             <td>報名/承租</td>
//                             <td>留言數</td>
//                             <td></td>
//                         </tr>
//                         <tr>
//                             <td>2022/12/21</td>
//                             <td>羽球</td>
//                             <td>一個內斂又大膽的標題</td>
//                             <td style={{ textAlign: "center", cursor: "pointer" }} onClick={controlModal}>66</td>
//                             <td style={{ textAlign: "center" }}>88</td>
//                             <td style={{ position: "relative" }}>
//                                 <button>編輯</button>
//                                 <button>刪除</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>

//             </React.Fragment>
//         );
//     }
// }

export default Artadd;