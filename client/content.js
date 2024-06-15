const $ = q => document.querySelector(q);
let fullflag = false;
let socket;
const init = e => {
    socket = new WebSocket("ws://localhost:1537");    
    socket.onmessage = msg => {
        switch(msg.data){
            case "stop": 
                $("video").focus();
                $("video").click();
                break;
            case "skipads": 
                $("video").focus();
                $(".ytp-ad-skip-button-modern").click();
                break;
            case "fullscr":
                $("video").focus();
                if(fullflag){
                    $("video").webkitExitFullscreen()
                }else{
                    $("video").requestFullscreen();
                }
                fullflag = !fullflag;
                break;
            case "nowselect":
                $("video").focus();
                break;
            case "movminusten":
                $("video").currentTime -= 10;
                break;
            case "movplusten":
                $("video").currentTime += 10;
                break;
            case "movminusfive":
                $("video").currentTime -= 5;
                break;
            case "movplusfive":
                $("video").currentTime += 5;
                break;
        }
    }
    socket.onclose = e => 
        setTimeout(init,1000);
}
init();
