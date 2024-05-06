import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DemoCreateAccount() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-2/6 max-sm:w-3/4 ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log In</CardTitle>
        <CardDescription>
          Enter your Pmail and Password below to log In 
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        
       
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Log in</Button>
      </CardFooter>
    </Card>
    </div>
  )
}