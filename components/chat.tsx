'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { useChat } from "ai/react"
import { ScrollArea } from "./ui/scroll-area"


export interface ChatProps {}

export function Chat(props: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat ({
    api: '/api/chat',
    });

  return (
    <Card>
      <CardHeader className='w-[440px]'>
        <CardTitle>Converse com o GPT</CardTitle>
        <CardDescription>Testando a API da OpenAI com Next.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[460px] w-[450px] pr-5 overflow-auto'>
          { messages.map(message => { 
            return (
              <div key={message.id} className="flex justify-between gap-3 text-slate-600 text-sm mb-4">
                  {message.role === 'user' && (
                      <div className="flex justify-end gap-3 w-full">
                          <p className='leading-relaxed text-right'>
                              <span className='block font-bold text-slate-700'>
                                Usuário
                              </span>
                              {message.content}
                          </p>
                          <Avatar className="mt-[4px]">
                              <AvatarFallback>AI</AvatarFallback>
                              <AvatarImage src='https://avatars.githubusercontent.com/u/119268809?v=4' />
                          </Avatar>
                      </div>
                  )}
                  {message.role === 'assistant' && (
                    <div className="flex justify-start gap-3 w-full">
                          <Avatar className="mt-[4px]">
                              <AvatarFallback>User</AvatarFallback>
                              <AvatarImage src="https://avatar.tobi.sh/user.svg" />
                          </Avatar>
                          <p className='leading-relaxed'>
                              <span className='block font-bold text-slate-700'>
                                  Agente  
                              </span>
                              {message.content}
                          </p>
                      </div>
                  )}
              </div>
            )}
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className='w-full flex gap-2' onSubmit={handleSubmit}>
          <Input placeholder='Fala comigo bebê?' value={input} onChange={handleInputChange} />
          <Button type='submit'>Manda!</Button>
        </form>
      </CardFooter>
    </Card>
  )
}