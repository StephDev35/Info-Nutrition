"use client"
import { useState, useEffect } from "react"
import { IFoodReduced, IFood } from "@/types"
 import { useRouter } from "next/navigation"
import Chargement from "@/components/chargement"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dir } from "console"
 

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const [foods,setFoods] = useState<IFoodReduced[]>([]);
  const  [isLoading, setIsLoading] = useState<boolean>(true);

  //recup food
  const FetchFoods = async () => {
      try {
        const response = await fetch("api/foods/all")
        const data = await response.json();
        const IfoodReduced : IFoodReduced[] = data.map((food : IFood) => ({
          value: food.name.toLowerCase().replace(/ /g,'-'),
          label: food.name,
        }) ) 
        setFoods(IfoodReduced);
      } catch (error) {
        console.log(error);
        
      }
  }
  useEffect(() => {
    const initialize = async () => {
      await FetchFoods();
      setIsLoading(false)
    }
    initialize();
     
  }, [])

  useEffect(() => {
      if(value.length > 0){
        router.push(`/food/${value}`);
      }
  }, [value])
 
  return (
    <>
    <div className="min-h-screen flex flex-col pt-44 items-center">
    <h1 className="text-5xl font-bold mb-5">Chercher des <span className="gradient-text">Aliments</span></h1>
    {!isLoading ? (
      
        
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? foods.find((food) => food.value === value)?.label
            : "Cliquer ici"}
          <ChevronsUpDown className="ml-2 h-4 w-12 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="chercher..." />
          <CommandList>
            <CommandEmpty>Aliment introuvable.</CommandEmpty>
            <CommandGroup>
              {foods.map((food) => (
                <CommandItem
                  key={food.value}
                  value={food.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === food.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {food.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    
    ) :
    (
      <Chargement />
    )

    }
    </div>
    </>
  )
}
