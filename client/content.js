(()=>{
    let i = -1;
    const $ = q => document.querySelector(q);
    const $$ = q => document.querySelectorAll(q);
    let socket = new WebSocket("ws://localhost:1537");    
    const scrollMov = () => {
        //document.documentElement.scrollBy(0,$$("#video-title")[i].getBoundingClientRect().y - 200)
        $$("#video-title")[i].focus({preventScroll:true, focusVisible:true})
    }
    socket.onmessage = msg => {
        console.log(msg.data, i)
        switch(msg.data){
            case "stop": 
                $("video").focus();
                $("video").click();
                break;
            case "skipads": 
                $("video").focus();
                $(".ytp-ad-skip-button-modern").click();
                break;
            case "vselect":
                document.documentElement.scrollTop = 0
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
            case "downmov":
                i++;
                scrollMov()
                break;
            case "upmov":
                i--;
                if(i < 0){
                    i = -1;
                    document.documentElement.scrollTop = 0
                }else{
                    scrollMov()
                }
                break;
            case "pmov":
                if(i > 0){
                    $$("#video-title")[i].click()
                }
                break;
        }
    }
})()
