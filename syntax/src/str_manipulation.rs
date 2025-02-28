use std::io;

fn main() {
    println!("Enter numbers");
    let mut input: String = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    
    let mut data: Vec<String> = input.split_whitespace().map(|v| v.parse().unwrap()).collect();
    
    for word in data.iter_mut() {
        *word = word.to_lowercase().chars().rev().collect();
    }
    
    println!("{:?}", data);
}
