CreateObject("Wscript.Shell").Run "python """ & CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) & "\retrieve-media-playback-info.py"" loop", 0, False
