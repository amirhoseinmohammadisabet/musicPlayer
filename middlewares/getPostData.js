async function getPostData(req, res, next) {
    try {
        let data = null;
        return new Promise((resolve, reject) => {
            let buffer = "";
            req.on("data", (chunk) => {
                buffer += chunk;
            });
            req.on("end", () => {
                try {
                    data = JSON.parse(buffer);
                } catch (e) {
                    data = buffer;
                }
                resolve(data);
                req.body = data
            });
            return req
        });

    } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "oops! Something went wrong!",
                addtionalInfo: e.message,
            })
        );
    }
}

module.exports = getPostData