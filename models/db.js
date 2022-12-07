import mongodb from 'mongodb';

class DB {
    static async connect(func) {
        this.client = await mongodb.MongoClient.connect(process.env.MONGODB_URL);
        func(this.client)
    }

    static async existsPlayList(url) {
        const result = await this.client.db("soundcloud").collection("playlists").countDocuments({ url: url });
        return result > 0 ? true : false;
    }

    static async addLinks(url, links) {
        if (await this.existsPlayList(url)) {
            let oldLinks = await this.client.db("soundcloud").collection("playlists").findOne({ url: url });
            oldLinks = oldLinks.links;

            let newLinks = [];

            for (let i of links) {
                if (!oldLinks.includes(i)) {
                    newLinks.push(i);
                }
            }

            await this.client.db("soundcloud").collection("playlists").updateOne({ url: url }, { $set: { links: links } });

            return newLinks;
        } else {
            await this.client.db("soundcloud").collection("playlists").insertOne({
                url: url,
                links: links
            });
            return links;
        }
    }
}

export default DB;