(()=>{
    let isActive = true
    window.addEventListener("blur",()=>isActive = false)
    window.addEventListener("focus",()=>isActive = true)
    let before = -1
    let i = -1;
    const $ = q => document.querySelector(q);
    const $$ = q => document.querySelectorAll(q);
    let socket = new WebSocket("ws://localhost:1537");
    const videoFromId = idx => {
        if(location.pathname == "/results"){
            return idx < 0 ? undefined : $("ytd-video-renderer:nth-child("+(idx+1)+") a")
        }else{
            return $$("#video-title")[idx]?.parentElement.parentElement
        }
    }
    const scrollMov = () => {
        document.documentElement.scrollBy(0,videoFromId(i)?.getBoundingClientRect().y - 200)
        videoFromId(before)?.removeAttribute("pcrc_selected")
        videoFromId(i)?.setAttribute("pcrc_selected","")
        before = i
    }
    socket.onmessage = msg => {
        if(!isActive) return;
        switch(msg.data){
            case "stop": 
                $("video").focus();
                $("video").click();
                break;
            case "skipads": 
                $("video").focus();
                $(".ytp-skip-ad-button").click();
                break;
            case "vselect":
                i = -1;
                scrollMov()
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
                if(i < 0) i = -1;
                scrollMov()
                break;
            case "pmov":
                $("[pcrc_selected]")?.click()
                break;
            case "test":
                socket.send("success")
                break;
            default:
                console.log(msg.data)
                if(/^search:/.test(msg.data)){
                    location.href = "/results?search_query=" + 
                        encodeURIComponent(msg.data.substring(7))
                }
        }
    }
})()
