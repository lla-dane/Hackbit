lsblk

```
shelby@soiarch ~ ❯ lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1  28.7G  0 disk
└─sda1        8:1    1  28.7G  0 part /run/media/shelby/8D71-FDD1
nvme0n1     259:0    0 931.5G  0 disk
├─nvme0n1p1 259:1    0   395G  0 part /data
├─nvme0n1p2 259:2    0   100M  0 part
├─nvme0n1p3 259:3    0    16M  0 part
├─nvme0n1p4 259:4    0 535.7G  0 part
└─nvme0n1p5 259:5    0   730M  0 part
nvme1n1     259:6    0 476.9G  0 disk
├─nvme1n1p1 259:7    0   800M  0 part /boot/efi
├─nvme1n1p2 259:8    0    14G  0 part [SWAP]
├─nvme1n1p3 259:9    0   100G  0 part /
└─nvme1n1p4 259:10   0 362.2G  0 part /home
```

sudo umount /dev/sda1
lsblk - No mountpoints

sudo fdisk -l /dev/sda
sudo wipefs -a /dev/sda
sudo dd if=/dev/zero of=/dev/sda bs=1M count=100

sudo parted /dev/sda -- mklabel gpt
sudo parted /dev/sda -- mkpart primary fat32 1MiB 100%
sudo mkfs.vfat -F32 /dev/sda1

lsblk -f /dev/sda
sudo mkdir -p /mnt/usb
sudo mount /dev/sda1 /mnt/usb
sudo umount /mnt/usb
