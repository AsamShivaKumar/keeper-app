import React from "react"

function Footer(){
         var date = new Date();
         return <footer>
             <div><p>Copyright © {date.getFullYear()}</p></div>
         </footer>
}

export default Footer;