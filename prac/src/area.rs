use std::io;

pub trait Shape {
    fn area(&self) -> f32;
    fn perimeter(&self) -> f32;
}

struct Rectangle {
    length: f32,
    breadth: f32,
}

struct Circle {
    radius: f32,
}

impl Shape for Rectangle {
    fn area(&self) -> f32 {
        return self.length * self.breadth;
    }

    fn perimeter(&self) -> f32 {
        return self.length + self.breadth;
    }
}

impl Shape for Circle {
    fn area(&self) -> f32 {
        return 2.73 * self.radius;
    }

    fn perimeter(&self) -> f32 {
        return 2.73 * self.radius * 2.0;
    }
}

fn main() {
    println!("Enter numbers");
    let mut input: String = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    let num: Vec<f32> = input
        .split_whitespace()
        .map(|x| x.parse().unwrap())
        .collect();

    let rec = Rectangle {
        length: num[0],
        breadth: num[1],
    };

    print!("{}", rec.area());
}
