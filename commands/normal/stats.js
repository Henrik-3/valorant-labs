import {default as Utils} from "../../methods.js"
export async function execute(data) {
    const link = await Utils.getLink(data.message.author.id)
    if(link && !data.args.length) {

    }
}
export const name = "stats"