import { Input } from "./ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="w-full max-w-xl mx-auto relative">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        {/* Input Field */}
        <Input 
          type="text" 
          placeholder="Type your favourite Director here" 
          className="w-full pl-10 pr-10 py-3 rounded-full border border-input bg-background focus:ring-2 focus:ring-cinema focus:border-transparent transition-all outline-none" 
        />
      </div>
    </div>
  );
}
