const NotificationProvider = require("./notification-provider");
const axios = require("axios");
const { UP } = require("../../src/util");
const webpush = require('web-push');

class Webpush extends NotificationProvider {
    name = "Webpush";

    publicVapidKey = "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";
    privateVapidKey = "4AoSsRHFaHv0Fupd2NRtrungJF2jkqgccTu-WEc781w";
    /**
     * @inheritDoc
     */
    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        const okMsg = "Sent Successfully.";

        try {
            console.log("SENDING TEST");
            webpush.setVapidDetails("mailto:test@test.com", this.publicVapidKey, this.privateVapidKey);
            if (heartbeatJSON === null && monitorJSON === null) {
                // Test message
                
                const payload = JSON.stringify({
                    title: "Uptime Kuma", 
                    body: "Test Alert - " + msg ,
                    icon: "https://github.com/louislam/uptime-kuma/blob/master/public/icon.png?raw=true"
                });
                await webpush.sendNotification(notification.sub, payload);
                

                // let data = {
                //     "text": "Uptime Kuma Alert",
                //     "attachments": [
                //         {
                //             "title": "Test Alert",
                //             "text": msg,
                //             "color": "#5BDD8B"
                //         }
                //     ]
                // };

                // await axios.post(notification.webhookURL, data);
                return okMsg;
            }

            // let data = {
            //     "text": "Uptime Kuma Alert",
            //     "attachments": [
            //         {
            //             "title": `${monitorJSON["name"]} is ${heartbeatJSON["status"] === UP ? "up" : "down"}`,
            //             "text": heartbeatJSON["msg"],
            //             "color": (heartbeatJSON["status"] === UP ? "#5BDD8B" : "#DC3645"),
            //         }
            //     ]
            // };

            // await axios.post(notification.webhookURLtest, data);

            const down = "❌ " + monitorJSON["name"] + " is DOWN ❌";
            const up = "✅ " + monitorJSON["name"] + " is UP ✅";;

            const payload = JSON.stringify({ 
                title: "Uptike Kuma", 
                body: `${heartbeatJSON["status"] === UP ? up : down}`,
                icon: "https://github.com/louislam/uptime-kuma/blob/master/public/icon.png?raw=true"
            });
        
            await webpush.sendNotification(notification.sub, payload);
            
            return okMsg;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }
}

module.exports = Webpush;