import {createApp} from "/vue";
createApp({
    data:()=>{return {
        ws:0,
        debugmsg: "DebugMsg",
        connectflag:0,
        msgs: [0,1,0,0],
        btnlist:[
            {
                text: "||",
                id: "stop"
            },{
                text: "▶|",
                id: "skipads"
            },{
                text: "全画面",
                id: "fullscr"
            },{
                text: "今の動画を選択",
                id: "nowselect",
                enter: true
            },{
                text: "-10",
                id: "movminusten"
            },{
                text: "+10",
                id: "movplusten"
            },{
                text: "-5",
                id: "movminusfive"
            },{
                text: "+5",
                id: "movplusfive"
            },{
                text: "今の動画にする",
                id: "nowselect",
                enter: true
            },
        ]
    }},
    methods: {
        init(){
            this.ws = new WebSocket("ws://" + ip + ":1537");
            this.ws.onmessage = msg => {
                this.debugmsg = msg.data;
            };
            this.ws.onclose = () => 
                setTimeout(this.init,1000)
            this.ws.onopen = () =>
                this.ws.send("test")
        },
        send(mid){
            this.ws.send(this.btnlist[mid].id);
        }
    },
    mounted() {
        this.init();
    }
}).component("btn",{
    props:["data"],
    template: `<a href="#" :style="data.enter ? 'display:table' : null">{{ data.text }}</a>`
}).mount("#app");