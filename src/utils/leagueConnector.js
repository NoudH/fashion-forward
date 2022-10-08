import fs from "fs";
import path from "path";
import axios from "axios";

export default class LeagueConnector {
    static instance = undefined;

    location = undefined;
    lockfileData = undefined;
    token = undefined;

    setClientLocation(location) {
        this.location = location;

        this.lockfileData = location
            ? fs.readFileSync(
                path.join(this.location, "lockfile"),
                {encoding: "utf-8"}
            ).split(':')
            : undefined;

        if(this.lockfileData) {
            this.token = Buffer.from(`riot:${(this.lockfileData)[3]}`, 'ascii').toString("base64");
        }
    }

    async sendRequest(method, url, data) {
        if(this.lockfileData) {
            return axios.request({
                method,
                url: `${this.lockfileData[4]}://127.0.0.1:${this.lockfileData[2]}/${url}`,
                headers: {
                    'Authorization': `Basic ${this.token}`
                },
                data
            })
        }
        return Promise.reject("Client not running!")
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new LeagueConnector()
        }
        return this.instance;
    }
}