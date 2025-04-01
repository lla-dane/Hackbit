use std::io;

fn main() {
    println!("Enter text");
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).unwrap();

    let mut data: Vec<(String, u8)> = Vec::new();

    for char in input.chars() {
        if let Some((_, count)) = data.iter_mut().find(|(v, _)| v == &char.to_string()) {
            *count += 1;
        } else {
            data.push((char.to_string(), 1));
        }
    }

    println!("{}",);
}
