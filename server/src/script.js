import {createApp} from "/vue";
import ip from "/ip";
createApp({
    data:()=>{return {
        ws:0,
        isc:0,
        searchq:"",
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
                text: "-5",
                id: "movminusfive"
            },{
                text: "+5",
                id: "movplusfive"
            },{
                text: "+10",
                id: "movplusten",
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
                if(msg.data == "success"){
                    this.isc = 1
                }
            };
            this.ws.onclose = () => {
                setTimeout(this.init,1000)
                this.isc = 0
            }
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