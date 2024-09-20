import {createApp} from "/vue";
createApp({
    data:()=>{return {
        ws:0,
        debugmsg: "DebugMsg",
        connectflag:0,
        msgs: [0,1,0,0],
        btnlist:[
            {
                text: "▶||",
                id: "stop"
            },{
                text: "▶|",
                id: "skipads"
            },{
                text: "動画",
                id: "vselect",
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
                id: "movplusfive",
                enter: true
            },{
                text: "↓",
                id: "downmov"
            },{
                text: "↑",
                id: "upmov"
            },{
                text: "▶",
                id: "pmov"
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
    props:["data","click"],
    template: `<a href="#" @click="click()">{{ data.text }}</a><br v-if="data.enter">`
}).mount("#app");