"use client"

import * as React from "react"
import { SearchIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ className, onSearch, ...props }, ref) => {
  const [value, setValue] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleClear = () => {
    setValue("")
    if (onSearch) {
      onSearch("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex w-full items-center", className)}>
      <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={ref}
        type="search"
        value={value}
        onChange={handleChange}
        className="pl-8 pr-10 h-9 bg-background"
        placeholder="Buscar..."
        {...props}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 h-full px-2 py-0"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Limpiar</span>
        </Button>
      )}
    </form>
  )
})
Search.displayName = "Search"

export { Search }
