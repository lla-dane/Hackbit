Signup to ngrok and set up the authentication key in your system

```bash
ngrok 8080
```
It will show this kind of thing: 

```bash
ngrok                                                           (Ctrl+C to quit)
                                                                                
❤️  ngrok? We're hiring https://ngrok.com/careers                                
                                                                                
Session Status                online                                            
Account                       Abhinav Agarwalla (Plan: Free)                    
Version                       3.20.0                                            
Region                        India (in)                                        
Latency                       357ms                                             
Web Interface                 http://127.0.0.1:4040                             
Forwarding                    https://d621-152-56-146-35.ngrok-free.app -> http://localhost:8080
                                                                                
Connections                   ttl     opn     rt1     rt5     p50     p90       
                              0       0       0.00    0.00    0.00    0.00      
                                                                                
           
```

Now just make an http api call on the generated address

```
curl --http1.1 -X GET https://d621-152-56-146-35.ngrok-free.app
```