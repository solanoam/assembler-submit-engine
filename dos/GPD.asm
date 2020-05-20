.model small
.stack 100h
.data
    ;init arr
    ascii DB '0123456789abcdef'
.code
START:
    ;for a given al
    mov al, 0ch
    ;setting data segment
    mov bx, @data
    mov ds, bx
    ;set screen segment
    mov bx, 0b800h
    mov es, bx
    mov cl, al
    mov ch, 0
    mov si, cx
    mov bh, ascii[si]
    mov cl, bh
    mov ch, 46d
    mov es:[07d0h], cx
    ;return to OSs
    mov ax, 4c00h
    int 21h
end START
