# Case Study


## Backend API
Showing curl examples of how the backend works - should be relatively straight forward.

### Login / Create user (POST /auth)
We don't check any credentials. Simply send a POST request and it will create a new user with a new token for sign in.
Token will be returned as a response.

```bash
curl -v -X POST localhost:3000/auth
```

Result:
```
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> POST /auth HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.4.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 24
< ETag: W/"18-3uXwUodAnyACLPmP5yF3ph7LuaE"
< Date: Mon, 05 Feb 2024 14:27:03 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"id":0,"token":"cno51"}
```


### Get user (GET /auth)
```bash
curl -v localhost:3000/auth -H "Authorization: Bearer <token>"
```

Result:
```
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> GET /auth HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.4.0
> Accept: */*
> Authorization: Bearer w3kx65
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 8
< ETag: W/"8-ms85ryugaGD2R08cDTcOi/Tu9/g"
< Date: Mon, 05 Feb 2024 14:28:24 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"id":0}
```


### Get a list of orders (GET /orders)
```bash
curl -v localhost:3000/billing -H "Authorization: Bearer <token>"
```

Result:
```
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> GET /billing HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.4.0
> Accept: */*
> Authorization: Bearer wgay1td
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 118
< ETag: W/"76-0tdmm/iTsuEEM7ec1PlsgiJsnT0"
< Date: Mon, 05 Feb 2024 14:39:29 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
[{"id":"3z7dfi","userId":0,"value":66.73,"status":"PAID"},{"id":"fvfe1o","userId":0,"value":26.14,"status":"PENDING"}]
```


### Create an order (PUT /orders)
```bash
curl -v -X PUT localhost:3000/billing -H "Authorization: Bearer <token>"
```

Result:
```
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> PUT /billing HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.4.0
> Accept: */*
> Authorization: Bearer wgay1td
> 
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 59
< ETag: W/"3b-V2XnEPzuQcVA1bkFxEG7e8HLbLU"
< Date: Mon, 05 Feb 2024 14:39:23 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"id":"fvfe1o","userId":0,"value":26.14,"status":"PENDING"}
```

### Fetch a specific order (GET /orders/:id)
```bash
curl -v localhost:3000/billing/fvfe1o -H "Authorization: Bearer <token>"
```

Result:
```
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> GET /billing/fvfe1o HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.4.0
> Accept: */*
> Authorization: Bearer wgay1td
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 56
< ETag: W/"38-uRKxAMuj2MInNCrMmhhw7dYZytE"
< Date: Mon, 05 Feb 2024 14:41:21 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"id":"fvfe1o","userId":0,"value":26.14,"status":"PAID"}
```