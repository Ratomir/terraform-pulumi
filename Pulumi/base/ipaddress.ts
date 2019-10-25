const http = async (request: RequestInfo): Promise<any> => {
    return new Promise(resolve => {
        fetch(request)
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
    });
};


export async function getMyIp(): Promise<string> {
    const data = await http("https://jsonip.com");
    return data.ip;
}


