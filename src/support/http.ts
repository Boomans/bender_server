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

export function Error(err: any): ClientResponse {
    return {
        result: 'ERR',
        errorDescription: err.detail || err.message || err
    }
}

export function sendData(res, result: ClientResponse) {
    res
        .set('Content-Type', 'application/json')
        .send(result);
}