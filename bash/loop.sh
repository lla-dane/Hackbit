i=0

while [[ $i -le 10 ]]; do 
    echo "$i"
    ((i += 1))
done


for j in {2..9}
do
    echo $j
done