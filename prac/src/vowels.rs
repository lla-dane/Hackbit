use std::io;

fn main() {
    println!("Enter some text");
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    let mut vowels: Vec<(String, u8)> = vec![
        ("a".to_string(), 0),
        ("e".to_string(), 0),
        ("i".to_string(), 0),
        ("o".to_string(), 0),
        ("u".to_string(), 0),
    ];

    for c in input.chars() {
        if let Some((_, count)) = vowels.iter_mut().find(|(v, _)| v == &c.to_string()) {
            *count += 1;
        }
    }

    println!("{:?}", vowels);
}
