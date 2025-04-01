use std::io;

fn bin_search(vec: &Vec<u32>, start: usize, end: usize, num: u32) -> bool {
    if (start >= end) {
        if vec[start] == num {
            return true;
        } else {return false;}
    }
    let mid = (start + end)/2 ;
    if vec[mid] == num {
        return true;
    } else if vec[mid] > num {
        bin_search(vec, start, mid - 1, num)
    } else {
        bin_search(vec, mid + 1, end, num)
    }
}

fn main() {
    println!("Enter the numbers ");
    let mut input:String = String::new();
    
    std::io::stdin().read_line(&mut input).unwrap();
    
    let mut numb: Vec<u32> = input.split_whitespace().map(|x| x.parse().unwrap()).collect();
    numb.sort();
    
    println!("{:?}", bin_search(&numb, 0, numb.len(), 5));
    
}