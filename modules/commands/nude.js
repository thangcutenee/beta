module.exports.config = {
	name: "nude",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thanh Dz edit by Tiadal",
	description: "Random ảnh không dành cho các bạn nữ",
	commandCategory: "random-img 18+",
	usages: "nude",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://trungkien.tk/apiv1/nude.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/nude.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/nude.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/nude.${ext}`)).on("close", callback);
			})
}