var cotizDefault = 125.23;

const Dashboard = {
	template: `
       <div class="section">
        <form :change="result" class="my-5">
            <ul>
                <li>
                    <div class="columns is-multiline">
                        
                        <div class="column is-full-mobile is-half-desktop">
                            <div class="field">
                                <div class="control">
                                    <label class="label">EUR</label>
                                    <input class="input mb-5" type="number" v-model.number="field.euro" inputmode="numeric" placeholder="0" min="0" step="0.01" lang="es" >
                                    <span class="is-4 my-3 is-block">{{field.pesoVal}}</span>
                                    <span class="is-4 my-3 is-block">{{field.pesoValPais}} <small class="has-text-grey-light">(imp PAIS 30%)</small></span>
                                    <span class="is-4 my-3 is-block">{{field.pesoValPaisGanancias}} <small class="has-text-grey-light">(imp PAIS + Ganancias 35%)</small></span>
                                </div>
                            </div>
                        </div>
                        <div class="column is-full-mobile is-half-desktop">
                            <div class="field">
                                <div class="control">
                                    <label class="label">ARS</label>
                                    <input class="input mb-5" type="number" v-model.number="field.peso" inputmode="numeric" placeholder="0" min="0" step="0.01" lang="es">
                                    <span class="is-4 my-3 is-block">{{field.euroVal}}</span>
                                    <span class="is-4 my-3 is-block">{{field.euroValPais}} <small class="has-text-grey-light">(imp PAIS 30%)</small></span>
                                    <span class="is-4 my-3 is-block">{{field.euroValPaisGanancias}} <small class="has-text-grey-light">(imp PAIS + Ganancias 35%)</small></span>
                                </div>
                            </div>
                        </div>
                        <div class="column is-full">
                            <hr />
                            <label class="label">Cotizacion euro</label>
                            <small class="has-text-grey-light is-block mb-2">(cuantos pesos sale 1 euro)</small>
                            <div class="field  is-grouped">
                                <div class="control is-expanded">
                                    <input class="input mb-5" type="number" v-model.number="field.cotizacion" inputmode="numeric" placeholder="0" step="0.01">
                                </div>
                                <div class="control">
                                    <button class="button" v-on:click="setValue()">Guardar</button>
                                </div>
                                <div class="control">
                                    <button class="button" v-on:click="resetValue()">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </form>
        </div>
    `,

	data() {
		return {
			field: {
				cotizacion: null,
				euro: null,
				euroRes: 0,
				euroVal: 0,
				euroValPais: 0,
				euroValPaisGanancias: 0,
				peso: null,
				pesoRes: 0,
				pesoVal: 0,
				pesoValPais: 0,
				pesoValPaisGanancias: 0,
			},
		};
	},
	computed: {
		result() {
			//this.euro = this.peso / 117.28;
			// default expire time: 1 day
			//this.$cookies.set('cotizacion',this.field.cotizacion,"1d");
			//console.log($cookies.get('cotizacion'));
			//const cotizDefault  = 125.23;
			//this.$cookies.set('cotizacion', cotizDefault);
			//console.log(this.$cookies.get('cotizacion'));
			//this.field.cotizacion = this.$cookies.get('cotizacion');
			const cotizDefault = 125.23;

			const cotiz = this.field.cotizacion;
			const impPais = 1.3;
			const impPaisGan = 1.65;

			let conv = cotiz * 1.3;
			let conv65 = cotiz * 1.65;

			//const conv   = 162.799;
			//const conv65 = 206.6295;
			let field = this.field;
			let val = 0;

			let peso = this.field.euro * cotiz;
			let euro = this.field.peso / cotiz;

			//this.field.euro = euro;
			//this.field.peso = peso;

			if (isNaN(euro)) {
				field.euroRes = "--";
				field.euroVal = "--";
			} else {
				if (euro === Infinity || euro === -Infinity) {
					field.euroRes = "Error";
				} else {
					//this.field.euro = euro;
					//field.euroRes = euro;
					field.euroVal = euro.toFixed(2) + " €";
					field.euroValPais = (euro / impPais).toFixed(2) + " €";
					field.euroValPaisGanancias = (euro / impPaisGan).toFixed(2) + " €";
				}
			}
			if (isNaN(peso)) {
				field.pesoRes = "--";
				field.pesoVal = "--";
			} else {
				if (peso === Infinity || peso === -Infinity) {
					field.pesoRes = "Error";
				} else {
					//this.field.peso = peso;
					//field.pesoRes = peso;
					//field.pesoVal = peso.toFixed(2) + ' $';
					field.pesoVal = peso.toFixed(2) + " $";
					field.pesoValPais = (peso * impPais).toFixed(2) + " $";
					field.pesoValPaisGanancias = (peso * impPaisGan).toFixed(2) + " $";
				}
			}
		},
	},

	mounted() {
		this.$cookies.set("hover-time", "1s");
		console.log(this.$cookies);
		//this.$cookies.config('30d')
		//this.field.cotizacion = this.$cookies.get("cotizacion");
		if (this.field.cotizacion == null) {
			this.$cookies.set("cotizacion", cotizDefault);
			//this.field.cotizacion = 125.23;
		}
	},
	methods: {
		setValue() {
			this.$cookies.set("cotizacion", this.field.cotizacion);
			//console.log(this.$cookies.get('cotizacion'))
		},
		resetValue() {
			//this.$cookies.remove('cotizacion');
			this.$cookies.set("cotizacion", cotizDefault);
			this.field.cotizacion = cotizDefault;
			//console.log(this.$cookies.get('cotizacion'))
		},

		pesoargentinoEuro(val) {
			inputEuro = val * 117.28;
		},
		dolaresPesoargentino(val) {
			inputPesos = val / 117.28;
		},
		pesoargentinoEurovendedor(val) {
			inputEurovender = val * 125.23;
		},
		dolaresvendedorPesoargentino(val) {
			inputPesosvender = val / 125.23;
		},
		pesoargentinoEurovendedorahorro(val) {
			inputEurovenderahorro = val * 162.799;
		},
		eurovendedorahorroPesoargentino(val) {
			inputPesosvenderahorro = val / 162.799;
		},
		pesoargentinoEurovendedorahorro65(val) {
			inputEurovenderahorro65 = val * 206.6295;
		},
		dolaresvendedorahorro65Pesoargentino(val) {
			inputPesosvenderahorro65 = val / 206.6295;
		},
	},
};
