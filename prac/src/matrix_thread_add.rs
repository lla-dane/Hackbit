use std::thread;
use std::sync::{Arc, Mutex};
// use std::collections::HashMap;
// use std::time::Duration;

fn main() {
    println!("Enter the words");
    // let mut input = String::new();
    // std::io::stdin().read_line(&mut input).unwrap();
    
    let mut matrix: Vec<Vec<u8>> = vec![
    vec![1, 2, 3], 
    vec![4, 5, 6],
    vec![7, 8, 9]];
    
    let sum = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();
    
    for rows in matrix {
        let sum_clone = Arc::clone(&sum);
        let handle = thread::spawn(move || {
            let mut sum_thread = sum_clone.lock().unwrap();
            for i in rows {
                *sum_thread += i;
            }
        });
        handles.push(handle);
    }
    
    handles.into_iter().for_each(|x| x.join().unwrap());
    
    println!("{}", *sum.lock().unwrap());
}
