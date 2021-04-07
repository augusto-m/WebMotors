///<reference types = "Cypress" />

//--------------------------------------//------------------------------------
// Utilitários
//--------------------------------------//------------------------------------

Cypress.Commands.add('acceptCookies', () => {
    cy.get('button[class*="sc-htoDjs"]').click()
})


//--------------------------------------//------------------------------------
// Filtros
//--------------------------------------//------------------------------------

Cypress.Commands.add('filterMain', (filtro) => {
    cy.get('input[class*="SearchBar"][type="text"]').should('be.visible').clear().type(filtro)
    cy.get('.SearchBar__inputcontainer > :nth-child(2) > :nth-child(1) > a').should('not.be.disabled').as('result')
    cy.get('@result').contains(filtro, { matchCase: false })
    cy.get('@result').should('not.be.disabled').click()
})


Cypress.Commands.add('filterMainError', (filtro) => {
    cy.get('input[class*="SearchBar"][type="text"]').should('be.visible').clear().type(filtro)
    cy.get('.SearchBar__inputcontainer > div > div > div').should('not.be.disabled').as('result')
    cy.get('@result').contains('Não encontramos este termo, verifique a ortografia')
})


Cypress.Commands.add('filterMake', (marca) => {
    cy.get('.NavItem > form > :nth-child(3)')
    .then((res) => {

        if ((res.find(`.CardMake[title='${marca}']`)).length)
        {
            cy.get((`.CardMake[title='${marca}']`)).click()
        }
        else
        {    
            cy.get('.Filters__line__see-more').contains('Ver todas as marcas').click()
            cy.get('.Filters__container__group__title')
                .contains('Todas as Marcas')
                .parent()
                .find(`[class*=Filters__line__result]`)
                .contains(`${marca}`, {matchCase: false}).click()
        }
    })
})


Cypress.Commands.add('filterModel', (modelo, filtro) => {
    cy.get(`.NavItem > form > :nth-child(3) > :nth-child(${filtro}) > :nth-child(2) > :nth-child(2)`).should('not.be.disabled').click()
    cy.get('.Filters__container__group__title')
        .contains('Todos os Modelos')
        .parent()
        .find(`[class*=Filters__line__result]`)
        .contains(`${modelo}`, {matchCase: false}).click()
})


Cypress.Commands.add('filterVersion', (versao, filtro) => {
    cy.get(`.NavItem > form > :nth-child(3) > :nth-child(${filtro}) > :nth-child(2) > :nth-child(3)`).should('not.be.disabled').click()
    cy.get('.Filters__container__title')
        .contains('Versões')
        .parent()
        .find(`[class*=Filters__line__result]`)
        .contains(`${versao}`, {matchCase: false}).click()
})


Cypress.Commands.add('miniFilterMake', (marca) => {
    cy.get('.NavItem > form > :nth-child(3)')
    .then((res) => {

        if ((res.find(`.CardMake[title='${marca}']`)).length)
        {
            cy.get((`.CardMake[title='${marca}']`)).click()
        }
        else
        {    
            cy.get('.Filters__line__see-more').contains('Ver todas as marcas').click()
            cy.get('.Form__field__label')
                .contains('Digite a marca desejada')
                .parent()
                .find(`[type="text"]`)
                .clear().type(marca)
            
            cy.get('.Filters__container__group__title')
                .contains('Todas as Marcas')
                .parent()
                .find(`[class*=Filters__line__result]`)
                .contains(`${marca}`, {matchCase: false}).click()
        }
    })
})


Cypress.Commands.add('miniFilterModel', (modelo, filtro) => {
    cy.get(`.NavItem > form > :nth-child(3) > :nth-child(${filtro}) > :nth-child(2) > :nth-child(2)`).should('not.be.disabled').click()
    
    cy.get('.Form__field__label')
        .contains('Digite o modelo desejado')
        .parent()
        .find(`[type="text"]`)
        .clear().type(modelo)
                
    cy.get('.Filters__container__group__title')
        .contains('Todos os Modelos')
        .parent()
        .find(`[class*=Filters__line__result]`)
        .contains(`${modelo}`, {matchCase: false}).click()
})


Cypress.Commands.add('miniFilterVersion', (versao, filtro) => {
    cy.get(`.NavItem > form > :nth-child(3) > :nth-child(${filtro}) > :nth-child(2) > :nth-child(3)`).should('not.be.disabled').click()
    
    cy.get('.Form__field__label')
        .contains('Digite a versão desejada')
        .parent()
        .find(`[type="text"]`)
        .clear().type(versao)

    cy.get('.Filters__container__title')
        .contains('Versões')
        .parent()
        .find(`[class*=Filters__line__result]`)
        .contains(`${versao}`, {matchCase: false}).click()
})


