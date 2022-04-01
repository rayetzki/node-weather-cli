import colors from 'colors';
import dedent from 'dedent';

function printError(error) {
  console.error(colors.bgRed(`Error: ${error}`));
}

function printSuccess(message) {
  console.log(colors.bgGreen(`Success: ${message}`));
}

function printHelp() {
  console.log(
    dedent(`
      ${colors.bgYellow(`Help:`)}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
    `)
  );
} 

function printWeather(weather, icon) {
  console.log(
    dedent(`
      ${colors.bgYellow(`ПОГОДА ${weather.name}:`)}
        ${icon} ${weather.weather[0].description}
          Температура: ${weather.main.temp} ℃
          Скорость ветра: ${weather.wind.speed} м\с
          Влажность: ${weather.main.humidity} %
    `)
  );
}

export { printError, printSuccess, printHelp, printWeather };