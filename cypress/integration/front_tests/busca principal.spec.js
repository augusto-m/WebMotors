///<reference types = 'Cypress'/>

const carro1 = {
    marca: 'honda',
    modelo: 'city',
    versao: '1.5 PERSONAL 16V FLEX 4P AUTOMÁTICO',
    valor: '73.900',
    ano: '2018/2019',
    quilometragem: '18000 km',
    cidade: 'São Paulo - SP',
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



describe('Pesquisa principal', () => {

    it('Marca', () => {
        cy.filterMain(carro1.marca)
        cy.validateFilterMain(carro1.marca)
    });

    it('Modelo', () => {
        cy.filterMain(carro1.marca + ' ' + carro1.modelo)
        cy.validateFilterMain(carro1.marca + ' ' + carro1.modelo)
    });

    it('Resultado não encontrado', () => {
        cy.filterMainError('texto qualquer')  
    });
});



describe('pesquisa lateral + filtro principal', () => {
    
    it('Filtro principal sobrepor filtro lateral', () => {

        cy.filterMake(carro1.marca, posicao.p1)
        cy.validateFilterMain(carro1.marca)
        
        cy.addCar()
    
        cy.filterMake(carro2.marca, posicao.p2)
        cy.filterModel(carro2.modelo, posicao.p2)
        cy.filterVersion(carro2.versao, posicao.p2)
        cy.validateFilterMain(carro2.marca + ' ' + carro2.modelo + ' ' + carro2.versao)

        cy.filterMain(carro3.marca + ' ' + carro3.modelo)

        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo)
        cy.validateFilterNotExistMain(carro1.marca + ' ' + carro1.modelo + ' ' + carro1.versao)
        cy.validateFilterNotExistMain(carro2.marca + ' ' + carro2.modelo + ' ' + carro2.versao)
    });
    
});



