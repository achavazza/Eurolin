const Units = { template: `
        <div>
            <div class="item">
            <div class="columns is-mobile is-variable is-1-mobile">
                <div class="column">
                    <span class="label-title">Unidades</span>
                </div>
                <div class="column">
                    <span class="label-title">Metros</span>
                </div>
                <div class="column">
                    <span class="label-title">Precio</span>
                </div>
                <div class="column is-narrow">
                    <span class="dummy"></span>
                </div>
            </div>
            </div>

            <form :change="result">
                <ul>
                    <li v-for="(field, index) in fields" :key="index" class="item" :class="{'has-background-danger-light':(field === highestEl && field != lowestEl ), 'has-background-primary':(field != highestEl && field === lowestEl)}">
                        <div class="columns is-mobile is-variable is-1-mobile">
                            <div class="column is-2">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="number" v-model.number="field.n0" inputmode="numeric" pattern="[0-9]*" placeholder="0" min="1" step="1">
                                        <small></small>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="number" v-model.number="field.n1" inputmode="numeric" pattern="[0-9]*" placeholder="0.00" min="1" step="any">
                                        <small>{{field.ptom}} &times 1$</small>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="number" v-model.number="field.n2" inputmode="numeric" pattern="[0-9]*" placeholder="0.00" min="1" step="any">
                                        <small>{{field.mtop}} &times; 1m</small>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-narrow">
                                <div class="field">
                                    <button tabindex="-1" class="button is-danger" @click.prevent="removeField(index)">
                                        <span class="icon">
                                            <span class="material-icons">close</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        <div class="is-fab">
            <button class="button is-rounded is-primary" @click.prevent="addField()">
                <span class="icon"><span class="material-icons">add</span></span>
            </button>
        </div>
`,
data() {
    return{
        fields: [
            {
                n0: 1,
                n1: 0,
                n2: 0.00,
                res: 0,
                mbp: 0,
                ptom: 0.00,
                mtop: 0.00,
            },
            {
                n0: 1,
                n1: 0,
                n2: 0.00,
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
            
            let val = field.n2 / (field.n1 * field.n0);
            let val2 = (field.n1 * field.n0) / field.n2;

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
        if (this.fields.length == 0){
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
        /*
        selectedFieldLow  = this.fields.reduce(function(a,b){
            let v = false;
            //console.log(a);
            if(Number(a.res) < Number(b.res)){
                v = a
            } else {
                v = b
            }
            if(a.res != '--' && b.res != '--' ){
                return v
            }
            return false
        });
        */
        return selectedFieldLow;
    }
},
methods:{
    addField(){
        this.fields.push({
                n0: 1,
                n1: 0,
                n2: 0.00,
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
    }
}
}