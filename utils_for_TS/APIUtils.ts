interface APIContext {
    post(url: string, options: {
        data: any;
        headers?: Record<string, string>;
    }): Promise<{ json(): Promise<any> }>;
}

interface CreateOrderResponse {
    token: string;
    orderId?: string;
}

class APIUtils {
    apiContext: APIContext;
    loginPayLoad: string;
    constructor(apiContext: APIContext, loginPayLoad: string) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad: any): Promise<CreateOrderResponse> {
        let response: CreateOrderResponse = { token: '' };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}
