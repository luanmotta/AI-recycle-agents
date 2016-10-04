class Lixo {

	constructor(tipo) {
		this._tipo = tipo; // O tipo pode ser "Organico" ou "Seco".
	}

	get tipo() {
		return this._tipo;
	}
	
}