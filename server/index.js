const http = require('http');
const url = require('url');

const port = 8080;
const carInfoPath = '/api/v1/car-info/';
const carNumberRegExp = /^[A-ZА-Я]{2}[0-9]{4}[A-ZА-Я]{2}$/;

const dataMap = [
  {owner: "Аистов Кирилл Константинович",	year: 2015, crashesCount: 0, ownersCount: 1},
  {owner: "Аллаяров Руслан Садуллаевич",	year: 2008, crashesCount: 5, ownersCount: 5},
  {owner: "Анисеня Иван Ильич",			year: 2010, crashesCount: 2, ownersCount: 1},
  {owner: "Байдин Никита Константинович",	year: 2015, crashesCount: 0, ownersCount: 2},
  {owner: "Басова Александра Ильинична",	year: 2010, crashesCount: 3, ownersCount: 2},
  {owner: "Воротников Алексей Сергеевич",	year: 2008, crashesCount: 0, ownersCount: 4},
  {owner: "Гордеева Ангелина Сергеевна",	year: 2015, crashesCount: 2, ownersCount: 4},
  {owner: "Горелова Анна Антоновна",		year: 2002, crashesCount: 0, ownersCount: 1},
  {owner: "Демидова Анна Андреевна",		year: 2015, crashesCount: 0, ownersCount: 2},
  {owner: "Кондратенков Борис Андреевич",	year: 2010, crashesCount: 3, ownersCount: 4},
  {owner: "Корчагин Никита Павлович",		year: 2015, crashesCount: 1, ownersCount: 5},
  {owner: "Манкевич Павел Владимирович",	year: 2008, crashesCount: 4, ownersCount: 1},
  {owner: "Нерсисян Степан Ашотович",		year: 2015, crashesCount: 8, ownersCount: 1},
  {owner: "Новосад Виктор Олегович",		year: 2010, crashesCount: 0, ownersCount: 1},
  {owner: "Петрова Александра Алексеевна",year: 2007, crashesCount: 2, ownersCount: 2},
  {owner: "Попов Юрий Анатольевич",		year: 2010, crashesCount: 3, ownersCount: 4},
  {owner: "Рыхова Александра Николаевна",	year: 2007, crashesCount: 5, ownersCount: 6},
  {owner: "Соколов Алан Георгьевич",		year: 2008, crashesCount: 1, ownersCount: 7},
  {owner: "Потапов Тимофей Адольфович",	year: 2010, crashesCount: 6, ownersCount: 2},
  {owner: "Копылов Кондрат Феликсович",	year: 2002, crashesCount: 6, ownersCount: 2},
  {owner: "Кузнецов Даниил Мартынович",	year: 2015, crashesCount: 2, ownersCount: 2},
  {owner: "Гусев Валерий Святославович",	year: 2002, crashesCount: 2, ownersCount: 1},
  {owner: "Мамонтов Алексей Агафонович",	year: 2015, crashesCount: 0, ownersCount: 2},
  {owner: "Смирнов Владимир Агафонович",	year: 2002, crashesCount: 1, ownersCount: 1},
];

const server = http.createServer((request, response) => {
  const pathname = url.parse(request.url).pathname;

  response.setHeader('Access-Control-Allow-Origin', '*');

  if (pathname.startsWith(carInfoPath)) {
    const carNumber = pathname.substr(carInfoPath.length);

    // invalid request
    if (!carNumberRegExp.test(carNumber)) {
      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({
        error: 'INVALID_CAR_NUMBER'
      }));
      return;
    }

    // success
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({
      result: dataMap[Math.floor(Math.random() * (dataMap.length + 1))]
    }));
    return;
  }

  // location not found
  response.statusCode = 404;
  response.end('');
});

server.listen(port, err => {
  if (err) {
    console.log('Some error has occurred:', err);
    return;
  }

  console.log(`Server is listening on ${port}`)
});