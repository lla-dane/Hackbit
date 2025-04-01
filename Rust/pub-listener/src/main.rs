use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};

fn handle_client(mut stream: TcpStream) {
    let mut buffer = [0; 1024];

    // Read the request from the client
    match stream.read(&mut buffer) {
        Ok(_) => {
            let received = String::from_utf8_lossy(&buffer);
            println!("Received: {}", received);

            // Send an HTTP-compliant response
            let response = "HTTP/1.1 200 OK\r\nContent-Length: 19\r\n\r\nReceived from the public endpoint of a laptop!!";
            stream.write_all(response.as_bytes()).unwrap();
            stream.flush().unwrap();
        }
        Err(e) => {
            println!("Failed to read from client: {}", e);
        }
    }
}

fn main() {
    let listener = TcpListener::bind("0.0.0.0:8080").expect("Failed to bind port");
    println!("Listening on all interfaces at port 8080...");

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                println!("Connection received!");
                handle_client(stream);
            }
            Err(e) => println!("Connection failed: {}", e),
        }
    }
}
