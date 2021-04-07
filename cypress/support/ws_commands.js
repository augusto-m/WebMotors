///<reference types = "Cypress" />

//--------------------------------------//------------------------------------
// Requisições - Dados Válidos
//--------------------------------------//------------------------------------

Cypress.Commands.add('getIDMake', (marca) => {
    cy.request({
        method: 'GET',
        url:'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make'
    })
    .its('body').as('getResponse')

    cy.get('@getResponse')
    .then(response1 => {
        expect(response1.map(x => x.Name)).to.include(marca)
    })

    cy.get('@getResponse')
    .then(response2 => {

        let getID = response2.filter((x => x.Name == marca))
        
        cy.wrap(getID)
            .its('0.ID')
    })
})


Cypress.Commands.add('getIDModel', (IDMake, modelo) => {
    cy.request({
        method: 'GET',
        url:'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model',
        qs: {
            MakeID: IDMake
        } 
    })
    .its('body').as('getResponse')

    cy.get('@getResponse')
    .then(response1 => {
        expect(response1.map(x => x.Name)).to.include(modelo)
    })

    cy.get('@getResponse')
    .then(response2 => {

        let getID = response2.filter((x => x.Name == modelo))
        
        cy.wrap(getID)
            .its('0.ID')
    })
})


Cypress.Commands.add('getIDVersao', (IDModelo, versao) => {
    cy.request({
        method: 'GET',
        url:'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model',
        qs: {
            MakeID: IDModelo
        } 
    })
    .its('body').as('getResponse')

    cy.get('@getResponse')
    .then(response1 => {
        expect(response1.map(x => x.Name)).to.include(versao)
    })

    cy.get('@getResponse')
    .then(response2 => {

        let getID = response2.filter((x => x.Name == versao))
        
        cy.wrap(getID)
            .its('0.ID')
    })
})


Cypress.Commands.add('getMake', (marca, status) => {
    cy.request({
        method: 'GET',
        url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make',
    })
    .then(res => {
        console.log(res)
        expect(res.body[1].Name).to.be.equal(marca)
        expect(res.status).to.be.equal(status)
    })
})


Cypress.Commands.add('getModel', (marca, modelo, status) => {
    cy.getIDMake(marca)
    .then (res => {
        cy.request({
            method: 'GET',
            url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model',
            qs: {
                MakeID: res
            }
        })   
    })
    .then(res => {
        console.log(res)
        expect(res.body[0].Name).to.be.equal(modelo)
        expect(res.status).to.be.equal(status)
    }) 
})


Cypress.Commands.add('getVersion', (IDMake, modelo, versao, status) => {
    cy.getIDModel(IDMake, modelo)
    .then(res => {
        cy.request({
            method: 'GET',
            url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version',
            qs: {
                ModelID: res
            }
        })
        .then(res => {
            console.log(res)
            expect(res.body[1].Name).to.be.equal(versao)
            expect(res.status).to.be.equal(status)
        })
    })     
})


Cypress.Commands.add('getVehicles', (pagina, marca, modelo, versao, cor, KM, ano, status) => {
    cy.request({
        method: 'GET',
        url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles',
        qs: {
            Page: pagina
        }
    })
    .then(res => {
        console.log(res)
        expect(res.body[4].Make).to.be.equal(marca)
        expect(res.body[4].Model).to.be.equal(modelo)
        expect(res.body[5].Version).to.be.equal(versao)
        expect(res.body[4].Color).to.be.equal(cor)
        expect(res.body[4].KM).to.be.equal(KM)
        expect(res.body[4].YearFab).to.be.equal(ano)
        expect(res.status).to.be.equal(status)
    })        
})


//--------------------------------------//------------------------------------
// Requisições - Dados inválidos
//--------------------------------------//------------------------------------

Cypress.Commands.add('getMakeNotExist', (marca, status) => {
    cy.request({
        method: 'GET',
        url:'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make',
        failOnStatusCode: false
    })
    .as('getResponse')

    cy.get('@getResponse')
    .then(res => {
        expect(res.body.map(x => x.Name)).not.to.be.include(marca)
        expect(res.status).to.be.equal(status)
    })
})


Cypress.Commands.add('getModelNotExist', (IDMarca, status) => {
    cy.request({
        method: 'GET',
        url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model',
        qs: {
            MakeID: IDMarca
        },
        failOnStatusCode: false
    }).as('getResponse')  
    
    cy.get('@getResponse')
    .then(res => {
        console.log(res)
        expect(res.body[0]).not.to.be.exist
        expect(res.status).to.be.equal(status)
    }) 
})


Cypress.Commands.add('getVersionNotExist', (IDModel, status) => {
    cy.request({
        method: 'GET',
        url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version',
        qs: {
            ModelID: IDModel
        },
        failOnStatusCode: false
    })
    .then(res => {
        expect(res.body[0]).not.to.be.exist
        expect(res.status).to.be.equal(status)
    })
})


Cypress.Commands.add('getVehiclesNotExist', (pagina, status) => {
    cy.request({
        method: 'GET',
        url: 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles',
        qs: {
            Page: pagina
        },
        failOnStatusCode: false
    })
    .then(res => {
        console.log(res)
        expect(res.body[0]).not.to.be.exist
        expect(res.status).to.be.equal(status)
    })        
})
