use std::io;

fn main() {
    println!("Enter numbers");
    let mut input: String = String::new();

    std::io::stdin().read_line(&mut input).unwrap();
    let mut num: Vec<i32> = input
        .split_whitespace()
        .map(|n| n.parse().unwrap())
        .collect();

    num.sort();

    // Mean
    let mut sum = 0;
    num.iter().for_each(|x| sum += x);
    
    let mean = sum / num.len() as i32;
    print!("{}", mean);
}
