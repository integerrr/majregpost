export const ONE_HOUR_IN_SECONDS = 60 * 60;

/**
 * @param {number[]} dropDays
 */
export function getNextContractDropDate(dropDays) {
  let targetDate = new Date();
  let dayOfWeek = -1;
  let index = dropDays.findIndex(element => {
    return targetDate.getUTCDay() <= element ? true : false;
  });
  index = (index == -1) ? 0 : index;
  dayOfWeek = dropDays[index];

  targetDate.setUTCDate(targetDate.getUTCDate() + ((dayOfWeek + 7 - targetDate.getUTCDay()) % 7));

  let currentYr = targetDate.getFullYear();
  let PacificTimeOffset = 8;

  // 2 because month is fucking 0-indexed but day ISNT
  let marchPDT = new Date(currentYr, 2, 1,);
  marchPDT.setUTCDate(marchPDT.getUTCDate() + ((7 - marchPDT.getUTCDay()) % 7) + 7);
  let novPST = new Date(currentYr, 10, 1);
  novPST.setUTCDate(novPST.getUTCDate() + ((7 - novPST.getUTCDay()) % 7));

  if (targetDate >= marchPDT && targetDate <= novPST) {
    PacificTimeOffset = 7;
  }
  targetDate.setUTCHours(9 + PacificTimeOffset, 0, 0, 0);
  return targetDate;
}

/**
 * @param {Date} targetDate
 */
export function formatDate(targetDate) {
  let dayOfWeekString = "";
  let monthString = "";

  switch (targetDate.getDay()) {
    case 0:
      dayOfWeekString = "Sunday";
      break;
    case 1:
      dayOfWeekString = "Monday";
      break;
    case 2:
      dayOfWeekString = "Tuesday";
      break;
    case 3:
      dayOfWeekString = "Wednesday";
      break;
    case 4:
      dayOfWeekString = "Thursday";
      break;
    case 5:
      dayOfWeekString = "Friday";
      break;
    case 6:
      dayOfWeekString = "Saturday";
      break;
    default:
      break;
  }

  switch (targetDate.getMonth()) {
    case 0:
      monthString = "January";
      break;
    case 1:
      monthString = "February";
      break;
    case 2:
      monthString = "March";
      break;
    case 3:
      monthString = "April";
      break;
    case 4:
      monthString = "May";
      break;
    case 5:
      monthString = "June";
      break;
    case 6:
      monthString = "July";
      break;
    case 7:
      monthString = "August";
      break;
    case 8:
      monthString = "September";
      break;
    case 9:
      monthString = "Oktojer";
      break;
    case 10:
      monthString = "November";
      break;
    case 11:
      monthString = "December";
      break;
    default:
      break;
  }

  return `${dayOfWeekString}, ${monthString} ${targetDate.getDate()}, ${targetDate.getFullYear()} ${targetDate.toLocaleTimeString()}`;
}
