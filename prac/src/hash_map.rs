use std::collections::HashMap;

fn main() {
    println!("Enter the numbers ");
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    let numb: Vec<String> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();
    
    let mut data: HashMap<String, u32> = HashMap::new();
    
    for word in numb {
        if data.contains_key(&word) {
            if let Some(value) = data.get_mut(&word) {
                *value += 1;
            }
        } else {
            data.insert(word, 1);
        }
    }
    println!("{:?}", data);
}