///<reference types = 'Cypress'/>

const carro1 = {
    marca: 'honda',
    modelo: 'city',
    versao: '1.5 PERSONAL 16V FLEX 4P AUTOMÁTICO',
    valor: '73.900',
    ano: '2018/2019',
    quilometragem: '18000 km',
    cidade: 'São Paulo - SP',
    urlImg: 'honda-city-1.5-personal-16v-flex-4p-automatico-wmimagem14410194652.jpg'
}

const carro2 = {
    marca: 'mercedes-benz',
    modelo: '200 d',
    versao: '2.0 diesel 4p manual',
    valor: '90.000',
    ano: '1989/1989',
    quilometragem: '204923 km',
    cidade: 'Canoas - RS',
}

const carro3 = {
    marca: 'nissan',
    modelo: '370z',
    modelo2: 'x-trail',
    versao: '3.7 v6 gasolina roadster automático',
    valor: '179.900',
    ano: '2011/2011',
    quilometragem: '20510 km',
    cidade: 'Belo Horizonte - MG',
}

const posicao = {
    p1: 2,
    p2: 3,
    p3: 4
}


before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
});

beforeEach(() => {
    cy.visit('/carros')
    cy.acceptCookies()
});


describe('Validação listagem de resultados encontrados', () => {

    it('Validar resultados', () => {

        cy.filterMake(carro2.marca, posicao.p1)
        cy.filterModel(carro2.modelo, posicao.p1)
        cy.filterVersion(carro2.versao, posicao.p1)

        cy.validateTotalResults()
    })    
});


describe('Validar dados na listagem', () => {

    beforeEach(() => {
        cy.filterMake(carro1.marca, posicao.p1)
        cy.filterModel(carro1.modelo, posicao.p1)
        cy.filterVersion(carro1.versao, posicao.p1)
    });

    it('Marca e modelo', () => {
        cy.validateResultMakeModel(carro1.marca + ' ' + carro1.modelo, carro1.urlImg)
    });

    it('Versao', () => {
        cy.validateResultVersion(carro1.versao, carro1.urlImg)
    });

    it('Valor', () => {
        cy.validateResultValue(carro1.valor, carro1.urlImg)
    });

    it('Ano', () => {
        cy.validateResultYear(carro1.ano, carro1.urlImg)
    });

    it('Quilometragem', () => {
        cy.validateResultKM(carro1.quilometragem, carro1.urlImg)
    });

    it('Cidade', () => {
        cy.validateResultCity(carro1.cidade, carro1.urlImg)
    });

    it('Car Delivery', () => {
        cy.validateResultCarDelivery(carro1.urlImg)
    });

    it('Troca Troco', () => {
        cy.validateResultCarDelivery(carro1.urlImg)
    });
});