Cypress.Commands.add('addCar', () => {
    cy.get('div[class*="add-vehicle"]').should('not.be.disabled').click()
})

Cypress.Commands.add('miniFilterNoResults', (filtro) => {
    cy.get('.Filters__line__see-more').contains('Ver todas as marcas').click()

    cy.get('.Form__field__label')
                .contains('Digite a marca desejada')
                .parent()
                .find(`[type="text"]`)
                .clear().type(filtro)

    cy.get('[class*="Slide SlideLeft SlideLeft--opened"]').contains('Nenhum resultado')
})



//--------------------------------------//------------------------------------
// Deleções
//--------------------------------------//------------------------------------

Cypress.Commands.add('deleteMake1', () => {
    cy.get('.NavItem > form > :nth-child(3) > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('not.be.disabled').click()
})


Cypress.Commands.add('deleteModel1', () => {
    cy.get(`.NavItem > form > :nth-child(3) > :nth-child(2) > :nth-child(2) > :nth-child(2)`).should('not.be.disabled').click()
})


Cypress.Commands.add('deleteVersion1', () => {
    cy.get(`.NavItem > form > :nth-child(3) > :nth-child(2) > :nth-child(2) > :nth-child(3)`).should('not.be.disabled').click()
})


//--------------------------------------//------------------------------------
// Validações - filtros
//--------------------------------------//------------------------------------

Cypress.Commands.add('validateFilterMain', (filtro) => {
    cy.get('#FilterResultContainer').contains(filtro , {matchCase: false})
})


Cypress.Commands.add('validateFilterNotExistMain', (filtro) => {
    cy.get('#FilterResultContainer').should('not.contain', filtro, {matchCase: false})
})


//TODO Melhorar validação de dados nao existentes


//--------------------------------------//------------------------------------
// Validações - Contagem listagem
//--------------------------------------//------------------------------------

Cypress.Commands.add('countResults', () => {
    cy.get('[class="sc-cmthru jSUxTP"] [class="sc-cJSrbW bZZEdb"]')
    .then( res => {
        return res.length
    })
})


Cypress.Commands.add('validateTotalResults', () => {
    cy.wait(2000)
    cy.get('[data-test-id = "found-ads"] > p > :nth-child(1)').invoke('text').as('getTotalCount')
    .then(res => {
        
        if(res == '')
        {
            cy.wait(5000)
            cy.get('@getTotalCount')
        }
        else
        {
            return res
        }
    })
    
    cy.countResults()
    .then((res2) => {
        cy.get('@getTotalCount').should('have.contain', res2)    
    })
})


//--------------------------------------//------------------------------------
// Validações - Dados listagem
//--------------------------------------//------------------------------------

Cypress.Commands.add('validateResultMakeModel', (marcaModelo, urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
    .parentsUntil('.sc-cmthru.jSUxTP')
    .find('.sc-cJSrbW.bZZEdb .sc-uJMKN.hNiOat').contains(marcaModelo, {matchCase: false})
})


Cypress.Commands.add('validateResultValue', (marcaModelo, urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
    .parentsUntil('.sc-cmthru.jSUxTP')
    .find('.sc-cJSrbW.bZZEdb .sc-kvZOFW.knsOia').contains(marcaModelo, {matchCase: false})
})


Cypress.Commands.add('validateResultVersion', (versao, urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('.sc-cJSrbW.bZZEdb .sc-bbmXgH.fEaLmM').contains(versao, {matchCase: false})
})


Cypress.Commands.add('validateResultYear', (ano, urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('.sc-cJSrbW.bZZEdb .sc-dNLxif.xTPZF')
        .contains(ano, {matchCase: false})
})


Cypress.Commands.add('validateResultKM', (quilometragem, urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('.sc-cJSrbW.bZZEdb .sc-dNLxif.xTPZF')
        .contains(quilometragem, {matchCase: false})
})


Cypress.Commands.add('validateResultCity', (cidade, urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('.sc-cJSrbW.bZZEdb .sc-frDJqD.cXlpPT')
        .contains(cidade, {matchCase: false})
})


Cypress.Commands.add('validateResultCarDelivery', (urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('[data-test-component="stamp_cardelivery"]')
        .should('be.exist')

    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('[data-test-component="seal_cardelivery"]')
        .should('be.exist')
})


Cypress.Commands.add('validateResultTrocaTroco', (urlImg) => {
    cy.get(`[src*="${urlImg}"]`)
        .parentsUntil('.sc-cmthru.jSUxTP')
        .find('[data-test-component="seal_trocatroco"]')
        .should('be.exist')
})