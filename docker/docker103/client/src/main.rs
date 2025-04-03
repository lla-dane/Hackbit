use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
};

fn forward_request(path: &str) -> String {
    let mut stream = TcpStream::connect("backend_service:8090").expect("Failed to connect");
    stream
        .write_all(format!("{} HTTP/1.1\r\n\r\n", path).as_bytes())
        .unwrap();

    let mut buffer = [0; 512];
    let _ = stream.read(&mut buffer);
    String::from_utf8_lossy(&buffer).to_string()
}

fn handle_client(mut stream: TcpStream) {
    let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();
    let request = String::from_utf8_lossy(&buffer);

    let response = if request.contains("GET /get-counter") {
        forward_request("GET /get-counter")
    } else if request.contains("POST /increment") {
        forward_request("POST /increment")
    } else if request.contains("POST /decrement") {
        forward_request("POST /decrement")
    } else {
        "HTTP/1.1 404 NOT FOUND\r\n\r\n".to_string()
    };

    stream.write_all(response.as_bytes()).unwrap();
}

fn main() {
    let listener = TcpListener::bind("0.0.0.0:8080").unwrap();
    println!("Client listening on port 8080...!");

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        std::thread::spawn(|| handle_client(stream));
    }
}
