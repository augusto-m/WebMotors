///<reference types = 'Cypress'/>

let carro1 = {
    marca:'Honda',
    modelo:'City',
    versao1:'1.5 LX 16V FLEX 4P MANUAL',
    versao2:'2.0 EVO 4P AUTOMÁTICO',
    cor: 'Azul',
    quilometragem: 0,
    anoFabricacao: 2017,
    IDMarca: 2
}

let carro2 = {
    marca:'Marca Qualquer',
    marcaID: 12,
    modeloID: 10,
    versaoID: 50,
    paginaVeiculoID: 50
}

let status ={
    ok: 200
}


describe('Validar dados existentes', () => {

    it('Marca', () => {
        cy.getMake(carro1.marca, status.ok)
    });


    it('Modelo', () => {
        cy.getModel(carro1.marca, carro1.modelo, status.ok)
    });
    
    
    it('Versao', () => {
        cy.getVersion(carro1.IDMarca, carro1.modelo, carro1.versao1, status.ok)
    });


    it('Pagina Veiculo', () => {
        cy.getVehicles(2, carro1.marca, carro1.modelo, carro1.versao2, carro1.cor,
            carro1.quilometragem, carro1.anoFabricacao, status.ok)
    });
});


describe('Consultar dados inválidos', () => {

    it('Marca', () => {
        cy.getMakeNotExist(carro2.marca, status.ok)
    });


    it('Modelo', () => {
        cy.getModelNotExist(carro2.marcaID, status.ok)
    });
    
    
    it('Versao', () => {
        cy.getVersionNotExist(carro2.modeloID, status.ok)
    });


    it('Pagina Veiculo', () => {
        cy.getVehiclesNotExist(carro2.paginaVeiculoID, status.ok)
    });
});