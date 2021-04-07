let cont

it.skip('Busca da pagina', () => {
    cy.filterMain('Fiat 500')
    cy.get('[class="sc-hMFtBS cVTeoI"]').then(res => {

        cont = res.length
  
        let found = false
        const timeout = 1000
        for(let i = 0; i<timeout && !found;i++){
            if(cont > 2){
                cy.window().scrollTo('bottom')
                found = false
            }
            else
            {
                cy.log('amém')
                found = true
            }
        }

        // switch (cy.get('[class="sc-hMFtBS cVTeoI"]').length)
        // {
        //     case (24):
        //         cy.log('entrou no laco')
        //         cy.window().scrollTo('bottom')
        //         break;
        //     case (48):
        //         cy.window().scrollTo('bottom')
        //         break;

        //     default:
        //         break;
        // }
    })
})
    

    // }cy.window().scrollTo('bottom')
    // cy.wait(2000)
    // cy.window().scrollTo('bottom')
    // cy.wait(2000)
    // cy.window().scrollTo('bottom')
    // cy.wait(2000)
    // cy.window().scrollTo('bottom')
    // cy.wait(2000)
    // cy.window().scrollTo('bottom')
    // cy.wait(2000)
    // cy.get('[class="sc-hMFtBS cVTeoI"]').then(res => {
    //     teste = res.length
    //     cy.log(teste)
    // })
    //.should('have.text', '478')
// });



it('teste', () => {

    cy.filterMain('Fiat 500')
    cy.get('[class="sc-hMFtBS cVTeoI"]').as('contagem')
    
    cy.get('@contagem').then(res => {
        
        let contAtual
        let cont = res.length

        cy.window().scrollTo('bottom')
        cy.wait(2000)
        cy.window().scrollTo('bottom')

        cy.get('@contagem')
        .then( res2 => {
            contAtual = res2.length
        })

        cy.wrap(contAtual).then(res => {
            cy.log(res)
        })

        cy.log(cont)
        cy.log(contAtual)

        // for(; res.length<contAtual;cont++){
        //     if(cont < contAtual){
        //         cy.log('quase la')
        //         cont = 15
        //     }
        // }
    })
})



it.only('teste agora vai', () => {
    cy.visit('/carros')

    cy.filterMain('Fiat 500')

    cy.testeReturn()
});



// it.only('Busca da pagina', () => {
//     cy.filterMain('Fiat 500')
//     // cy.get('[class="sc-hMFtBS cVTeoI"]').then(res => {
//     //     teste = res.length
//     //     cy.log(teste)
//     // })
//     cy.get('[class*="sc-hzDkRC gcWVAm"]')
//     //.its('value')
//     .then(res => {

//         teste = res.length
//         cy.log(teste)
//     })
//     //.should('have.text', '478')
// });


let qtd = []
let qtd2 = qtd[1]

Cypress.Commands.add('countResults', () => {
    cy.get('[class="sc-hMFtBS cVTeoI"]').as('contagem')
    cy.get('@contagem').then(res => {
        qtd.push(res.length)
        cy.log(qtd2)
    })

})


let el = []
let el2 = ''

Cypress.Commands.add('testeReturn', () => {
    cy.get('[class="sc-hzDkRC gcWVAm"]').invoke('text').then(res => {
        el.push(res)
        cy.log(el)
    })
})