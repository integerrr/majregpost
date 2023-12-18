import * as util from './util'

const L_BRACKET = "&lt;";
const R_BRACKET = "&gt;";

export function plus_one_reaction(discordTime) {
  return `:SparkleR: React with this to start at ${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS}:t${R_BRACKET} - 1 hour after Contract Drop.`;
}

export function plus_six_reaction(discordTime) {
  return `:SparkleR: React with this to start at ${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS * 6}:t${R_BRACKET} - 6 hour after Contract Drop.`;
}

export function plus_twelve_reaction(discordTime) {
  return `:SparkleR: React with this to start at ${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS * 12}:t${R_BRACKET} - 12 hour after Contract Drop.`;
}

export function std_signup(discordTime) {
  return (`---------------------------------------
  # :grade_aaa: :grade_aa: :grade_a: :grade_b: :grade_c:
  ## Signups for today's contract drop at ${L_BRACKET}t:${discordTime}:f${R_BRACKET}

  This registration is for all grades! You will be assigned to your current grade automatically.
  
  **You must meet minimum and complete the contract in your assigned coop if you register.**
  
  Timeslot Signups:
  React to the best timeslot for your schedule. You must join your coop group within 5 hours of the coop starting.
  `).replace(/  +/g, '');
} 

export function any_grade_notice(discordTime) {
  return (`---------------------------------------
  ## :grade_any:  Any Grade Buddy Run  :grade_any: 
  For todays contractdrop at ${L_BRACKET}t:${discordTime}:f${R_BRACKET} we are hosting another **Any Grade Buddy run**! If you are interested to take part in it, head over to https://discord.com/channels/455380663013736479/1135585986068369418/1181583233016659998 for the signups and check here https://discord.com/channels/455380663013736479/1135585986068369418/1170547280038854716 for some information on how to participate!
  
  ### DO NOT SIGN UP FOR REGULAR MAJEGGSTICS RUNS, IF YOU ARE JOINING THE ANY GRADE RUN!
  _ _
  :Penguin1::Penguin2::Penguin3::Penguin4:
  _ _`).replace(/  +/g, '');
}

export function any_grade_signup(discordTime) {
  return (`# :grade_any: Any Grade Sign Ups :grade_any: for ${L_BRACKET}t:${discordTime}:F${R_BRACKET} (${L_BRACKET}t:${discordTime}:R${R_BRACKET})
  ## Register by: ${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS / 2}:t${R_BRACKET}    (${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS / 2}:R${R_BRACKET})
  
  Coop Starts at +1hr: ${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS}:t${R_BRACKET}    (${L_BRACKET}t:${discordTime + util.ONE_HOUR_IN_SECONDS}:R${R_BRACKET})
  
  Information and Expectations: https://discord.com/channels/455380663013736479/1135585986068369418/1170553293727084675
  
  ** DO NOT REGISTER FOR BOTH THIS AND REGULAR MAJ RUNS. ** 
  ** That would put you in violation of regular Maj registration policies. **
  
  Late Requests are subject to availability.
  
  To register, please react to this post accordingly.
  💪 **Sponsor**    |    🙏 **Protégé**`).replace(/  +/g, '');
}

export function ultra_signup(discordTime) {
  return (`## :ultra_subscription: :grade_any:  Signups for today's __ULTRA__ contract drop at ${L_BRACKET}t:${discordTime}:f${R_BRACKET} :grade_any: :ultra_subscription:
  _ _ 
  This registration is for the ULTRA only Leggacy Contract. This contract will be run as an **ANYGRADE**, so please make sure you follow instructions when given.
  
  This contract is for **ULTRA SUBSCRIBERS ONLY**, so please only signup if you have a subscription.
  
  **You must meet minimum and complete the contract in your assigned coop if you register.**
  
  Timeslot Signups:
  React to the best timeslot for your schedule. You must join your coop group within 5 hours of the coop starting.`).replace(/  +/g, '');
}

export function sr_signup(contractDay) {
  let discordTime = contractDay.getTime() / 1000;
  let isSunday = contractDay.getUTCDay() == 0;
  let isMonday = contractDay.getUTCDay() == 1;
  return (`## :Majeggstic: Speedrun signups for ${isMonday ? "new" : `__${isSunday ? "ULTRA" : "NON-ULTRA"}__ leggacy`} contract at ${L_BRACKET}t:${discordTime}:f${R_BRACKET} :Majeggstic:

  This registration is for Speed Running. Please make sure you are caught up with the rules and guidelines that we have provided. The information hub can be found here: https://discord.com/channels/455380663013736479/1151593648539054100/1152059522907656242
  
  **If you decide you do not want to run the contract, you must remove your reactions before the contract is released. After co-ops are created, you are expected to join and complete the contract in your assigned co-op at the assigned time.**
  
  Timeslot Signups: jump [here](https://discord.com/channels/455380663013736479/1151593648539054100/1172946026475307019) for a detail explanation about this signup process
  React to the timeslots you will be available to __start__ at, where each number is how many hours after contract drop (${L_BRACKET}t:${discordTime}:t${R_BRACKET}). **Your selected timeslots are the START time and does NOT account for time taken to farm tokens, which is typically ~90 minutes**. We expect all members who sign up for a timeslot to begin being active in their assigned thread within **15 minutes** of their allotted start time.
  *🕚  = +11*
  *🕛  = +12*`).replace(/  +/g, '');
}

export function sr_reminder(contractDay) {
  let isSunday = contractDay.getUTCDay() == 0;
  let isMonday = contractDay.getUTCDay() == 1;
  return `## Reminder that this contract is being run as a __Speed Run__ ${isMonday ? "" : `for the __${isSunday ? "ULTRA" : "NON-ULTRA"}__ contract`}`;
}

export function sr_react_cmd() {
  return `!?react (msg ID) :zero: :one: :two: :three: :four: :five: :six: :seven: :eight: :nine: :keycap_ten: :clock11: :clock12:`;
}

/**
 * @param {Date} contractDay
 * @param {boolean} ultraPost
 * @returns {string}
 */
export function fr_signup(contractDay, ultraPost) {
  let discordTime = contractDay.getTime() / 1000;
  let isFriday = contractDay.getUTCDay() == 5;
  let needExtraSpace = !ultraPost && isFriday;
  return `${needExtraSpace ? `_ _
  _ _
  _ _
  ` : ""}## :Majeggstic: Fastrun signups for legacy ${isFriday ? `__${ultraPost ? "ULTRA" : "NON-ULTRA"}__ ` : ""}contract at ${L_BRACKET}t:${discordTime}:f${R_BRACKET} :Majeggstic:
  _ _
  This registration is for Fast Running. Fast Runs are a little different to Speed Runs, so please make sure you are caught up with the rules and guidelines that we have provided. More information on Fast Runs can be found here: https://canary.discord.com/channels/455380663013736479/1151593648539054100/1156333094052315146
  
  **If you decide you do not want to run the contract, you must remove your reaction before we create co-ops. After co-ops are created, you are expected to complete the contract in your assigned co-op.**
  
  Timeslot Signups:
  React to the timeslot you will be available for. We expect all members who sign up for a timeslot to begin being active in their assigned thread within **1 hour** of thread creation.
  _ _`.replace(/  +/g, '');
}
