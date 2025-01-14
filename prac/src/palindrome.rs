use std::io;

fn main() {
    println!("Enter a text");
    let mut text = String::new();
    io::stdin().read_line(&mut text).unwrap();

    text = text.trim().to_lowercase().to_string();
    let rev: String = text.chars().rev().collect();

    println!("{}", rev == text)
}
