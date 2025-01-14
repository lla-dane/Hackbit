use std::io;

fn main() {
    println!("Enter the numbers ");
    let mut input:String = String::new();
    
    std::io::stdin().read_line(&mut input).unwrap();
    
    let numb: Vec<u32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut new = Vec::new();
    
    for num in numb {   
        if !new.contains(&num) {
            new.push(num);
        }
    }
    
    println!("{:?}", new);
    
}