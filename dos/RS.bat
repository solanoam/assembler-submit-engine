c:
cd BIN
masm.exe d:\UC.asm , d:\UCO.obj >> d:\CD.txt
link.exe d:\UCO.obj,  d:\UC.exe, nul.map, , nul.def >> d:\LD.txt
d:\UC.exe >> d:\TD.txt