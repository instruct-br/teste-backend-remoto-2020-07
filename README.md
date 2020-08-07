# Teste Técnico Backend Developer [REMOTO]

Neste repositório você encontra o enunciado do teste técnico para a vaga de
_Backend Developer [REMOTO]_ da [Instruct](https://instruct.com.br/)! Você
provavelmente chegou aqui através da indicação de alguma pessoa da empresa após
passar pelas [outras etapas](https://instruct.com.br/trabalhe-com-a-gente/processo-de-selecao/)
do processo seletivo. Se este não for o seu caso e mesmo assim você implementar
alguma solução para este exercício ele **não** será avaliado.

> Você _pode_ usar o problema descrito aqui para exercitar suas habilidades de
> desenvolvimento, mas a sua solução será avaliada por alguém da Instruct
> **apenas se** você estiver no processo seletivo da vaga de _Backend
> Developer [REMOTO]_.

Se você tiver interesse em se candidatar para uma vaga da Instruct siga as
instruções no site: https://instruct.com.br/trabalhe-com-a-gente/

Nessa página você encontra as vagas abertas hoje e todos os detalhes de nosso
processo seletivo. Se você não encontrou uma vaga que pareça adequada confira a
página novamente em um ou dois meses, ela é atualizada com certa frequência. 😉

## O problema

A _Corporação Colossal ™_ é uma empresa com milhares de funcionários e filiais
distribuídas em diversas cidades do Brasil. Funcionários da _Corporação
Colossal_, estão distribuídos nessas filiais em diversos municípios e seguem
as respectivas agendas de feriados municipais.

Uma das estratégias da marca é o atendimento rápido e eficiente ao consumidor.
Hoje a empresa paga um adicional em feriados do Rio de Janeiro para que tenha
atendentes suficientes nesses dias. O atendimento está centralizado nessa
cidade e seus funcionários absorvem toda a demanda de atendimento ao cliente do
país.

Esse atendimento poderia ser feito de qualquer cidade, não necessariamente de
apenas uma das filiais. Um projeto da empresa com objetivo de reduzir gastos
com atendimento é distribuir os chamados entre as suas filiais para que algum
funcionário faça esse atendimento. Dessa forma pode ser possível evitar o
pagamento de adicional de feriado em feriados municipais e estaduais.

## Feriados

No Brasil existem feriados nacionais, estaduais e municipais. Além disso
alguns feriados não possuem uma data fixa, ou seja, cada ano esses feriados
caem em dias diferentes. Os _Feriados Móveis_ são: Carnaval, Sexta-Feira Santa,
Páscoa e Corpus Christi. Três desses feriados são determinados a partir da data
da Páscoa.

A sexta-feira santa é um feriado nacional, mas as regras do Carnaval e Corpus
Christi variam de acordo com o município.

Regras dos feriados móveis:
- A terça-feira de carnaval ocorre 47 dias antes do domingo de Páscoa
- corpus christi ocorre 60 dias após o domingo de Páscoa
- A sexta-feira santa ocorre 2 dias antes do domingo de Páscoa

A Páscoa é celebrada no primeiro domingo após a primeira lua cheia que ocorre
depois do equinócio de Outono (março). A data em que esse dia cai em um
determinado ano pode ser calculada com o [Algoritmo de Meeus](https://pt.wikipedia.org/wiki/C%C3%A1lculo_da_P%C3%A1scoa#Algoritmo_de_Meeus/Jones/Butcher).
O pseudo-código do algoritmo é o seguinte:
```
 a = ANO MOD 19
 b = ANO \ 100
 c = ANO MOD 100
 d = b \ 4
 e = b MOD 4
 f = (b + 8) \ 25
 g = (b - f + 1) \ 3
 h = (19 × a + b - d - g + 15) MOD 30
 i = c \ 4
 k = c MOD 4
 L = (32 + 2 × e + 2 × i - h - k) MOD 7
 m = (a + 11 × h + 22 × L) \ 451
 MÊS = (h + L - 7 × m + 114) \ 31
 DIA = 1+ (h + L - 7 × m + 114) MOD 31
```

Em que `\` é uma divisão de inteiro, ou seja, `7 \ 3 = 2`.

Os feriados nacionais com data fixa são:

- 01/01 Ano Novo
- 21/04 Tiradentes
- 01/05 Dia do Trabalhador
- 07/09 Independência
- 12/10 Nossa Senhora Aparecida
- 02/11 Finados
- 15/11 Proclamação da República
- 25/12 Natal

O dia da Consciência Negra também é outra exceção peculiar. É um "dia
comemorativo" nacional, mas não é considerado um feriado nacional; esse dia é
decretado feriado municipal em milhares de cidades e é feriado estadual em
alguns estados.

## Solução

Para resolver esse problema você deve desenvolver uma API que permita consultar
e cadastrar feriados estaduais e municipais.

O endpoint para consultar feriados deve seguir o seguinte formato:
```
/feriados/CODIGO-IBGE/ANO-MES-DIA/
```

Onde CODIGO-IBGE pode ser um número de dois dígitos, para representar um
feriado estadual ou um número com 7 dígitos para representar um feriado
municipal.

O MES deve ser um mês válido, ou seja, entre 1 e 12. Mesmo cuidado deve ser
tomado com o dia. Espere um ano com 4 números, mês com 2 números e dia também
com 2 números, ou seja, "AAAA-MM-DD".

A sua API deve ser populada com os feriados nacionais. Todos os feriados
estaduais e municipais consultados nos testes serão criados através da API.

Esse endpoint deve responder os seguintes verbos: GET, PUT e DELETE.

Para simplificar o problema, assuma que pode haver no máximo 1 feriado por dia
em cada município, e que serão feitas consultas apenas em dias de semana, ou
seja, de segunda a sexta.

O comportamento esperado do GET é que ele retorne status 200 e o nome do
feriado se existir um feriado no dia especificado.

Exemplo buscando o dia 20 de Novembro no estado do Rio de Janeiro:
```
GET /feriados/33/2020-11-20/
{
    "name": "Consciência Negra"
}
```

Se não houver um feriado no dia para o estado ou município consultado a API
deve retornar 404.

O cadastro de um feriado estadual ou municipal segue estrutura semelhante
à consulta, mas não contém o ano, apenas o mês e dia do feriado.

Exemplo de cadastro do aniversário de São Paulo SP no dia 25 de Janeiro:
```
PUT /feriados/3550308/01-25/
{
    "name": "Aniversário da cidade de São Paulo"
}
```

A API deve retornar o status 200 para indicar que a requisição foi bem
sucedida. Opcionalmente ela pode retornar 201 se esse feriado ainda não estava
cadastrado na base. Se já existir um feriado cadastrado neste dia para o estado
ou município especificado, o nome do feriado deve ser atualizado.

Deve haver também a opção de apagar um feriado.

Exemplo de remoção do aniversário de São Paulo:
```
DELETE /feriados/3550308/01-25/
```

O endpoint deve retornar 404 se esse feriado não existir ou 204 se a requisição
foi aceita e o feriado removido com sucesso.

Uma tentativa de remover um feriado estadual num município deve retornar 403.
Uma tentativa de remover um feriado nacional em um município ou em uma unidade
federativa também deve retornar 403.

O cadastro e remoção de feriados móveis deve ter uma assinatura diferente. No
lugar do dia, é passado o nome do feriado após o código do ibge.

Exemplos:
```
PUT /feriados/5108402/carnaval/
PUT /feriados/4312658/corpus-christi/
```
As requisições acima marcam que a terça-feira de carnaval é feriado em Várzea
Grande e corpus christi é feriado em Não-Me-Toque

No exemplo abaixo a terça-feira de carnaval deixa de ser considerado feriado
em Várzea Grande:
```
DELETE /feriados/5108402/carnaval/
```

## Dados disponíveis

Neste repositório você encontra um csv chamado `municipios-2019.csv` com o
registro de 5.570 municípios brasileiros em 2019 [extraído do site do
IBGE](https://www.ibge.gov.br/explica/codigos-dos-municipios.php).
Esse csv tem duas colunas: uma com o código do IBGE para cada município e um
com o nome do município.

Note que os dois primeiros dígitos desse código do IBGE indica qual é o estado
do município. A seguir uma tabela com a relação estado/prefixo também extraída
do site do IBGE:

|Prefixo|UF|
|-------|--|
|     12|AC|
|     27|AL|
|     16|AP|
|     13|AM|
|     29|BA|
|     23|CE|
|     53|DF|
|     32|ES|
|     52|GO|
|     21|MA|
|     51|MT|
|     50|MS|
|     31|MG|
|     15|PA|
|     25|PB|
|     41|PR|
|     26|PE|
|     22|PI|
|     33|RJ|
|     24|RN|
|     43|RS|
|     11|RO|
|     14|RR|
|     42|SC|
|     35|SP|
|     28|SE|
|     17|TO|

A lista de feriados nacionais que deve ser usada foi apresentada na seção
_Feriados_. Os feriados estaduais e municipais de interesse serão cadastrados
na API que você desenvolver.

## Avaliação

Num primeiro momento nós não iremos olhar o seu código. O projeto será testado
de forma automatizada e se ele passar nos testes você receberá um e-mail
comunicando que irá para a etapa da entrevista técnica.

Portanto você deve codificar seu projeto em Javascript ou Python e fazer deploy
dele usando os recursos disponibilizados no _Frees Tiers_ da [Heroku](https://www.heroku.com/).
Isso significa que sua API deverá rodar num ambiente virtualizado com
[512 MB de RAM](https://www.heroku.com/dynos) e um banco de dados PostgreSQL
com um [limite de 10.000 linhas](https://elements.heroku.com/addons/heroku-postgresql#pricing).

Quando você finalizar a implementação adicione o usuário com e-mail
`jobs@instruct.com.br` como colaborador do app publicado até o fim do prazo
estipulado. A partir disso conseguimos o endereço em que sua API está publicada
e seguimos com os testes automatizados.

Nós executaremos três conjuntos de testes na sua API:

1. Testes básicos (abertos)
2. Testes avançados (fechados)
3. Testes extras (fechados)

Se a API não passar nos testes básicos, faremos mais duas tentativas. Se
mesmo assim ela não passar nos testes básicos nós encerramos os testes.

Se a API passar nos testes básicos e não passar nos testes avançados, faremos
mais duas tentativas. Se mesmo assim ela não passar nos testes avançados nós
encerramos os testes.

Se a API passar pelos testes avançados você já garantiu a sua participação na
próxima etapa do processo, mesmo assim vamos executar os testes extras para
avaliar mais alguns pontos da sua solução.

Os testes básicos estão disponíveis neste repositório no arquivo
`tests-open.js` e é recomendado que você os use durante o desenvolvimento para
avaliar se a sua API está correta. Como explicado acima, você **não passará**
para a próxima etapa se a sua solução não atender todos os testes desse
arquivo. Use as verificações presentes nele para guiar o desenvolvimento da sua
solução.

Você pode executar esses testes com o [k6](https://k6.io/). Para instalar o k6
basta [baixar o binário](https://github.com/loadimpact/k6/releases) para o seu
sistema operacional (Windows, Linux ou Mac).

E para rodar os testes abertos especificar a variável de ambiente "API_BASE"
com o endereço base da API testada.

Exemplo de aplicação rodando no localhost na porta 8000:
```
k6 run -e API_BASE='http://localhost:8000' tests-open.js
```

---

**Boa sorte!**
