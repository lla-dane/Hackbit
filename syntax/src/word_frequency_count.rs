use std::thread;
use std::sync::{mpsc, Arc};
use std::collections::HashMap;
use std::time::Duration;

fn main() {
    println!("Enter the words");
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    
    let (tx, rx) = mpsc::channel::<HashMap<char, u32>>();
    let chars: Vec<char> = input.chars().collect();
    let mut handles = Vec::new();
    
    for chunk in chars.chunks(3).map(|chunk| chunk.to_vec()) {
        let tx_clone: mpsc::Sender<HashMap<char, u32>> = tx.clone();
        let handle = thread::spawn(move || {
            let mut map = HashMap::new();
            for &c in &chunk {
                let num = map.entry(c).or_insert(0 as u32);
                *num += 1;
            }
            tx_clone.send(map).unwrap();
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    drop(tx);
    let mut final_map = HashMap::new();
    
    for received in rx {
        for (key, value) in received {
            *final_map.entry(key).or_insert(0) += value;
        }
    }
    
    for (key, value) in final_map {
        println!("{} and {}", key, value);
    }
    
}
