masm graphicPortDump.asm
link graphicPortDump.lnk
masm graphicModeGraphicPortDump.asm
link graphicModeGraphicPortDump.lnk
masm userCode.asm
link userCode.lnk
userCode.exe >> txtDump.txt
graphicPortDump.exe >> graphicPortDump.txt
graphicModeGraphicPortDump.exe >> graphicModeGraphicPortDump.txt
