// @ts-check
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import * as util from './util.js';
import * as builder from './postbuilder';

let tabs = document.querySelectorAll(".tab");
let tabContent = document.querySelectorAll(".content");

let copyBtns = document.querySelectorAll(".copy-btn");

copyBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    util.copyContent(this.getAttribute("id"));
  })
})

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

buildStdSignupPost();

function buildStdSignupPost() {
  const stdDropDays = [1, 3, 5];

  const contractDay = util.getNextContractDropDate(stdDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;
  
  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = util.formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = "Non-ultra";

  let post1 = document.querySelector("#stdcopybox1");
  let post2 = document.querySelector("#stdcopybox2");
  let post3 = document.querySelector("#stdcopybox3");
  let post4 = document.querySelector("#stdcopybox4");

  post1.innerHTML = builder.std_signup(discordTime);
  post2.innerHTML = builder.plus_one_reaction(discordTime);
  post3.innerHTML = builder.plus_six_reaction(discordTime);
  post4.innerHTML = builder.plus_twelve_reaction(discordTime);
}

function buildAGSignupPost() {
  const AGDropDays = [1, 3];
  
  const contractDay = util.getNextContractDropDate(AGDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = util.formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = "Non-ultra";
  
  let post1 = document.querySelector("#agcopybox1");
  let post2 = document.querySelector("#agcopybox2");

  post1.innerHTML = builder.any_grade_notice(discordTime);
  post2.innerHTML = builder.any_grade_signup(discordTime);
}

function buildUltraSignupPost() {
  const ultraDropDays = [5];

  let contractDay = util.getNextContractDropDate(ultraDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = util.formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = "Ultra";

  let post1 = document.querySelector("#ultracopybox1");
  let post2 = document.querySelector("#ultracopybox2");
  let post3 = document.querySelector("#ultracopybox3");
  let post4 = document.querySelector("#ultracopybox4");

  post1.innerHTML = builder.ultra_signup(discordTime);
  post2.innerHTML = builder.plus_one_reaction(discordTime);
  post3.innerHTML = builder.plus_six_reaction(discordTime);
  post4.innerHTML = builder.plus_twelve_reaction(discordTime);
}

function buildSRSignupPost() {
  const SRDropDays = [0, 1, 3, 5];

  let contractDay = util.getNextContractDropDate(SRDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;
  let isSunday = contractDay.getUTCDay() == 0;

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = util.formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = isSunday ? "Ultra" : "Non-ultra";

  let post1 = document.querySelector("#srcopybox1");
  let post2 = document.querySelector("#srcopybox2");
  let post3 = document.querySelector("#srcopybox3");

  post1.innerHTML = builder.sr_signup(discordTime, isSunday);
  post2.innerHTML = builder.sr_reminder(isSunday);
  post3.innerHTML = builder.sr_react_cmd();
}

function buildFRSignupPost() {
  const FRDropDays = [1, 3, 5];

  let contractDay = util.getNextContractDropDate(FRDropDays);
  let dropMS = contractDay.getTime();
  let discordTime = dropMS / 1000;
  let isNotFriday = contractDay.getUTCDay() != 5;
  
  let ultraDiv = document.querySelector("#ultraFRBoxGroup");
  ultraDiv.classList.remove("noultrafr");
  if (isNotFriday) {
    ultraDiv.classList.add("noultrafr");
  }

  let ultraFRPost1 = document.querySelector("#ultrafrcopybox1");
  ultraFRPost1.innerHTML = builder.fr_signup(discordTime, true);

  let nextContractDropText = document.querySelector("#nextcontract");
  nextContractDropText.innerHTML = util.formatDate(contractDay);
  let nextContractType = document.querySelector("#contracttype");
  nextContractType.innerHTML = isNotFriday ? "Non-ultra" : "Both Ultra & non-ultra";

  let nonUltraFRPost1 = document.querySelector("#nonultrafrcopybox1");
  let nonUltraFRPost2 = document.querySelector("#nonultrafrcopybox2");
  let nonUltraFRPost3 = document.querySelector("#nonultrafrcopybox3");
  let nonUltraFRPost4 = document.querySelector("#nonultrafrcopybox4");
  
  nonUltraFRPost1.innerHTML = builder.fr_signup(discordTime, false);
  nonUltraFRPost2.innerHTML = builder.plus_one_reaction(discordTime);
  nonUltraFRPost3.innerHTML = builder.plus_six_reaction(discordTime);
  nonUltraFRPost4.innerHTML = builder.plus_twelve_reaction(discordTime);
}
