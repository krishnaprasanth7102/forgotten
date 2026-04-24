"use client";

import { useState, useRef } from "react";
import { useFirestore, useStorage } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2, FileArchive } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadBossModal() {
  const { firestore } = useFirestore();
  const { storage } = useStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.name.endsWith(".zip") || selected.type === "application/zip" || selected.type === "application/x-zip-compressed") {
        setFile(selected);
      } else {
        alert("Please upload a .zip file (Unreal Engine boss/plugin).");
        e.target.value = "";
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !description || !firestore || !storage) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const storageRef = ref(storage, `open_boss_files/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(p);
        },
        (error) => {
          console.error("Upload error:", error);
          setIsUploading(false);
          alert("Failed to upload file.");
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          
          await addDoc(collection(firestore, "open_bosses"), {
            name,
            description,
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            fileUrl: downloadUrl,
            fileName: file.name,
            fileSize: file.size,
            downloadCount: 0,
            createdAt: serverTimestamp(),
          });

          setIsUploading(false);
          setOpen(false);
          setFile(null);
          setName("");
          setDescription("");
          setTags("");
          setProgress(0);
        }
      );
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-white text-white hover:text-black transition-colors px-6 py-3 font-black tracking-widest uppercase text-xs">
          <UploadCloud className="size-4" /> UPLOAD_BOSS
        </button>
      </DialogTrigger>
      <DialogContent className="bg-black border border-red-600/30 text-white sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-xs font-black tracking-[0.3em] uppercase mb-4">INITIALIZE_UPLOAD_PROTOCOL</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Entity Designation (Name)</Label>
            <Input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. MALPHAS_V2" 
              className="bg-white/5 border-white/10 rounded-none focus-visible:ring-red-600 text-white font-mono placeholder:text-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Tactical Summary (Description)</Label>
            <Textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the boss mechanics..." 
              className="bg-white/5 border-white/10 rounded-none focus-visible:ring-red-600 min-h-[100px] text-white font-mono placeholder:text-white/20 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Tags (Comma Separated)</Label>
            <Input 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. adaptive, AI, hard, beginner" 
              className="bg-white/5 border-white/10 rounded-none focus-visible:ring-red-600 text-white font-mono placeholder:text-white/20"
            />
          </div>

          <div className="space-y-2 pt-2">
            <input 
              type="file" 
              accept=".zip" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              required
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed border-white/10 hover:border-red-600/50 hover:bg-red-600/5 transition-all p-8 flex flex-col items-center justify-center cursor-pointer group",
                file ? "border-red-600/30 bg-red-600/5" : ""
              )}
            >
              {file ? (
                <>
                  <FileArchive className="size-8 text-red-600 mb-3" />
                  <span className="text-xs font-mono text-white max-w-[200px] truncate">{file.name}</span>
                  <span className="text-[10px] text-muted-foreground mt-1 tracking-widest font-bold">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                </>
              ) : (
                <>
                  <UploadCloud className="size-8 text-muted-foreground group-hover:text-red-600 transition-colors mb-3" />
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">Select Payload (.zip)</span>
                </>
              )}
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-red-600">
                <span>UPLOADING</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/10 w-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={!file || !name || !description || isUploading}
            className="w-full bg-red-600 hover:bg-white text-white hover:text-black rounded-none uppercase font-black tracking-[0.2em] transition-all h-12 flex items-center justify-center disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                TRANSMITTING...
              </>
            ) : "INITIALIZE_UPLOAD_PROTOCOL"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
