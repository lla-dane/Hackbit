use std::thread;
use std::sync::{mpsc, Arc};
use std::collections::HashMap;
use std::time::Duration;

fn main() {
    println!("Enter the words");
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    
    let mut words: Vec<String> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (tx, rx) = mpsc::channel::<String>();
    
    for word in words.iter_mut() {
        *word = word.trim().to_lowercase();
    }

    let mut handles = Vec::new();
    
    for word in words.into_iter() {
        let tx_thread: mpsc::Sender<String>= tx.clone();
        let handle = thread::spawn(move || {
            tx_thread.send(word.chars().rev().collect()).unwrap();
        });
        
        thread::sleep(Duration::from_secs(1));
        handles.push(handle);
    }
    
    drop(tx);
    
    for handle in handles {
        handle.join().unwrap();
    }

    for received in rx {
        println!("{:?}", received);
    }

    return;
    
}
