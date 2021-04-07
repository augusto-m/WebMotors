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



describe('Pequisa lateral', () => {
    
    it('3 carros: {1:marca}, {2:marca/modelo}, {3:marca/modelo/versao}', () => {
        
        cy.filterMake(carro1.marca, posicao.p1)
        cy.validateFilterMain(carro1.marca)
        
        cy.addCar()
    
        cy.filterMake(carro2.marca, posicao.p2)
        cy.filterModel(carro2.modelo, posicao.p2)
        cy.validateFilterMain(carro2.marca + ' ' + carro2.modelo)

        cy.addCar()
    
        cy.filterMake(carro3.marca, posicao.p3)
        cy.filterModel(carro3.modelo, posicao.p3)
        cy.filterVersion(carro3.versao, posicao.p3)
        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo + ' ' + carro3.versao)
    });

    it('2 carros: mesma marca e modelos diferentes', () => {
        cy.filterMake(carro3.marca, posicao.p1)
        cy.filterModel(carro3.modelo, posicao.p1)
        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo)

        cy.addCar()

        cy.filterMake(carro3.marca, posicao.p2)
        cy.filterModel(carro3.modelo2, posicao.p2)
        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo2)
    });

    it('3 carros: mesma marca, modelo e versao', () => {
        
        cy.filterMake(carro3.marca, posicao.p1)
        cy.filterModel(carro3.modelo, posicao.p1)
        cy.filterVersion(carro3.versao, posicao.p1)
        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo + ' ' + carro3.versao)
        
        cy.addCar()
    
        cy.filterMake(carro3.marca, posicao.p2)
        cy.filterModel(carro3.modelo, posicao.p2)
        cy.filterVersion(carro3.versao, posicao.p2)
        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo + ' ' + carro3.versao)
    })

    it('Mini filtros preenchendo marca, modelo e versao', () => {
        cy.miniFilterMake(carro3.marca, posicao.p1)
        cy.miniFilterModel(carro3.modelo, posicao.p1)
        cy.miniFilterVersion(carro3.versao, posicao.p1)

        cy.validateFilterMain(carro3.marca + ' ' + carro3.modelo + ' ' + carro3.versao)
    });

    it('Mini filtro sem resultados encontrados', () => {
        cy.miniFilterNoResults('pesquisa qualquer')
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



describe('Exclusao de filtros, refazer pesquisa', () => {
    
    it('Excluir filtros gradativamente', () => {
        cy.filterMake(carro1.marca, posicao.p1)
        cy.filterModel(carro1.modelo, posicao.p1)
        cy.filterVersion(carro1.versao, posicao.p1)
        cy.validateFilterMain(carro1.marca + ' ' + carro1.modelo + ' ' + carro1.versao)
        
        cy.deleteVersion1()
        cy.validateFilterMain(carro1.marca + ' ' + carro1.modelo)
        cy.validateFilterNotExistMain(carro1.marca + ' ' + carro1.modelo + ' ' + carro1.versao)

        cy.deleteModel1()
        cy.validateFilterMain(carro1.marca)
        cy.validateFilterNotExistMain(carro1.marca + ' ' + carro1.modelo)
    });

    it('Marca, modelo e versao preenchidos, excluir marca', () => {
        cy.filterMake(carro1.marca, posicao.p1)
        cy.filterModel(carro1.modelo, posicao.p1)
        cy.filterVersion(carro1.versao, posicao.p1)
        cy.validateFilterMain(carro1.marca + ' ' + carro1.modelo + ' ' + carro1.versao)
        
        cy.deleteMake1()
        cy.validateFilterNotExistMain(carro1.marca)
        cy.validateFilterNotExistMain(carro1.modelo + ' ' + carro1.versao)
    });

    it('Marca, modelo e versao preenchidos, excluir modelo', () => {
        cy.filterMake(carro1.marca, posicao.p1)
        cy.filterModel(carro1.modelo, posicao.p1)
        cy.filterVersion(carro1.versao, posicao.p1)
        cy.validateFilterMain(carro1.marca + ' ' + carro1.modelo + ' ' + carro1.versao)
        
        cy.deleteModel1()
        cy.validateFilterNotExistMain(carro1.modelo)
        cy.validateFilterNotExistMain(carro1.versao)
        cy.validateFilterMain(carro1.marca)
    });

    it('Tudo preenchido, excluir marca, refazer pesquisa filtrando somente marca', () => {
        cy.filterMake(carro1.marca, posicao.p1)
        cy.filterModel(carro1.modelo, posicao.p1)
        cy.filterVersion(carro1.versao, posicao.p1)
        cy.validateFilterMain(carro1.marca + ' ' + carro1.modelo + ' ' + carro1.versao)

        cy.deleteMake1()
        cy.validateFilterNotExistMain(carro1.marca)
        cy.validateFilterNotExistMain(carro1.modelo + ' ' + carro1.versao)

        cy.filterMake(carro1.marca, posicao.p1)
        cy.validateFilterMain(carro1.marca)
    });
});
  




