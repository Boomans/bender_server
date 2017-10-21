export interface ClientResponse {
    result: 'OK' | 'ERR',
    errorDescription?: string,
    data?: object
}

export function Success(data: object): ClientResponse {
    return {
        result: 'OK',
        data: data ? data : {}
    };
}

export function Error(desc?: string): ClientResponse {
    return {
        result: 'ERR',
        errorDescription: desc
    }
}

export function sendData(res, result: ClientResponse) {
    res
        .set('Content-Type', 'application/json')
        .send(result);
}