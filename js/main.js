const app = Vue.createApp({
    data() {
        return{
            fields: [
                {
                    n1: "",
                    n2: "",
                    res: 0,
                    mbp: 0,
                    ptom: 0.00,
                    mtop: 0.00,
                },
                {
                    n1: "",
                    n2: "",
                    res: 0,
                    mbp: 0,
                    ptom: 0.00,
                    mtop: 0.00,
                }
            ]
        };
    },
    computed: {
        result(){
            let fieldList = this.fields;
            let val = 0;
               
            fieldList.forEach(field => {                
                
                let val = field.n2 / field.n1;
                let val2 = field.n1 / field.n2;

                if(isNaN(val)){
                    field.res = "--";
                    field.mtop = "--";
                }else{
                    if (val === Infinity || val === -Infinity){
                        field.res = "Error"
                    } else {
                        field.res = val;
                        field.mtop = val.toFixed(2) + '$';
                    }
                }
                
                if(isNaN(val2)){
                    field.mbp = "--";
                    field.ptom = "--";
                }else{
                    if (val2 === Infinity || val2 === -Infinity){
                        field.mbp = "Error"
                    } else {
                        field.mbp = val2;    
                        field.ptom = val2.toFixed(2) + 'm';
                    }
                }
            });
            var fields = this.fields
        },
        log(){
            return this.fields;
        },
        highestEl(){
            if (this.fields.length == 0 ){
                return 
            } 
            selectedFieldHigh = this.fields.reduce((a,b) => Number(a.res) > Number(b.res) ? a : b);
            return selectedFieldHigh
        },
        lowestEl(){
            if (this.fields.length == 0 ){
                return 
            } 
            selectedFieldLow = this.fields.reduce((a,b) => Number(a.res) < Number(b.res) ? a : b);

            return selectedFieldLow;
        }
    },
    methods:{
        addField(){
            this.fields.push({
                    n1: "",
                    n2: "",
                    res: 0,
                    mbp: 0,
                    ptom: 0.00,
                    mtop: 0.00,
                });
        },
        removeField(index){
            //this.$delete(this.fields, index)
            this.fields.splice(index, 1);
            if(this.fields.length <= 1){
                this.addField();
            }
        },
    }
})