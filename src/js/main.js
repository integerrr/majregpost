// @ts-check
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const ONE_HOUR_IN_SECONDS = 60 * 60;

let tabs = document.querySelectorAll(".tab");
let tabContent = document.querySelectorAll(".content");

buildStdSignupPost();

tabs.forEach(tab => {
  tab.addEventListener("click", function() {
    tabs.forEach(item => {
      item.classList.remove("active");
    });
    this.classList.add("active");
    let tabName = this.getAttribute("data-tab");
    selectTabContent(tabName);
    updateSignupTabs(tabName);
  });

  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName)
        ? item.classList.add("active")
        : item.classList.remove("active");
    });
  }
  
  function updateSignupTabs(tabName) {
    switch (tabName) {
      case "std":
        buildStdSignupPost();
        break;
      case "anygrade":
        buildAGSignupPost();
        break;
      case "ultra":
        buildUltraSignupPost();
        break;
      case "sr":
        buildSRSignupPost();
        break;
      case "fr":
        buildFRSignupPost();
        break;
      default:
        break;
    }
  }
});

/**
 * @param {number[]} dropDays
 */
function getNextContractDropDate(dropDays) {
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
function formatDate(targetDate) {
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

function buildStdSignupPost() {
  const stdDropDays = [1, 3, 5];

  const contractDay = getNextContractDropDate(stdDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;
  
  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = "Non-ultra";

  let post1 = document.querySelector("#stdcopybox1");
  post1.value = 
`---------------------------------------
# <:grade_aaa:1116157518138322964> <:grade_aa:1116157492917960836> <:grade_a:1116157466611298414> <:grade_b:1116157427751071805> <:grade_c:1116157383895437312>
## Signups for today's contract drop at <t:${discordTime}:f>

This registration is for all grades! You will be assigned to your current grade automatically.

**You must meet minimum and complete the contract in your assigned coop if you register.**

Timeslot Signups:
React to the best timeslot for your schedule. You must join your coop group within 5 hours of the coop starting.`;

  let post2 = document.querySelector("#stdcopybox2");
  post2.value = `:SparkleR: React with this to start at <t:${discordTime + ONE_HOUR_IN_SECONDS}:t> - 1 hour after Contract Drop.`;

  let post3 = document.querySelector("#stdcopybox3");
  post3.value = `:SparkleL: React with this to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 6}:t> - 6 hours after Contract Drop.`;

  let post4 = document.querySelector("#stdcopybox4");
  post4.value = `:SparkleE: React with this to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 12}:t> - 12 hours after Contract Drop.`;
}

function buildAGSignupPost() {
  const AGDropDays = [1, 3];
  
  const contractDay = getNextContractDropDate(AGDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = "Non-ultra";
  
  let post1 = document.querySelector("#agcopybox1");
  post1.value = 
`---------------------------------------
## <:grade_any:1131340627171365027>  Any Grade Buddy Run  <:grade_any:1131340627171365027> 
For todays contractdrop at <t:${discordTime}:f> we are hosting another **Any Grade Buddy run**! If you are interested to take part in it, head over to https://discord.com/channels/455380663013736479/1135585986068369418/1181583233016659998 for the signups and check here https://discord.com/channels/455380663013736479/1135585986068369418/1170547280038854716 for some information on how to participate!

### DO NOT SIGN UP FOR REGULAR MAJEGGSTICS RUNS, IF YOU ARE JOINING THE ANY GRADE RUN!
_ _
<a:Penguin1:1138223062077145159><a:Penguin2:1138223182411735081><a:Penguin3:1138223279950266418><a:Penguin4:1138223343930200165>
_ _`;

  let post2 = document.querySelector("#agcopybox2");
  post2.value = 
`# <:grade_any:1131340627171365027>  Any Grade Sign Ups <:grade_any:1131340627171365027> for <t:${discordTime}:F> (<t:${discordTime}:R>)
## Register by: <t:${discordTime + ONE_HOUR_IN_SECONDS / 2}:t>    (<t:${discordTime + ONE_HOUR_IN_SECONDS / 2}:R>)

Coop Starts at +1hr: <t:${discordTime + ONE_HOUR_IN_SECONDS}:t>    (<t:${discordTime + ONE_HOUR_IN_SECONDS}:R>)

Information and Expectations: https://discord.com/channels/455380663013736479/1135585986068369418/1170553293727084675

** DO NOT REGISTER FOR BOTH THIS AND REGULAR MAJ RUNS. ** 
** That would put you in violation of regular Maj registration policies. **

Late Requests are subject to availability.

To register, please react to this post accordingly.
💪 **Sponsor**    |    🙏 **Protégé**`;
}

function buildUltraSignupPost() {
  const ultraDropDays = [5];

  let contractDay = getNextContractDropDate(ultraDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = "Ultra";

  let post1 = document.querySelector("#ultracopybox1");
  post1.value = 
`## <:ultra_subscription:1134480287292727377> <:grade_any:1131340627171365027>  Signups for today's __ULTRA__ contract drop at <t:${discordTime}:f> <:grade_any:1131340627171365027> <:ultra_subscription:1134480287292727377>
<:blank:846622384739057684> 
This registration is for the ULTRA only Leggacy Contract. This contract will be run as an **ANYGRADE**, so please make sure you follow instructions when given.

This contract is for **ULTRA SUBSCRIBERS ONLY**, so please only signup if you have a subscription.

**You must meet minimum and complete the contract in your assigned coop if you register.**

Timeslot Signups:
React to the best timeslot for your schedule. You must join your coop group within 5 hours of the coop starting.`;

  let post2 = document.querySelector("#ultracopybox2");
  post2.value = `:SparkleR: React with this to start at <t:${discordTime + ONE_HOUR_IN_SECONDS}:t> - 1 hour after Contract Drop.`;

  let post3 = document.querySelector("#ultracopybox3");
  post3.value = `:SparkleL: React with this to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 6}:t> - 6 hours after Contract Drop.`;

  let post4 = document.querySelector("#ultracopybox4");
  post4.value = `:SparkleE: React with this to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 12}:t> - 12 hours after Contract Drop.`;
}

function buildSRSignupPost() {
  const SRDropDays = [0, 1, 3, 5];

  let contractDay = getNextContractDropDate(SRDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;
  let isSunday = contractDay.getUTCDay() == 0;

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = isSunday ? "Ultra" : "Non-ultra";

  let post1 = document.querySelector("#srcopybox1");
  post1.value =
`## <:Majeggstic:849350424712839168> Speedrun signups for __${isSunday ? "ULTRA" : "NON-ULTRA"}__ leggacy contract at <t:${discordTime}:f> <:Majeggstic:849350424712839168> 

This registration is for Speed Running. Please make sure you are caught up with the rules and guidelines that we have provided. The information hub can be found here: https://discord.com/channels/455380663013736479/1151593648539054100/1152059522907656242

**If you decide you do not want to run the contract, you must remove your reactions before the contract is released. After co-ops are created, you are expected to join and complete the contract in your assigned co-op at the assigned time.**

Timeslot Signups: jump [here](<https://discord.com/channels/455380663013736479/1151593648539054100/1172946026475307019>) for a detail explanation about this signup process
React to the timeslots you will be available to __start__ at, where each number is how many hours after contract drop (<t:${discordTime}:t>). **Your selected timeslots are the START time and does NOT account for time taken to farm tokens, which is typically ~90 minutes**. We expect all members who sign up for a timeslot to begin being active in their assigned thread within **15 minutes** of their allotted start time.
*🕚  = +11*
*🕛  = +12*`;

  let post2 = document.querySelector("#srcopybox2");
  post2.value =
    `## Reminder that this contract is being run as a __Speed Run__ for the __${isSunday ? "ULTRA" : "NON-ULTRA"}__ contract`

  let post3 = document.querySelector("#srcopybox3");
  post3.value = 
    `!?react (insert above message ID here) :zero: :one: :two: :three: :four: :five: :six: :seven: :eight: :nine: :keycap_ten: :clock11: :clock12:`;
}

function buildFRSignupPost() {
  const FRDropDays = [1, 3, 5];

  let contractDay = getNextContractDropDate(FRDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;
  let isNotFriday = contractDay.getUTCDay() != 5;
  
  let ultraDiv = document.querySelector("#ultraFRBoxGroup");
  ultraDiv.classList.remove("noultrafr");
  if (isNotFriday) {
    ultraDiv.classList.add("noultrafr");
  }

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = isNotFriday ? "Non-ultra" : "Both Ultra & non-ultra";

  let nonUltraFRPost1 = document.querySelector("#nonultrafrcopybox1");
  let nonUltraFRPost2 = document.querySelector("#nonultrafrcopybox2");
  let nonUltraFRPost3 = document.querySelector("#nonultrafrcopybox3");
  let nonUltraFRPost4 = document.querySelector("#nonultrafrcopybox4");
  
  nonUltraFRPost1.value =
`_ _
_ _
_ _
## <:Majeggstic:849350424712839168> Fastrun signups for legacy __NON-ULTRA__ contract at <t:${discordTime}:f>  <:Majeggstic:849350424712839168> 
_ _
This registration is for Fast Running. Fast Runs are a little different to Speed Runs, so please make sure you are caught up with the rules and guidelines that we have provided. More information on Fast Runs can be found here: https://canary.discord.com/channels/455380663013736479/1151593648539054100/1156333094052315146

**If you decide you do not want to run the contract, you must remove your reaction before we create co-ops. After co-ops are created, you are expected to complete the contract in your assigned co-op.**

Timeslot Signups:
React to the timeslot you will be available for. We expect all members who sign up for a timeslot to begin being active in their assigned thread within **1 hour** of thread creation.
_ _`;
  nonUltraFRPost2.value = `<:SparkleR:> React with this if you want to start at <t:${discordTime + ONE_HOUR_IN_SECONDS}:t> - 1 hour after Contract Drop.`;
  nonUltraFRPost3.value = `<:SparkleL:> React with this if you want to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 6}:t> - 6 hours after Contract Drop.`;
  nonUltraFRPost4.value = `<:SparkleE:> React with this if you want to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 12}:t> - 12 hours after Contract Drop.`;

  let ultraFRPost1 = document.querySelector("#ultrafrcopybox1");
  let ultraFRPost2 = document.querySelector("#ultrafrcopybox2");
  let ultraFRPost3 = document.querySelector("#ultrafrcopybox3");
  let ultraFRPost4 = document.querySelector("#ultrafrcopybox4");
  
  ultraFRPost1.value =
`## <:Majeggstic:849350424712839168> Fastrun signups for legacy __ULTRA__ contract at <t:${discordTime}:f>  <:Majeggstic:849350424712839168> 
This registration is for Fast Running. Fast Runs are a little different to Speed Runs, so please make sure you are caught up with the rules and guidelines that we have provided. More information on Fast Runs can be found here: https://canary.discord.com/channels/455380663013736479/1151593648539054100/1156333094052315146

**If you decide you do not want to run the contract, you must remove your reaction before we create co-ops. After co-ops are created, you are expected to complete the contract in your assigned co-op.**

Timeslot Signups:
React to the timeslot you will be available for. We expect all members who sign up for a timeslot to begin being active in their assigned thread within **1 hour** of thread creation.
_ _`;
  ultraFRPost2.value = `<:SparkleR:> React with this if you want to start at <t:${discordTime + ONE_HOUR_IN_SECONDS}:t> - 1 hour after Contract Drop.`;
  ultraFRPost3.value = `<:SparkleL:> React with this if you want to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 6}:t> - 6 hours after Contract Drop.`;
  ultraFRPost4.value = `<:SparkleE:> React with this if you want to start at <t:${discordTime + ONE_HOUR_IN_SECONDS * 12}:t> - 12 hours after Contract Drop.`;
}