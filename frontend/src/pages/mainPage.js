import '../App.css';
import React from 'react';

export default function Mainpage() {

    async function ClickHandler(){
      let json;
      let response = await fetch('http://localhost/DashboardWeb/yii2-basic/web/source/show/?id=2');
 
      let commit = await response.json();
      
      //alert(commit[0].txtIUserLogin);
      console.log(commit);
    //   let res = fetch('http://localhost/yii2-basic/web/users')
    //   .then(res => {    /* IF statement checks server response: .catch() does not do this! */ 
    //       if (res.ok) { console.log("HTTP GOOD");
    //         json = res.json(); }
    //       else { console.log("HTTP request unsuccessful") }
    //       return res
    //   })
    //   .then(res => res.json())
    //   .then(data => console.log(data)) // the data
    //   .catch(error => console.log(error)) // error handling
    //   /* .catch handles a failure with fetch (e.g. syntax error, no internet connection) */
    //  console.log();
    };

    return (
      <div>
        <h1>
          Press the button (Stable)
        </h1>
        <button onClick={ClickHandler}>BUTTON</button>
      </div>
    );
}
