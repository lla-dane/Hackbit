use std::{
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    sync::{Arc, Mutex},
};

struct Counter {
    value: i32,
}

fn handle_backend(mut stream: TcpStream, counter: Arc<Mutex<Counter>>) {
    let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();
    let request = String::from_utf8_lossy(&buffer);

    let mut count = counter.lock().unwrap();
    let response = if request.contains("GET /get-counter") {
        format!(
            "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n{}",
            count.value
        )
    } else if request.contains("POST /increment") {
        count.value += 1;
        format!(
            "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n{}",
            count.value
        )
    } else if request.contains("POST /decrement") {
        count.value -= 1;
        format!(
            "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n{}",
            count.value
        )
    } else {
        "HTTP/1.1 404 NOT FOUND\r\n\r\n".to_string()
    };

    stream.write_all(response.as_bytes()).unwrap();
}

fn main() {
    let listener = TcpListener::bind("0.0.0.0:8090").unwrap();
    let counter = Arc::new(Mutex::new(Counter { value: 0 }));

    println!("Backend listening on port 8090...");

    for stream in listener.incoming() {
        let counter = Arc::clone(&counter);
        let stream = stream.unwrap();
        std::thread::spawn(move || handle_backend(stream, counter));
    }
}
