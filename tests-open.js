import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

const BASE_URL = __ENV.API_BASE;
const HEADERS = {'Content-Type': 'application/json'};

export default () => {
  group('Dia do Trabalhador', function() {
    // Do Oiapoque ao Chuí 01/05 é Dia do Trabalhador no Brasil
    let query1 = http.get(`${BASE_URL}/feriados/1600501/2020-05-01/`);
    check(query1, {
      'consulta no Oiapoque retorna status 200': (r) => r.status === 200
    });
    check(query1.json(),
      {
        'é Dia do Trabalhador no Oiapoque':
        (obj) => obj.name === 'Dia do Trabalhador',
      }
    );
    let query2 = http.get(`${BASE_URL}/feriados/4305439/2020-05-01/`);
    check(query2, {
      'consulta no Chuí retorna status 200': (r) => r.status === 200
    });
    check(query2.json(),
      {
        'é Dia do Trabalhador no Chuí':
        (obj) => obj.name === 'Dia do Trabalhador',
      }
    );
    // Não deve ser possível apagar um feriado nacional
    let delr = http.del(`${BASE_URL}/feriados/4305439/05-01/`);
    check(delr, {
      'tentar remover um feriado nacional no município retorna status 403':
      (r) => r.status === 403,
    });
  });
  group('Consciência Negra RJ', function() {

    // Cadastro do feriado estadual
    const payload = JSON.stringify({
      name: "Consciência Negra",
    });
    let register = http.put(`${BASE_URL}/feriados/33/11-20/`, payload, { headers: HEADERS });
    check(register, {
      'cadastro retorna status 200 ou 201':
      (r) => [200, 201].includes(r.status),
    });

    // Consulta do feriado no estado
    let query1 = http.get(`${BASE_URL}/feriados/33/2020-11-20/`);
    check(query1, {
      'consulta no estado retorna status 200': (r) => r.status === 200
    });
    check(query1.json(),
      {
        'consulta no estado retorna o dia da Consciência Negra':
        (obj) => obj.name === 'Consciência Negra',
      }
    );

    // Consulta do feriado na capital
    let query2 = http.get(`${BASE_URL}/feriados/3304557/2020-11-20/`);
    check(query2, {
      'consulta na capital retorna status 200': (r) => r.status === 200
    });
    check(query2.json(),
      {
        'consulta na capital retorna o dia da Consciência Negra':
        (obj) => obj.name === 'Consciência Negra',
      }
    );

    // Não deve ser possível apagar um feriado estadual a partir
    // de um município
    let del1 = http.del(`${BASE_URL}/feriados/3304557/11-20/`);
    check(del1, {
      'tentar remover o feriado na capital retorna status 403':
      (r) => r.status === 403,
    });

    // Remoção do feriado estadual funciona como esperado
    let del2 = http.del(`${BASE_URL}/feriados/33/11-20/`);
    check(del2, {
      'remover o feriado estadual retorna status 204':
      (r) => r.status === 204,
    });

    sleep(1);
  });
  group('Sexta-Feira Santa', function() {
    let query = http.get(`${BASE_URL}/feriados/2111300/2020-04-10/`);
    check(query, {
      'consulta retorna status 200': (r) => r.status === 200
    });
    check(query.json(),
      {
        'é Sexta-Feira Santa em São Luís':
        (obj) => obj.name === 'Sexta-Feira Santa',
      }
    );
  });
  group('Corpus Christi Ouro Preto', function () {
    // Cadastro de feriado móvel municipal
    let register = http.put(`${BASE_URL}/feriados/3146107/corpus-christi/`, { headers: HEADERS });
    check(register, {
      'cadastro retorna status 200 ou 201':
      (r) => [200, 201].includes(r.status),
    });

    // Consulta feriado móvel municipal
    let query1 = http.get(`${BASE_URL}/feriados/3146107/2020-06-11/`);
    check(query1, {
      'consulta deve retornar 200': (r) => r.status === 200
    });
    check(query1.json(),
      {
        'é Corpus Christi em Ouro Preto em 2020':
        (obj) => obj.name === 'Corpus Christi',
      }
    );

    // Consulta feriado móvel municipal
    let query2 = http.get(`${BASE_URL}/feriados/3146107/2021-06-03/`);
    check(query2, {
      'consulta deve retornar 200': (r) => r.status === 200
    });
    check(query2.json(),
      {
        'é Corpus Christi em Ouro Preto em 2021':
        (obj) => obj.name === 'Corpus Christi',
      }
    );
  });
}
