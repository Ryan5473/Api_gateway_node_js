# <span style="color: #2d87f0;">API Gateway Prototype with Node.js</span>

## <span style="color: #2d87f0;">Overview</span>

This is a prototype of an **API Gateway** built with **Node.js**, designed to route, authenticate, rate limit, and proxy requests to various microservices. The API Gateway is highly modular and can be scaled based on demand. It acts as an intermediary layer between the client and microservices, enabling centralized management and routing of requests.

### <span style="color: #e64a19;">Key Features:</span>

- **Dynamic Routing**: Routes incoming requests to the appropriate microservice based on the requested path.
- **Authentication Middleware**: Ensures that only authorized users can access protected routes based on roles (e.g., `ADMIN`, `USER`).
- **Rate Limiting**: Protects microservices from overloading by limiting the number of requests per client within a specified time window.
- **Proxying**: Forwards requests to microservices while potentially modifying headers or paths as needed.
- **Scalable**: The gateway can be scaled horizontally to handle increased demand by adding more instances behind a load balancer.

## <span style="color: #2d87f0;">Architecture</span>

The **API Gateway** acts as a single entry point for clients to interact with multiple microservices. It is designed to handle different concerns such as routing, authentication, rate limiting, and proxying.

### <span style="color: #e64a19;">Core Components:</span>

1. **Route Handling**: The gateway manages the routing configuration for each microservice and dynamically forwards requests based on the URL and method.
2. **Authentication**: The gateway can handle authentication based on JWT tokens or custom methods. Routes requiring authentication can specify the roles that are allowed to access them.
3. **Rate Limiting**: The gateway includes a rate-limiting mechanism to prevent abuse and ensure fair usage of the microservices.
4. **Proxying**: Requests are forwarded to the appropriate microservice using the `http-proxy-middleware` library. The request headers and paths may be modified as needed to meet the microservice’s expectations.

## <span style="color: #2d87f0;">Scalability</span>

This **API Gateway** is designed to be **scalable** on-demand:

- **Horizontal Scaling**: By deploying multiple instances of the API Gateway behind a load balancer, the system can handle an increased volume of requests. Load balancing ensures even distribution of traffic across all available instances.
- **Microservice Scalability**: Each microservice can also be scaled independently based on the demand. The API Gateway remains agnostic to how many instances of each microservice are running.
- **Rate Limiting Per Service**: The rate-limiting mechanism helps to prevent any single microservice from being overwhelmed by too many requests. The API Gateway can be configured to handle a large number of requests per second without overloading backend services.

## <span style="color: #2d87f0;">How it Works</span>

1. **Client Request**: A client sends a request to the API Gateway (e.g., `GET /api/v1/inventory/stock`).
2. **Authentication Check**: If the route requires authentication, the API Gateway verifies the client’s credentials (e.g., JWT token).
3. **Rate Limiting**: The Gateway checks if the client has exceeded the allowed number of requests within the time window (e.g., 100 requests per 15 minutes). If exceeded, the request is rejected with a **429** status.
4. **Routing**: If the request is valid, the Gateway forwards the request to the appropriate microservice (e.g., `inventory` microservice).
5. **Response**: The microservice processes the request and returns the response to the API Gateway, which forwards it back to the client.

## <span style="color: #2d87f0;">Installation</span>

### <span style="color: #e64a19;">Prerequisites</span>
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### <span style="color: #e64a19;">Steps:</span>
